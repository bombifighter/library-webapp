import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import { Book } from "./book";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {DeletebookService} from "../../services/deletebook.service";
import {newArray} from "@angular/compiler/src/util";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private booksService: BooksService,
              public loginService: LoginService,
              public deleteBookService: DeletebookService) { }

  ngOnInit(): void {
    this.booksService.bookService().subscribe((result) => {
      this.books = result;
    });
  }

  handleDelete(id: number) {
    this.deleteBookService.deleteBook(id).subscribe(() => {
      this.ngOnInit()
    });
  }
}
