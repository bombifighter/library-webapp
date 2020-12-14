import { Injectable } from '@angular/core';
import {Book} from "./books/book";
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ModifybookService {

  constructor(private http: HttpClient,
              private router: Router) { }

  saveModification(book: Book): void {
    book.quantity = parseInt(book.quantity.toString());
    let link: string = 'http://localhost:8080/api/books/update/' + book.id;
    this.http.put(link, JSON.stringify(book)).subscribe();
  }
}
