import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "../components/members/member";
import {Observable} from "rxjs";
import {Book} from "../../book/components/books/book";

@Injectable({
  providedIn: 'root'
})
export class MembersService {

  constructor(private http: HttpClient) { }

  memberService() {
    return this.http.get<Member[]>('http://localhost:8080/api/members/getAllMembers');
  }

  memberById(id: number): Observable<Member> {
    return this.http.get<Member>('http://localhost:8080/api/members/'+id);
  }
}
