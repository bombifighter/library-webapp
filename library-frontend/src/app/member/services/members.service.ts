import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "../components/members/member";

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  memberService() {
    return this.http.get<Member[]>('http://localhost:8080/api/members/getAllMembers');
  }

  memberById(id: number) {
    return this.http.get<Member>('http://localhost:8080/api/members/'+id);
  }
}
