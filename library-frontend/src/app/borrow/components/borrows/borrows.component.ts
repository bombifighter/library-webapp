import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {BorrowsService} from "../../services/borrows.service";
import {Borrow} from "./borrow";
import {DeleteborrowService} from "../../services/deleteborrow.service";
import {Member} from "../../../member/components/members/member";
import {Book} from "../../../book/components/books/book";
import {MembersService} from "../../../member/services/members.service";
import {BooksService} from "../../../book/services/books.service";

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
  styleUrls: ['./borrows.component.css']
})
export class BorrowsComponent implements OnInit {

  borrows: Borrow[];
  members: Member[] = [];
  books: Book[] = [];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public loginService: LoginService,
              private borrowsService: BorrowsService,
              private deleteBorrowService: DeleteborrowService,
              private membersService: MembersService,
              private booksService: BooksService) { }

  ngOnInit(): void {
    this.borrowsService.borrowService().subscribe((result) => {
      this.borrows = result;
      for(let borrow of this.borrows) {
        this.membersService.memberById(borrow.userId).subscribe((result) => {
          this.members.push(result);
        });
        this.booksService.bookById(borrow.bookId).subscribe((result) => {
          this.books.push(result);
        });
      }
    });
  }

  handleDelete(id: number) {
    this.deleteBorrowService.deleteBorrow(id).subscribe(() => {
      this.ngOnInit();
    });
  }

  handleExtend(id: number) {
    this.borrowsService.extendByOneMonth(id).subscribe(() => {
      this.ngOnInit();
    })
  }

  isOverdue(date: string): boolean {
    let endDate: Date = new Date(date);
    let now: Date = new Date();
    return endDate <= now;
  }

}
