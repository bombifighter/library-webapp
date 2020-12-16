import { Component, OnInit } from '@angular/core';
import {Book} from "../books/book";
import {AddbookService} from "../../services/addbook.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";

@Component({
  selector: 'app-addbook',
  templateUrl: './addbook.component.html',
  styleUrls: ['./addbook.component.css']
})
export class AddbookComponent implements OnInit {

  book = new Book();

  constructor(private addBookService: AddbookService,
              private router: Router,
              public loginService: LoginService) { }

  ngOnInit(): void {
  }

  handleSave() {
    this.addBookService.saveBook(this.book).subscribe(() => {
      this.router.navigate(['books'])
    });
  }

}
