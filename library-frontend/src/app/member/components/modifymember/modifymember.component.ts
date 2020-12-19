import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {MembersService} from "../../services/members.service";
import {ModifymemberService} from "../../services/modifymember.service";
import {Member} from "../members/member";
import Swal from "sweetalert2";

@Component({
  selector: 'app-modifymember',
  templateUrl: './modifymember.component.html',
  styleUrls: ['./modifymember.component.css']
})
export class ModifymemberComponent implements OnInit {

  member = new Member();
  password: string = null;
  show: boolean = false;
  username: string = sessionStorage.getItem('authenticatedUser');

  constructor(private route: ActivatedRoute,
              private router: Router,
              private membersService: MembersService,
              private modifyMemberService: ModifymemberService,
              public loginService: LoginService) { }

  ngOnInit(): void {
    this.modifyMemberService.memberById(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe((result) => {
      this.member = result;
      this.modifyMemberService.passwordById(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe((result) => {
        this.password = result["password"];
      })
    }, error => {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Member not found in the database.'
      });
      this.router.navigate(['/members']);
    });
  }

  handleSave() {
    this.modifyMemberService.saveModification(this.member).subscribe(() => {
      Swal.fire(
        'Modified!',
        'Member has been successfully modified.',
        'success'
      )
      this.router.navigate(['members']);
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
        case "unavailableUsernameError": {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: "Username 'admin' is not available!"
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
        default:{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Username already exists.'
          });
        }
      }
    });
  }

  handlePasswordSave() {
    console.log(this.password)
    this.modifyMemberService.savePassword(this.member.id, this.password).subscribe( () => {
      Swal.fire(
        'Password Modified!',
        'Password has been successfully modified.',
        'success'
      )
      this.router.navigate(['members']);
    }, error => {
      switch (error) {
        case "emptyPasswordError": {
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Password field is empty!'
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
        default:{
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Something went wrong.'
          });
        }
      }
    })
  }

  togglePassword() {
    this.show = !this.show;
  }

}
