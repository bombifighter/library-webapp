import { Component, OnInit } from '@angular/core';
import {NewborrowService} from "../../services/newborrow.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {Borrow} from "../borrows/borrow";

@Component({
  selector: 'app-newborrow',
  templateUrl: './newborrow.component.html',
  styleUrls: ['./newborrow.component.css']
})
export class NewborrowComponent implements OnInit {

  borrow = new Borrow();

  constructor(private newBorrowService: NewborrowService,
              private router: Router,
              public loginService: LoginService) { }

  ngOnInit(): void {
  }

  handleSave() {
    this.newBorrowService.saveBorrow(this.borrow).subscribe(() => {
      this.router.navigate(['borrows'])
    });
  }

}
