import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "../components/books/book";
import {catchError} from "rxjs/operators";
import {throwError} from "rxjs";
import Swal from 'sweetalert2'

@Injectable({
  providedIn: 'root'
})
export class DeletebookService {

  constructor(private http: HttpClient) { }

  deleteBook(id: number) {
    return this.http.delete("http://localhost:8080/api/books/delete/" + id)
          .pipe(
            catchError(this.handleErrorCannotDelete)
          );
  }


  handleErrorCannotDelete(error) {
    let errorMessage = "cannotDeleteError";
    return throwError(errorMessage);
  }
}
