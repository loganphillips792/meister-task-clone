package main

import (
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/rs/cors"
	"go.uber.org/zap"
)

type Handler struct {
	logger *zap.SugaredLogger
	//dbConn *sql.DB
}

func main() {
	fmt.Println("Hello world")

	logger, _ := zap.NewProduction()
	defer logger.Sync() // flushes buffer, if any
	sugar := logger.Sugar()

	envHandler := &Handler{logger: sugar}
	//envHandler := &Handler{logger: sugar, dbConn: db}

	c := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	http.HandleFunc("/hello", envHandler.HelloWorld)
	http.HandleFunc("/random", envHandler.GetRandomString)

	handler := c.Handler()

	log.Fatal(http.ListenAndServe(":8000", handler))
}

func (handler *Handler) HelloWorld(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"status":"OK"}`))
}

func (handler *Handler) GetRandomString(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")

	data := fmt.Sprintf("{response:%s}", randStringRunes(10))
	w.Write([]byte(data))
	//w.Write([]byte(`{"status":"OK"}`))
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
