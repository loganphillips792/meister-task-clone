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

	logger.Sync() // flushes buffer, if any

	sugar := logger.Sugar()

	r := mux.NewRouter()

	//envHandler := &Handler{logger: sugar}

	envHandler := meistertask.BuildHandler(sugar)
	//envHandler := &Handler{logger: sugar, dbConn: db}
	meistertask.PrintHelloWorld()
	r.HandleFunc("/hello", envHandler.HelloWorld).Methods("GET")
	r.HandleFunc("/random", envHandler.GetRandomString).Methods("GET")

	c := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	//tempHandler := meistertask.BuildHandler(sugar)

	handler := c.Handler(r)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
