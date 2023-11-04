package dashboard

import "errors"

type Desk struct {
	Id          int    `json:"desk_id" db:"desk_id"`
	Room_id     int    `json:"room_id" db:"room_id"`
	Title       string `json:"title" db:"title" binding:"required"`
	Description string `json:"description" db:"description"`
	Changeable  string `json:"changeable" db:"changeable"`
}

type Room struct {
	Id        int
	UserId    int
	ManagerId int
	ListId    int
	Privacy   string
}

type Comment struct {
	Id       int    `json:"comment_id" db:"comment_id"`
	TaskId   int    `json:"task_id" db:"task_id"`
	AuthorId int    `json:"comment_author_id" db:"comment_author_id"`
	Message  string `json:"message" db:"message"`
}
type RoomCreating struct {
	DeskId int    `json:"desk_id"`
	Array  string `json:"array"`
}

type Task struct {
	TaskId      int    `json:"task_id" db:"task_id"`
	Title       string `json:"title" db:"title"`
	Description string `json:"description" db:"description"`
	Priority    string `json:"priority" db:"priority"`
	EmployeeId  int    `json:"employee_id" db:"employee_id"`
	DeskId      int    `json:"desk_id" db:"desk_id"`
	Status      string `json:"status" db:"status"`
}

type UpdateTaskInput struct {
	Title       *string `json:"title"`
	Description *string `json:"description"`
	Status      *string `json:"status"`
	Priority    *string `json:"priority" db:"priority"`
}

type UpdateDeskInput struct {
	Title       *string `json:"title"`
	Description *string `json:"description"`
	Changeable  *string `json:"changeable"`
}

func (i UpdateDeskInput) Validate() error {
	if i.Title == nil && i.Description == nil {
		return errors.New("update structure has no values")
	}

	return nil
}

// type Comment struct {
// 	Title       *string `json:"title"`
// 	Description *string `json:"description"`
// 	Status      *string `json:"status"`
// 	Priority    *string `json:"priority" db:"priority"`
// }

// type TodoItem struct {
// 	Id          int    `json:"id" db:"id"`
// 	Title       string `json:"title" db:"title" binding:"required"`
// 	Description string `json:"description" db:"description"`
// 	Done        bool   `json:"done" db:"done"`
// }

// type ListsItem struct {
// 	Id     int
// 	ListId int
// 	ItemId int
// }

// type UpdateListInput struct {
// 	Title       *string `json:"title"`
// 	Description *string `json:"description"`
// }

// func (i UpdateListInput) Validate() error {
// 	if i.Title == nil && i.Description == nil {
// 		return errors.New("update structure has no values")
// 	}

// 	return nil
// }

// type UpdateItemInput struct {
// 	Title       *string `json:"title"`
// 	Description *string `json:"description"`
// 	Done        *bool   `json:"done"`
// }

// func (i UpdateItemInput) Validate() error {
// 	if i.Title == nil && i.Description == nil && i.Done == nil {
// 		return errors.New("update structure has no values")
// 	}

// 	return nil
// }
