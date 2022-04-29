package main

import (
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
)

func Router() *mux.Router {
	envHandler := &Handler{logger: nil}

	router := mux.NewRouter()
	router.HandleFunc("/random", envHandler.GetRandomString).Methods("GET")
	return router
}

func TestGetRequest(t *testing.T) {
	request := httptest.NewRequest("GET", "/random", nil)
	response := httptest.NewRecorder()
	Router().ServeHTTP(response, request)
	assert.Equal(t, 200, response.Code, "OK response is expected")
}
