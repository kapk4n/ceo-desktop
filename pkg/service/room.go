package service

import (
	"dashboard"
	"dashboard/pkg/repository"
)

type RoomService struct {
	repo repository.Room
}

func NewRoomService(repo repository.Room) *RoomService {
	return &RoomService{repo: repo}
}

func (s *RoomService) Create(list dashboard.RoomCreating, managerId int) (int, error) {
	return s.repo.Create(list, managerId)
}
