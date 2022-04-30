package main

import (
	"log"
	"net/http"

	"github.com/gorilla/mux"
	"github.com/loganphillips792/meistertaskclone/internal/meistertask"
	"github.com/rs/cors"
	"go.uber.org/zap"
)

func main() {
	logger, _ := zap.NewProduction()

	// to fix linting error
	defer func() {
		_ = logger.Sync() // flushes buffer, if any
	}()

	sugar := logger.Sugar()

	r := mux.NewRouter()

	// dependency injection
	envHandler := meistertask.BuildHandler(sugar)
	//envHandler := &Handler{logger: sugar, dbConn: db}

	r.HandleFunc("/hello", envHandler.HelloWorld).Methods("GET")
	r.HandleFunc("/random", envHandler.GetRandomString).Methods("GET")

	c := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	handler := c.Handler(r)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
