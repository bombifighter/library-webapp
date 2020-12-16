import { Component, OnInit } from '@angular/core';
import {Member} from "./member";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {MembersService} from "../../services/members.service";
import {DeletememberService} from "../../services/deletemember.service";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];

  constructor(private route: ActivatedRoute,
              private router: Router,
              public loginService: LoginService,
              private memberService: MembersService,
              private deleteMemberService: DeletememberService) { }

  ngOnInit(): void {
    this.memberService.memberService().subscribe((result) => {
      this.members = result;
    });
  }

  handleDelete(id: number) {
    this.deleteMemberService.deleteMember(id).subscribe(() => {
      this.ngOnInit()
    });
  }

}
