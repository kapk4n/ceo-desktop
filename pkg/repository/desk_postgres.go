package repository

import (
	"dashboard"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type DeskPostgres struct {
	db *sqlx.DB
}

func NewDeskPostgeres(db *sqlx.DB) *DeskPostgres {
	return &DeskPostgres{db: db}
}

func (r *DeskPostgres) Create(userId int, list dashboard.Desk) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var id int
	createUsersRoomQuery := fmt.Sprintf("INSERT INTO %s (user_id, manager_id, privacy) VALUES ($1, $2, '1') RETURNING room_id", roomTable)
	row := tx.QueryRow(createUsersRoomQuery, userId, userId)
	if err := row.Scan(&id); err != nil {
		tx.Rollback()
		return 0, err
	}
	room_id := id
	// createTaskRoomQuery := fmt.Sprintf("INSERT INTO %s (user_id, manager_id, privacy) VALUES ($1, $2, '1')", taskRoomTable)
	// _, err = tx.Exec(createTaskRoomQuery, userId, userId)
	// if err != nil {
	// 	tx.Rollback()
	// 	return 0, err
	// }

	createListQuery := fmt.Sprintf("INSERT INTO %s (room_id, description, start_date, title, changeable) VALUES ($1, $2, CURRENT_DATE, $3, $4) RETURNING desk_id", deskTable)
	row = tx.QueryRow(createListQuery, room_id, list.Description, list.Title, list.Changeable)
	if err := row.Scan(&id); err != nil {
		tx.Rollback()
		return 0, err
	}

	return id, tx.Commit()
}

// func (r *DeskPostgres) GetAll(userId int) ([]dashboard.Desk, error) {
// 	var lists []dashboard.Desk
// 	query := fmt.Sprintf("SELECT tl.id, tl.title, tl.description FROM %s tl INNER JOIN %s ul on tl.id = ul.list_id WHERE ul.user_id = $1",
// 		deskTable, roomTable)
// 	err := r.db.Select(&lists, query, userId)

// 	return lists, err
// }

// func (r *DeskPostgres) GetById(userId, listId int) (dashboard.Desk, error) {
// 	var list dashboard.Desk
// 	query := fmt.Sprintf("SELECT tl.id, tl.title, tl.description FROM %s tl INNER JOIN %s ul on tl.id = ul.list_id WHERE ul.user_id = $1 AND ul.list_id = $2",
// 		deskTable, roomTable)
// 	err := r.db.Get(&list, query, userId, listId)

// 	return list, err
// }

// func (r *DeskPostgres) Delete(userId, listId int) error {
// 	query := fmt.Sprintf("DELETE FROM %s tl USING %s ul WHERE tl.id = ul.list_id AND ul.user_id=$1 AND ul.list_id=$2",
// 		deskTable, roomTable)
// 	_, err := r.db.Exec(query, userId, listId)

// 	return err
// }

// func (r *TodoListPostgres) Update(userId, listId int, input dashboard.UpdateListInput) error {
// 	setValues := make([]string, 0)
// 	args := make([]interface{}, 0)
// 	argId := 1

// 	if input.Title != nil {
// 		setValues = append(setValues, fmt.Sprintf("title=$%d", argId))
// 		args = append(args, *input.Title)
// 		argId++
// 	}

// 	if input.Description != nil {
// 		setValues = append(setValues, fmt.Sprintf("description=$%d", argId))
// 		args = append(args, *input.Description)
// 		argId++
// 	}

// 	// title=$1
// 	// description=$1
// 	// title=$1, description=$2
// 	setQuery := strings.Join(setValues, ", ")

// 	query := fmt.Sprintf("UPDATE %s tl SET %s FROM %s ul WHERE tl.id = ul.list_id AND ul.list_id=$%d AND ul.user_id=$%d",
// 		deskTable, setQuery, roomTable, argId, argId+1)
// 	args = append(args, listId, userId)

// 	logrus.Debugf("updateQuery: %s", query)
// 	logrus.Debugf("args: %s", args)

// 	_, err := r.db.Exec(query, args...)
// 	return err
// }
