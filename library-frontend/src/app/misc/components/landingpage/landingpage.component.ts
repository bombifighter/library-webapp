import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";

@Component({
  selector: 'app-landingpage',
  templateUrl: './landingpage.component.html',
  styleUrls: ['./landingpage.component.css']
})
export class LandingpageComponent implements OnInit {

  username: string;

  constructor(public loginService: LoginService) { }

  ngOnInit(): void {
    this.username = sessionStorage.getItem('authenticatedUser');
  }

}
