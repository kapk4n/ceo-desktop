package repository

import (
	"dashboard"

	"github.com/jmoiron/sqlx"
)

type Authorization interface {
	CreateUser(user dashboard.User) (int, error)
	GetUser(login, password string) (dashboard.User, error)
}

type Desk interface {
	Create(userId int, list dashboard.Desk) (int, error)
	// GetAll(userId int) ([]dashboard.Desk, error)
	// GetById(userId, listId int) (dashboard.Desk, error)
	// Delete(userId, listId int) error
	// Update(userId, listId int, input todo.UpdateListInput) error
}

type Room interface {
	Create(list dashboard.RoomCreating, managerId int) (int, error)
	// GetAll(userId int) ([]dashboard.Desk, error)
	// GetById(userId, listId int) (dashboard.Desk, error)
	// Delete(userId, listId int) error
	// Update(userId, listId int, input todo.UpdateListInput) error
}

type Task interface {
	Create(list dashboard.Task, authorId int) (int, error)
	// GetAll(userId int) ([]dashboard.Desk, error)
	// GetById(userId, listId int) (dashboard.Desk, error)
	// Delete(userId, listId int) error
	Update(list dashboard.UpdateTaskInput, taskId, authorId int) error
}

//
//type TodoItem interface {
//}

// type Cards interface {
// 	GetAllCards() ([]dashboard.Cards, error)
// 	GetCardById(cardId int) (dashboard.Cards, error)
// 	Create(cards dashboard.Cards) (int, error)
// 	Delete(cardId int) error
// }

// type Work interface {
// 	GetAllWorks() ([]dashboard.Work, error)
// 	GetWorkById(workId int) (dashboard.Work, error)
// 	Create(input dashboard.Work) (int, error)
// 	Delete(workId int) error
// }

// type Services interface {
// 	GetAllServ() ([]dashboard.Services, error)
// 	GetServiceById(serviceId int) (dashboard.Services, error)
// 	Create(input dashboard.Services) (int, error)
// 	Delete(serviceId int) error
// }

// type Materials interface {
// 	GetAllMaterials() ([]dashboard.Materials, error)
// 	GetMaterialById(materialId int) (dashboard.Materials, error)
// 	Create(input dashboard.Materials) (int, error)
// 	Delete(materialId int) error
// }

// type Customers interface {
// 	GetAllCustomers() ([]dashboard.Customer, error)
// 	GetCustomerById(customerId int) (dashboard.Customer, error)
// 	Create(input dashboard.Customer) (int, error)
// 	Delete(customerId int) error
// }

// type Delivers interface {
// 	GetAllDelivers() ([]dashboard.Deliver, error)
// 	GetDeliverById(deliverId int) (dashboard.Deliver, error)
// 	Create(input dashboard.Deliver) (int, error)
// 	Delete(deliverId int) error
// }

// type Categories interface {
// 	GetAllCategories() ([]dashboard.Categories, error)
// 	GetCategoryById(categoryId int) (dashboard.Categories, error)
// 	Create(input dashboard.Categories) (int, error)
// 	Delete(categoryId int) error
// }

// type Reques interface {
// 	GetDeliver() ([]dashboard.Deliver, error)
// 	GetCustomer() ([]dashboard.Customer, error)
// 	GetService() ([]dashboard.ForSelect3, error)
// 	GetZapros4() ([]dashboard.Customer, error)
// 	GetZapros5() ([]dashboard.ForSelect5, error)
// 	GetZapros6() ([]dashboard.ForSelect6, error)
// 	GetZapros7(inp string) ([]dashboard.Work2, error)
// }

// type User

type Repository struct {
	// Cards
	// Work
	// Services
	// Materials
	// Customers
	// Delivers
	// Categories
	// Reques
	Authorization
	Desk
	Room
	Task
	//TodoItem
}

func NewRepository(db *sqlx.DB) *Repository {
	return &Repository{
		// Cards:      NewZaprosPostgres(db),
		// Work:       NewZapros2Postgres(db),
		// Services:   NewServicesPostgres(db),
		// Materials:  NewMaterialsPostgres(db),
		// Customers:  NewCustomerPostgres(db),
		// Delivers:   NewDeliverPostgres(db),
		// Categories: newCategoriesPostgres(db),
		Room:          NewRoomPostgres(db),
		Authorization: NewAuthPostgres(db),
		Desk:          NewDeskPostgeres(db),
		Task:          NewTaskPostgres(db),
		//TodoItem:      NewTodoItemPostgres(db),
	}
}
