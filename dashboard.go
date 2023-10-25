package dashboard

type Desk struct {
	Id           int    `json:"desk_id" db:"desk_id"`
	Room_id      int    `json:"room_id" db:"room_id"`
	Task_Room_id int    `json:"task_room_id" db:"task_room_id"`
	Title        string `json:"title" db:"title" binding:"required"`
	Description  string `json:"description" db:"description"`
	Changeable   string `json:"changeable" db:"changeable"`
}

type Room struct {
	Id        int
	UserId    int
	ManagerId int
	ListId    int
	Privacy   string
}

type RoomCreating struct {
	DeskId int    `json:"desk_id"`
	Array  string `json:"array"`
}

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
