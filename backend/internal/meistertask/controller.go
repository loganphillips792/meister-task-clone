package meistertask

import (
	"encoding/json"
	"math/rand"
	"net/http"
	"time"

	"github.com/jackc/pgx/v4"
	"go.uber.org/zap"
)

type RandomString struct {
	RandString string
}

type Handler struct {
	logger *zap.SugaredLogger
	dbConn *pgx.Conn
}

func BuildHandler(log *zap.SugaredLogger, conn *pgx.Conn) *Handler {
	return &Handler{
		logger: log,
		dbConn: conn,
	}
}

func (handler *Handler) HelloWorld(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, err := w.Write([]byte(`{"status":"OK"}`))

	// for linting
	if err != nil {
		handler.logger.Fatalf("Error when writing")
	}
}

func (handler *Handler) GetRandomString(w http.ResponseWriter, req *http.Request) {
	handler.logger.Infow("Getting random string")

	err := json.NewEncoder(w).Encode(RandomString{
		RandString: randStringRunes(10),
	})

	// for linting
	if err != nil {
		handler.logger.Fatalf("Error when encoding json")
	}

	w.Header().Set("Content-Type", "application/json")
}

var letterRunes = []rune("abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ")

func randStringRunes(n int) string {
	rand.Seed(time.Now().UnixNano())
	b := make([]rune, n)
	for i := range b {
		b[i] = letterRunes[rand.Intn(len(letterRunes))]
	}
	return string(b)
}
