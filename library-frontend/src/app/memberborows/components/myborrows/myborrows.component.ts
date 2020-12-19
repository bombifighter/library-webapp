import { Component, OnInit } from '@angular/core';
import {Borrow} from "../../../borrow/components/borrows/borrow";
import {LoginService} from "../../../auth/services/login.service";
import {MyborrowsService} from "../../services/myborrows.service";
import {Book} from "../../../book/components/books/book";
import {BooksService} from "../../../book/services/books.service";

@Component({
  selector: 'app-myborrows',
  templateUrl: './myborrows.component.html',
  styleUrls: ['./myborrows.component.css']
})
export class MyborrowsComponent implements OnInit {

  borrows: Borrow[];
  books: Book[] = [];
  username: string = sessionStorage.getItem('authenticatedUser');

  constructor(public loginService: LoginService,
              private myBorrowService: MyborrowsService,
              private booksService: BooksService) { }

  ngOnInit(): void {
    this.myBorrowService.getMemberBorrows().subscribe((result) => {
      this.borrows = result;
      for(let borrow of this.borrows) {
        this.booksService.bookById(borrow.bookId).subscribe((result) => {
          this.books.push(result);
        });
      }
    })
  }

  isOverdue(date: string): boolean {
    let endDate: Date = new Date(date);
    let now: Date = new Date();
    return endDate <= now;
  }

}
