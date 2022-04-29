package main

import (
	"encoding/json"
	"fmt"
	"log"
	"math/rand"
	"net/http"
	"time"

	"github.com/gorilla/mux"
	"github.com/rs/cors"
	"go.uber.org/zap"
)

type Handler struct {
	logger *zap.SugaredLogger
	//dbConn *sql.DB
}

type RandomString struct {
	RandString string
}

func main() {
	fmt.Println("Hello world")

	logger, _ := zap.NewProduction()
	defer logger.Sync() // flushes buffer, if any

	sugar := logger.Sugar()

	r := mux.NewRouter()

	envHandler := &Handler{logger: sugar}
	//envHandler := &Handler{logger: sugar, dbConn: db}

	r.HandleFunc("/hello", envHandler.HelloWorld).Methods("GET")
	r.HandleFunc("/random", envHandler.GetRandomString).Methods("GET")

	c := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	handler := c.Handler(r)

	log.Fatal(http.ListenAndServe(":8000", handler))
}

func (handler *Handler) HelloWorld(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	_, err := w.Write([]byte(`{"status":"OK"}`))
	if err != nil {
		handler.logger.Fatalf("Error when writing")
	}
}

func (handler *Handler) GetRandomString(w http.ResponseWriter, req *http.Request) {

	err := json.NewEncoder(w).Encode(RandomString{
		RandString: randStringRunes(10),
	})

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
