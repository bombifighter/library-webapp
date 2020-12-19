import { Component, OnInit } from '@angular/core';
import {Book} from "../books/book";
import {AddbookService} from "../../services/addbook.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  book = new Book();
  username: string = sessionStorage.getItem('authenticatedUser');

  constructor(private addBookService: AddbookService,
              private router: Router,
              public loginService: LoginService) { }

  ngOnInit(): void {
  }

  handleSave() {
    this.addBookService.saveBook(this.book).subscribe(() => {
      Swal.fire(
        'Added!',
        'New book has been added.',
        'success'
      )
      this.router.navigate(['books'])
    }, error => {
      switch (error) {
        case "emptyFieldError": {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Empty fields not allowed!'
          });
          break;
        }
        case "negativeQuantityError": {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Quantity cannot be lower than 0!'
          });
          break;
        }
        case "QuantityIsNaNError": {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Quantity must be a number!'
          });
          break;
        }
        default: {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong!'
          });
        }
      }
    });
  }

}
