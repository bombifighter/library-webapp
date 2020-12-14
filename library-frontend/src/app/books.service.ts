import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from "./books/book";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient) { }

  bookService() {
    return this.http.get<Book[]>('http://localhost:8080/api/books/getAllBooks');
  }

  bookById(id: number) {
    return this.http.get<Book>('http://localhost:8080/api/books/'+id);
  }
}
