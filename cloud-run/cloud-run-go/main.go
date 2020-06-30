package main

import (
	"html/template"
	"log"
	"net/http"
	"path/filepath"
)

func main() {
	// Add assets - public/css
	fs := http.FileServer(http.Dir("./public"))
	http.Handle("/public/", http.StripPrefix("/public/", fs))

	http.HandleFunc("/", mainPage)

	log.Println("Listening on port: 8080")
	err := http.ListenAndServe(":8080", nil)
	if err != nil {
		log.Fatal(err)
	}
}

func mainPage(w http.ResponseWriter, r *http.Request) {
	lp := filepath.Join("templates", "index.html")
	hp := filepath.Join("templates", "header.html")
	fp := filepath.Join("templates", "footer.html")
	log.Println(lp)

	//	fp := filepath.Join("templates", filepath.Clean(r.URL.Path))
	//	log.Println(fp)

	pageTemplate, _ := template.ParseFiles(lp, hp, fp)
	pageTemplate.Execute(w, nil)
}
