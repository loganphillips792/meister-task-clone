package meistertask

import (
	"net/http/httptest"
	"testing"

	"github.com/gorilla/mux"
	"github.com/stretchr/testify/assert"
	"go.uber.org/zap"
)

func Router() *mux.Router {
	logger, _ := zap.NewProduction()

	// to fix linting error
	defer func() {
		_ = logger.Sync() // flushes buffer, if any
	}()

	sugar := logger.Sugar()

	envHandler := &Handler{logger: sugar}

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
