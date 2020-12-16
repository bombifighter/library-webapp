import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Book } from "../components/books/book";
import {Observable, throwError} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  constructor(private http: HttpClient,
              private router: Router) { }

  bookService() {
    return this.http.get<Book[]>('http://localhost:8080/api/books/getAllBooks');
  }

  bookById(id: number): Observable<Book> {
    return this.http.get<Book>('http://localhost:8080/api/books/'+id);
  }
}
