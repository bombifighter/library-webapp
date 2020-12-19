import { Component, OnInit } from '@angular/core';
import {Member} from "./member";
import {ActivatedRoute, Router} from "@angular/router";
import {LoginService} from "../../../auth/services/login.service";
import {MembersService} from "../../services/members.service";
import {DeletememberService} from "../../services/deletemember.service";
import Swal from "sweetalert2";

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css']
})
export class MembersComponent implements OnInit {

  members: Member[];
  username: string = sessionStorage.getItem('authenticatedUser');

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

  requestConfirm(id: number) {
    Swal.fire({
      title: `Are you sure to delete member with id:${id} ?`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Delete',
      cancelButtonText: 'Cancel'
    }).then((result) => {
      if (result.isConfirmed) {
        this.handleDelete(id);
      }
    })
  }

  handleDelete(id: number) {
    this.deleteMemberService.deleteMember(id).subscribe(() => {
      Swal.fire(
        'Deleted!',
        'Member has been deleted.',
        'success'
      )
      this.ngOnInit()
    });
  }

}
