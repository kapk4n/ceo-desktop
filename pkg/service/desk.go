package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type DeskService struct {
	repo repository.Desk
}

func NewDeskService(repo repository.Desk) *DeskService {
	return &DeskService{repo: repo}
}

func (s *DeskService) Create(userId int, list dashboard.Desk) (int, error) {
	return s.repo.Create(userId, list)
}

// func (s *DeskService) GetAll(userId int) ([]dashboard.Desk, error) {
// 	return s.repo.GetAll(userId)
// }

// func (s *DeskService) GetById(userId, listId int) (dashboard.Desk, error) {
// 	return s.repo.GetById(userId, listId)
// }

// func (s *DeskService) Delete(userId, listId int) error {
// 	return s.repo.Delete(userId, listId)
// }

// func (s *TodoListService) Update(userId, listId int, input todo.UpdateListInput) error {
// 	if err := input.Validate(); err != nil {
// 		return err
// 	}
// 	return s.repo.Update(userId, listId, input)
// }
