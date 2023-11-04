package repository

import (
	"dashboard"
	"encoding/json"
	"fmt"

	"github.com/jmoiron/sqlx"
	"golang.org/x/exp/slices"
)

type RoomPostgres struct {
	db *sqlx.DB
}

func removeDuplicateInt(intSlice []int) []int {
	allKeys := make(map[int]bool)
	list := []int{}
	for _, item := range intSlice {
		if _, value := allKeys[item]; !value {
			allKeys[item] = true
			list = append(list, item)
		}
	}
	return list
}

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

	arr = removeDuplicateInt(arr)

	length := len(arr)

	var id int
	for i := 0; i < length; i++ {

		var userId []int
		query := fmt.Sprintf(`SELECT "user_id" FROM %s WHERE desk_id = $1`,
			roomTable)
		err = r.db.Select(&userId, query, list.DeskId)

		if !slices.Contains(userId, arr[i]) {
			createUsersRoomQuery := fmt.Sprintf(`INSERT INTO %s (user_id, manager_id, privacy, desk_id) VALUES ($1, $2, '1',$3) RETURNING room_id`, roomTable)
			row := tx.QueryRow(createUsersRoomQuery, arr[i], managerId, list.DeskId)
			if err := row.Scan(&id); err != nil {
				tx.Rollback()
				return 0, err
			}
		}
	}

	return id, tx.Commit()
}
