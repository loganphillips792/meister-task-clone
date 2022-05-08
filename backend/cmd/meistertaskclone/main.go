package main

import (
	"context"
	"fmt"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/mux"
	"github.com/jackc/pgx/v4"
	"github.com/joho/godotenv"
	"github.com/loganphillips792/meistertaskclone/internal/meistertask"
	"github.com/rs/cors"
	"go.uber.org/zap"
)

func initializeDatabase() *pgx.Conn {
	err := godotenv.Load()

	if err != nil {
		log.Fatal("Error loading .env file")
	}

	databaseUrl := fmt.Sprintf("postgres://postgres:%s@%s:5432/%s", os.Getenv("POSTGRES_PASSWORD"), os.Getenv("POSTGRES_HOST"), os.Getenv("POSTGRES_DB"))
	fmt.Println(databaseUrl)

	conn, err := pgx.Connect(context.Background(), databaseUrl)

	if err != nil {
		fmt.Fprintf(os.Stderr, "Unable to connect to database: %v\n", err)
		os.Exit(1)
	}
	defer conn.Close(context.Background())

	return conn
}

func main() {
	logger, _ := zap.NewProduction()

	// to fix linting error
	defer func() {
		_ = logger.Sync() // flushes buffer, if any
	}()

	sugar := logger.Sugar()

	r := mux.NewRouter()

	conn := initializeDatabase()

	// dependency injection
	envHandler := meistertask.BuildHandler(sugar, conn)
	//envHandler := &Handler{logger: sugar, dbConn: db}

	r.HandleFunc("/hello", envHandler.HelloWorld).Methods("GET")
	r.HandleFunc("/random", envHandler.GetRandomString).Methods("GET")

	c := cors.New(cors.Options{
		AllowedMethods: []string{"GET", "POST", "PUT", "DELETE"},
	})

	handler := c.Handler(r)

	log.Fatal(http.ListenAndServe(":8000", handler))
}
