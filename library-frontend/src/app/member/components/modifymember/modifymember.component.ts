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

  constructor(private route: ActivatedRoute,
              private router: Router,
              private membersService: MembersService,
              private modifyMemberService: ModifymemberService,
              public loginService: LoginService) { }

  ngOnInit(): void {
    this.modifyMemberService.memberById(parseInt(this.route.snapshot.paramMap.get("id"))).subscribe((result) => {
      this.member = result;
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
            text: 'Something went wrong.'
          });
        }
      }
    });
  }

}
