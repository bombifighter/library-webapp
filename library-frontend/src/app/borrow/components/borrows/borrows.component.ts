import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {BorrowsService} from "../../services/borrows.service";
import {Borrow} from "./borrow";
import {DeleteborrowService} from "../../services/deleteborrow.service";

@Component({
  selector: 'app-borrows',
  templateUrl: './borrows.component.html',
  styleUrls: ['./borrows.component.css']
})
export class BorrowsComponent implements OnInit {

  borrows: Borrow[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public loginService: LoginService,
              private borrowsService: BorrowsService,
              private deleteBorrowService: DeleteborrowService) { }

  ngOnInit(): void {
    this.borrowsService.borrowService().subscribe((result) => {
      this.borrows = result;
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

}
