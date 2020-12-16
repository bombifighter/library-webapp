import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "../components/members/member";

@Injectable({
  providedIn: 'root'
})
export class AddmemberService {

  constructor(private http: HttpClient) { }

  saveMember(member: Member) {
    return this.http.post<Member>('http://localhost:8080/api/members/newMember', member);
  }
}
