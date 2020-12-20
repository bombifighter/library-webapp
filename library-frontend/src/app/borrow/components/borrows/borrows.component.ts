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
import Swal from "sweetalert2";

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
  styleUrls: ['./borrows.component.css']
})
export class BorrowsComponent implements OnInit {

  borrows: Borrow[];
  members: Member[] = [];
  books: Book[] = [];
  namesInOrder: string[] = [];
  titlesInOrder: string[] = [];
  username: string = sessionStorage.getItem('authenticatedUser');

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
      this.membersService.memberService().subscribe((result) => {
          this.members = result;
          this.booksService.bookService().subscribe((result) => {
            this.books = result;
            for(let borrow of this.borrows){
              for(let member of this.members) {
                if(borrow.userId == member.id) {
                  this.namesInOrder.push(member.name);
                  break;
                }
              }
              for(let book of this.books) {
                if(borrow.bookId == book.id) {
                  this.titlesInOrder.push(book.title);
                }
              }
            }
          })
      });
    });
  }

  requestConfirmDelete(id: number) {
    Swal.fire({
      title: `Are you sure to delete borrow with id:${id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleDelete(id);
      }
    })
  }

  requestConfirmExtend(id: number) {
    Swal.fire({
      title: `Are you sure to extend borrow with id:${id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Extend',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleExtend(id);
      }
    })
  }

  handleDelete(id: number) {
    this.deleteBorrowService.deleteBorrow(id).subscribe(() => {
      Swal.fire(
        'Deleted!',
        'Borrow has been deleted.',
        'success'
      )
      this.ngOnInit();
    });
  }

  handleExtend(id: number) {
    this.borrowsService.extendByOneMonth(id).subscribe(() => {
      Swal.fire(
        'Extended!',
        'Borrow has been extended.',
        'success'
      )
      this.ngOnInit();
    })
  }

  isOverdue(date: string): boolean {
    let endDate: Date = new Date(date);
    let now: Date = new Date();
    return endDate <= now;
  }

}
