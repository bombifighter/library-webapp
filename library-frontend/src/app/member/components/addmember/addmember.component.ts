import { Component, OnInit } from '@angular/core';
import {Member} from "../members/member";
import {AddbookService} from "../../../book/services/addbook.service";
import {Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {AddmemberService} from "../../services/addmember.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-addmember',
  templateUrl: './addmember.component.html',
  styleUrls: ['./addmember.component.css']
})
export class AddmemberComponent implements OnInit {

  member = new Member();
  password: string = null;
  show: boolean = false;
  username: string = sessionStorage.getItem('authenticatedUser');

  constructor(private addMemberService: AddmemberService,
              private router: Router,
              public loginService: LoginService) { }

  ngOnInit(): void {
  }

  handleSave() {
    if(this.member.username == null) {
      this.member.username = "";
    }
    this.addMemberService.saveMember(this.member, this.password).subscribe(() => {
      Swal.fire(
        'Added!',
        'New member has been added.',
        'success'
      )
      this.router.navigate(['members'])
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
        case "invalidEmailError": {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Invalid email!'
          });
          break;
        }
        case "unavailableUsernameError": {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Username 'admin' is not available!"
          });
          break;
        }
        case 405: {
          console.log(error);
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Username already exists!"
          });
          break;
        }
        default:{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong.'
          });
        }
      }
    });
  }

  togglePassword() {
    this.show = !this.show;
  }

}
