import { Component, OnInit } from '@angular/core';
import {LoginService} from "../../../auth/services/login.service";
import {ProfileService} from "../../services/profile.service";
import {CredWrapper} from "../../../member/components/members/CredWrapper";
import {Member} from "../../../member/components/members/member";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  member: Member = null;

  constructor(public loginService: LoginService,
              private profileService: ProfileService) { }

  ngOnInit(): void {
    this.profileService.getMyMemberData().subscribe((result) => {
      this.member = result;
    })
  }

}
