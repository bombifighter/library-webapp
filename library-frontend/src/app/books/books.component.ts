import { Component, OnInit } from '@angular/core';
import {BooksService} from "../books.service";
import { Book } from "./book";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.css']
})
export class BooksComponent implements OnInit {

  books: Book[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              private booksService: BooksService) { }

  ngOnInit(): void {
    this.booksService.bookService().subscribe((result) => {
      this.books = result;
    });
  }
}
