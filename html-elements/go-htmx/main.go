package main

import (
	"encoding/json"
	"fmt"
	"html/template"
	"log"
	"net/http"
	"os"

	"github.com/gorilla/handlers"
)

type Player struct {
    Name  string `json:"name"`
    Score int    `json:"score"`
}

type PlayersList struct {
    Players []Player `json:"players"`
}

func readPlayersFromFile(filePath string) ([]Player, error) {
    file, err := os.Open(filePath)
    if err != nil {
        return nil, err
    }
    defer file.Close()

    var data map[string][]Player
    decoder := json.NewDecoder(file)
    err = decoder.Decode(&data)
    if err != nil {
        return nil, err
    }

    players, ok := data["players"]
    if !ok {
        return nil, fmt.Errorf("players key not found in JSON data")
    }

    return players, nil
}

func main() {
	fmt.Println("Go app...")
	players, err := readPlayersFromFile("../../players.json")
	if err != nil {
		fmt.Println("Error:", err)
		return
	}

	tmpl := template.Must(template.ParseFiles("index.html"))

	h1 := func(w http.ResponseWriter, r *http.Request) {
		tmpl.Execute(w, players)
	}

	http.HandleFunc("/", h1)

	log.Fatal(http.ListenAndServe("localhost:9000", handlers.CompressHandler(http.DefaultServeMux)))

}
