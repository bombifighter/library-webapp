import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Member} from "../components/members/member";

@Injectable({
  providedIn: 'root'
})
export class ModifymemberService {

  constructor(private http: HttpClient,
              private router: Router) { }

  saveModification(member: Member) {
    return this.http.put<Member>("http://localhost:8080/api/members/update/" + member.id, member);
  }
}
