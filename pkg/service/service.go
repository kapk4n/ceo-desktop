package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type Authorization interface {
	CreateUser(user dashboard.User) (int, error)
	GenerateToken(login, password string) (string, error)
	ParseToken(token string) (int, error)
}

type Service struct {
	Authorization
	Desk
	Room
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

func NewService(repos *repository.Repository) *Service {
	return &Service{
		// Cards:      NewZaprosServiceCard(repos.Cards),
		// Work:       NewZaprosServiceWork(repos.Work),
		// Services:   NewZaprosServiceServices(repos.Services),
		// Materials:  NewZaprosServicesMaterials(repos.Materials),
		// Customers:  NewZaprosServicesCustomer(repos.Customers),
		// Delivers:   NewZaprosServicesDelivers(repos.Delivers),
		// Categories: NewZaprosServicesCategories(repos.Categories),
		// Reques:     NewZaprosServicesRequest(repos.Reques),
		Authorization: NewAuthService(repos.Authorization),
		Desk:          NewDeskService(repos.Desk),
		Room:          NewRoomService(repos.Room),
		// //TodoItem:      NewTodoItemService(repos.TodoItem, repos.TodoList),
	}
}
