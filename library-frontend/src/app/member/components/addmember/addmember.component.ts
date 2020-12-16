import { Component, OnInit } from '@angular/core';
import {Member} from "../members/member";
import {AddbookService} from "../../../book/services/addbook.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {AddmemberService} from "../../services/addmember.service";

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {

  member = new Member();

  constructor(private addMemberService: AddmemberService,
              private router: Router,
              public loginService: LoginService) { }

  ngOnInit(): void {
  }

  handleSave() {
    this.addMemberService.saveMember(this.member).subscribe(() => {
      this.router.navigate(['members'])
    });
  }

}
