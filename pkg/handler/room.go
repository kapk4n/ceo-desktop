package handler

import (
	"dashboard"
	"fmt"
	"net/http"
	"strconv"

	"github.com/gin-gonic/gin"
)

func (h *Handler) createRoom(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}

	var input dashboard.RoomCreating
	if err := c.BindJSON(&input); err != nil {
		newErrorResponse(c, http.StatusBadRequest, err.Error())
		return
	}
	fmt.Print(input)

	id, err := h.services.Room.Create(input, userId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, map[string]interface{}{
		"id": id,
	})
}

func (h *Handler) getRoom(c *gin.Context) {
	userId, err := getUserId(c)
	if err != nil {
		return
	}
	DeskId, _ := strconv.Atoi(c.Param("id"))

	type getAllListsResponse struct {
		Data []dashboard.TaskJoins `json:"data"`
	}

	lists, err := h.services.Task.GetAll(userId, DeskId)
	if err != nil {
		newErrorResponse(c, http.StatusInternalServerError, err.Error())
		return
	}

	c.JSON(http.StatusOK, getAllListsResponse{
		Data: lists,
	})
}
