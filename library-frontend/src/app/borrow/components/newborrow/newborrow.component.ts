import { Component, OnInit } from '@angular/core';
import {NewborrowService} from "../../services/newborrow.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {Borrow} from "../borrows/borrow";
import {Book} from "../../../book/components/books/book";
import {BooksService} from "../../../book/services/books.service";
import {MembersService} from "../../../member/services/members.service";
import {Member} from "../../../member/components/members/member";
import Swal from "sweetalert2";

@Component({
  selector: 'app-newborrow',
  templateUrl: './newborrow.component.html',
  styleUrls: ['./newborrow.component.css']
})
export class NewborrowComponent implements OnInit {

  borrow = new Borrow();
  books: Book[] = [];
  members: Member[] = [];
  selectedMember: string = null;
  selectedBook: string = null;

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
    if(this.isEmpty(this.selectedBook) || this.isEmpty(this.selectedMember)) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Empty fields not allowed'
      });
    }
    this.borrow.userId = this.extractID(this.selectedMember);
    if(isNaN(this.borrow.userId)) {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid member format!',
        text: 'Valid format: [ID], [MEMBER_NAME]'
      });
    }
    if(!this.isValidMemberId(this.borrow.userId)) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid member ID!'
      });
    }
    this.borrow.bookId = this.extractID(this.selectedBook);
    if(isNaN(this.borrow.bookId)) {
      return Swal.fire({
        icon: 'error',
        title: 'Invalid book format!',
        text: 'Valid format: [ID], [BOOK_NAME]'
      });
    }
    if(!this.isValidBookId(this.borrow.bookId)) {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Invalid book ID!'
      });
    }
    this.newBorrowService.saveBorrow(this.borrow).subscribe(() => {
      Swal.fire(
        'Added!',
        'New borrow has been added.',
        'success'
      )
      this.router.navigate(['borrows'])
    }, error => {
      return Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'No more book available!'
      });
    });
  }

  extractID(input: string): number {
    return parseInt(input.substring(0, input.indexOf(',')))
  }

  isValidMemberId(id: number) {
    for(let member of this.members) {
      if(id == member.id) {
        return true;
      }
    }
    return false;
  }

  isValidBookId(id: number) {
    for(let book of this.books) {
      if(id == book.id) {
        return true;
      }
    }
    return false;
  }

  isEmpty(field: string) {
    return field === null || field == "";
  }

}
