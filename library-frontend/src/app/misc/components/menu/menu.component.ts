import { Component, OnInit } from '@angular/core';
import { LoginService } from "../../../auth/services/login.service";

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit {

  constructor(private loginService: LoginService) { }

  ngOnInit(): void {

  }

  handleLogout() {
    this.loginService.logout();
  }

}
