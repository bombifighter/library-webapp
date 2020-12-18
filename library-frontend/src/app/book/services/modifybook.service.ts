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
        catchError(this.handleErrorNoBook)
      );
  }

  saveModification(book: Book) {
    if(this.isThereEmptyField(book)) {
      return this.handleErrorEmptyField(Error);
    }
    if(isNaN(book.quantity)) {
      return this.handleErrorQuantityIsNaN(Error);
    }
    if(book.quantity < 0) {
      return this.handleErrorNegativeQuantity(Error);
    }
    book.quantity = parseInt(book.quantity.toString());
    return this.http.put<Book>('http://localhost:8080/api/books/update/' + book.id, book);
  }

  handleErrorNoBook(error) {
    let errorMessage = `Error Code: ${error.status}\nBook not found in the database`;
    return throwError(errorMessage);
  }

  isThereEmptyField(book: Book){
    return book.title === null || book.isbn === null || book.quantity === null || book.description === null
      || book.author === null || book.genre === null || book.title == "" || book.isbn == "" || book.description == ""
      || book.author == "" || book.genre == "";
  }

  handleErrorEmptyField(error) {
    let errorMessage = "emptyFieldError";
    return throwError(errorMessage);
  }

  handleErrorNegativeQuantity(error) {
    let errorMessage = "negativeQuantityError";
    return throwError(errorMessage);
  }

  handleErrorQuantityIsNaN(error) {
    let errorMessage = "QuantityIsNaNError";
    return throwError(errorMessage);
  }
}
