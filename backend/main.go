package main

import (
	"fmt"
	"log"
	"net/http"
)

type FileInfo struct {
	Name string
}

func main() {
	fmt.Println("Hello world")

	http.HandleFunc("/hello", HelloWorld)

	log.Fatal(http.ListenAndServe(":8000", nil))
}

func HelloWorld(w http.ResponseWriter, req *http.Request) {
	w.Header().Set("Content-Type", "application/json")
	w.Write([]byte(`{"status":"OK"}`))
}
