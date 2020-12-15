import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Book} from "./books/book";

@Injectable({
  providedIn: 'root'
})
export class DeletebookService {

  constructor(private http: HttpClient) { }

  deleteBook(id: number) {
    return this.http.delete("http://localhost:8080/api/books/delete/" + id);
  }
}
