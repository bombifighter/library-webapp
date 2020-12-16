import { Injectable } from '@angular/core';
import {Book} from "../components/books/book";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable, throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModifybookService {

  constructor(private http: HttpClient,
              private router: Router) { }


  bookById(id: number): Observable<Book> {
    return this.http.get<Book>('http://localhost:8080/api/books/'+id)
      .pipe(
        catchError(this.handleError)
      );
  }

  saveModification(book: Book) {
    book.quantity = parseInt(book.quantity.toString());
    return this.http.put<Book>('http://localhost:8080/api/books/update/' + book.id, book)
      .pipe(
        catchError(this.handleError2)
      );
  }

  handleError(error) {
    let errorMessage = `Error Code: ${error.status}\nBook not found in the database`;
    return throwError(errorMessage);
  }

  handleError2(error) {
    let errorMessage = `Error Code: ${error.status}\nQuantity cannot be lower than 0`;
    return throwError(errorMessage);
  }
}
