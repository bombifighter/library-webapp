import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../components/books/book";

@Injectable({
  providedIn: 'root'
})
export class AddbookService {

  constructor(private http: HttpClient) { }

  saveBook(book: Book) {
    book.quantity = parseInt(book.quantity.toString());
    return this.http.post<Book>('http://localhost:8080/api/books/newBook', book);
  }
}
