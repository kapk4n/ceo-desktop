package service

import (
	"dashboard"
	"dashboard/pkg/repository"
	"fmt"
)

type RoomService struct {
	repo repository.Room
}

func NewRoomService(repo repository.Room) *RoomService {
	return &RoomService{repo: repo}
}

func (s *RoomService) Create(list dashboard.RoomCreating, managerId int) (int, error) {
	fmt.Print("From service")
	return s.repo.Create(list, managerId)
}
