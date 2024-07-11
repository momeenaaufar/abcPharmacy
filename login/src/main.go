package main

import (
	"database/sql"
	"encoding/json"
	"fmt"
	"log"
	"net/http"
	"strconv"
)

// Item represents an item in the database
type Item struct {
	ID        int    `json:"id"`
	Name      string `json:"name"`
	UnitPrice string `json:"unit_price"`
	ItemType  string `json:"item_type"`
}

var db *sql.DB

func init() {
	var err error
	// Initialize the database connection
	// Set your PostgreSQL database connection details
	db, err = sql.Open("postgres", "user=your_username dbname=your_database_name sslmode=disable")
	if err != nil {
		log.Fatal("Error connecting to the database: ", err)
	}
}

func main() {
	// Create a new ServeMux
	mux := http.NewServeMux()

	// Define routes
	mux.HandleFunc("/", helloHandler)
	mux.HandleFunc("/items", getItems)
	mux.HandleFunc("/items/add", addItem)
	mux.HandleFunc("/items/edit", editItem)
	mux.HandleFunc("/items/delete", deleteItem)

	// Start the server on port 8080
	log.Printf("Server is running on :8080\n")
	log.Fatal(http.ListenAndServe(":8080", mux))
}

func helloHandler(w http.ResponseWriter, r *http.Request) {
	fmt.Fprint(w, "Hello, Go!")
}

func getItems(w http.ResponseWriter, r *http.Request) {
	rows, err := db.Query("SELECT id, name, unit_price, item_type FROM items")
	if err != nil {
		http.Error(w, "Error querying items", http.StatusInternalServerError)
		return
	}
	defer rows.Close()

	var items []Item
	for rows.Next() {
		var item Item
		err := rows.Scan(&item.ID, &item.Name, &item.UnitPrice, &item.ItemType)
		if err != nil {
			http.Error(w, "Error scanning items", http.StatusInternalServerError)
			return
		}
		items = append(items, item)
	}

	json.NewEncoder(w).Encode(items)
}

func addItem(w http.ResponseWriter, r *http.Request) {
	var newItem Item
	err := json.NewDecoder(r.Body).Decode(&newItem)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("INSERT INTO items (name, unit_price, item_type) VALUES ($1, $2, $3)",
		newItem.Name, newItem.UnitPrice, newItem.ItemType)
	if err != nil {
		http.Error(w, "Error adding item to the database", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusCreated)
}

func editItem(w http.ResponseWriter, r *http.Request) {
	idParam := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		http.Error(w, "Invalid item ID", http.StatusBadRequest)
		return
	}

	var updatedItem Item
	err = json.NewDecoder(r.Body).Decode(&updatedItem)
	if err != nil {
		http.Error(w, "Invalid request body", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("UPDATE items SET name=$1, unit_price=$2, item_type=$3 WHERE id=$4",
		updatedItem.Name, updatedItem.UnitPrice, updatedItem.ItemType, id)
	if err != nil {
		http.Error(w, "Error updating item in the database", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}

func deleteItem(w http.ResponseWriter, r *http.Request) {
	idParam := r.URL.Query().Get("id")
	id, err := strconv.Atoi(idParam)
	if err != nil {
		http.Error(w, "Invalid item ID", http.StatusBadRequest)
		return
	}

	_, err = db.Exec("DELETE FROM items WHERE id=$1", id)
	if err != nil {
		http.Error(w, "Error deleting item from the database", http.StatusInternalServerError)
		return
	}

	w.WriteHeader(http.StatusOK)
}
