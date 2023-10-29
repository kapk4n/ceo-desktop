package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type TaskService struct {
	repo repository.Task
}

func NewTaskService(repo repository.Task) *TaskService {
	return &TaskService{repo: repo}
}

func (s *TaskService) Create(list dashboard.Task, authorId int) (int, error) {
	return s.repo.Create(list, authorId)
}

// func (s *TaskService) Update(list dashboard.Task, authorId int) error {
// 	return s.repo.Update(list, authorId)
// }
