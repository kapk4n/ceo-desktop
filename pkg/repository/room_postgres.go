package repository

import (
	"dashboard"
	"encoding/json"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type RoomPostgres struct {
	db *sqlx.DB
}

// 10.67.0.0/12

// 10.01000000.00001|000.01001101
// 10.64.8.77/21

func NewRoomPostgres(db *sqlx.DB) *RoomPostgres {
	return &RoomPostgres{db: db}
}

func (r *RoomPostgres) Create(list dashboard.RoomCreating, managerId int) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	fmt.Print("from postgres:", list.Array, "      ")
	var arr []int
	_ = json.Unmarshal([]byte(list.Array), &arr)

	var roomId int
	query := fmt.Sprintf(`SELECT "room_id" FROM %s WHERE desk_id = $1`,
		deskTable)
	err = r.db.Get(&roomId, query, list.DeskId)

	fmt.Print("from postgres:", err, "      ")

	length := len(arr)

	var id int
	for i := 0; i < length; i++ {
		createUsersRoomQuery := fmt.Sprintf(`INSERT INTO %s (user_id, manager_id, privacy) VALUES ($1, $2, '1') RETURNING room_id`, roomTable)
		row := tx.QueryRow(createUsersRoomQuery, arr[i], managerId)
		if err := row.Scan(&id); err != nil {
			tx.Rollback()
			return 0, err
		}
	}

	return id, tx.Commit()

}
