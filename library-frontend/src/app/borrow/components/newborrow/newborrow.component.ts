import { Component, OnInit } from '@angular/core';
import {NewborrowService} from "../../services/newborrow.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {Borrow} from "../borrows/borrow";
import {Book} from "../../../book/components/books/book";
import {BooksService} from "../../../book/services/books.service";
import {MembersService} from "../../../member/services/members.service";
import {Member} from "../../../member/components/members/member";

@Component({
  selector: 'app-newborrow',
  templateUrl: './newborrow.component.html',
  styleUrls: ['./newborrow.component.css']
})
export class NewborrowComponent implements OnInit {

  borrow = new Borrow();
  books: Book[] = [];
  members: Member[] = [];
  selectedMember: string;
  selectedBook: string;

  constructor(private newBorrowService: NewborrowService,
              private router: Router,
              public loginService: LoginService,
              private booksService: BooksService,
              private memberService: MembersService) { }

  ngOnInit(): void {
    this.booksService.bookService().subscribe((result) => {
      this.books = result;
    });
    this.memberService.memberService().subscribe((result) => {
      this.members = result;
    })
  }

  handleSave() {
    this.borrow.userId = this.extractID(this.selectedMember);
    this.borrow.bookId = this.extractID(this.selectedBook);
    this.newBorrowService.saveBorrow(this.borrow).subscribe(() => {
      this.router.navigate(['borrows'])
    });
  }

  extractID(input: string): number {
    return parseInt(input.substring(0, input.indexOf(',')))
  }

}
