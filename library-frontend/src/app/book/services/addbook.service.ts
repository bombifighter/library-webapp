import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../components/books/book";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddbookService {

  constructor(private http: HttpClient) { }

  saveBook(book: Book) {
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
    return this.http.post<Book>('http://localhost:8080/api/books/newBook', book);
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
