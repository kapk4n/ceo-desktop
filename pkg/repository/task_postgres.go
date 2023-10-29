package repository

import (
	"dashboard"
	"fmt"

	"github.com/jmoiron/sqlx"
)

type TaskPostgres struct {
	db *sqlx.DB
}

func NewTaskPostgres(db *sqlx.DB) *TaskPostgres {
	return &TaskPostgres{db: db}
}

func (r *TaskPostgres) Create(list dashboard.Task, authorId int) (int, error) {
	tx, err := r.db.Begin()
	if err != nil {
		return 0, err
	}

	var task_id, task_room_id int

	createTaskQuery := fmt.Sprintf(`INSERT INTO %s (start_date, title, description, priority, employee_id, author_id, status) VALUES (CURRENT_DATE, $1, $2, $3, $4, $5, 'To Do') RETURNING task_id`, taskTable)
	row := tx.QueryRow(createTaskQuery, list.Title, list.Description, list.Priority, list.EmployeeId, authorId)
	if err := row.Scan(&task_id); err != nil {
		tx.Rollback()
		return 0, err
	}

	createTaskRoomQuery := fmt.Sprintf(`INSERT INTO %s (desk_id, task_id) VALUES ($1, $2) RETURNING task_room_id`, taskRoomTable)
	row = tx.QueryRow(createTaskRoomQuery, list.DeskId, task_id)
	if err := row.Scan(&task_room_id); err != nil {
		tx.Rollback()
		return 0, err
	}

	return task_id, tx.Commit()
}

// func (r *TaskPostgres) Update(list dashboard.Task, authorId int) error {
// 	tx, err := r.db.Begin()
// 	if err != nil {
// 		return err
// 	}

// 	var task_id, task_room_id int

// 	createTaskQuery := fmt.Sprintf(`INSERT INTO %s (start_date, title, description, priority, employee_id, author_id, status) VALUES (CURRENT_DATE, $1, $2, $3, $4, $5, 'To Do') RETURNING task_id`, taskTable)
// 	row := tx.QueryRow(createTaskQuery, list.Title, list.Description, list.Priority, list.EmployeeId, authorId)
// 	if err := row.Scan(&task_id); err != nil {
// 		tx.Rollback()
// 		return err
// 	}

// 	createTaskRoomQuery := fmt.Sprintf(`INSERT INTO %s (desk_id, task_id) VALUES ($1, $2) RETURNING task_room_id`, taskRoomTable)
// 	row = tx.QueryRow(createTaskRoomQuery, list.DeskId, task_id)
// 	if err := row.Scan(&task_room_id); err != nil {
// 		tx.Rollback()
// 		return err
// 	}

// 	return tx.Commit()
// }
