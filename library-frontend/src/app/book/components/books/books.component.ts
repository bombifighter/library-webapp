import { Component, OnInit } from '@angular/core';
import {BooksService} from "../../services/books.service";
import { Book } from "./book";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {DeletebookService} from "../../services/deletebook.service";
import Swal from 'sweetalert2'
import {catchError} from "rxjs/operators";

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

  requestConfirm(id: number) {
    Swal.fire({
      title: `Are you sure to delete book with id:${id} ?`,
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

  handleDelete(id: number) {
    this.deleteBookService.deleteBook(id).subscribe(() => {
      Swal.fire(
        'Deleted!',
        'Book has been deleted.',
        'success'
      )
      this.ngOnInit();
    },error => {
      if(error == "cannotDeleteError") {
        Swal.fire("Book cannot be deleted as it has active borrow(s)")
      } else {
        Swal.fire(error);
      }
    });
  }
}
