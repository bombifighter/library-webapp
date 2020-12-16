import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {MembersService} from "../../services/members.service";
import {ModifymemberService} from "../../services/modifymember.service";
import {Member} from "../members/member";

@Component({
  selector: 'app-modifymember',
  templateUrl: './modifymember.component.html',
  styleUrls: ['./modifymember.component.css']
})
export class ModifymemberComponent implements OnInit {

  member = new Member();

  constructor(private route: ActivatedRoute,
              private router: Router,
              private membersService: MembersService,
              private modifyMemberService: ModifymemberService,
              public loginService: LoginService) { }

  ngOnInit(): void {
    this.membersService.memberById(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe((result) => {
      this.member = result;
    });
  }

  handleSave() {
    this.modifyMemberService.saveModification(this.member).subscribe(() => {
      this.router.navigate(['members']);
    });
  }

}
