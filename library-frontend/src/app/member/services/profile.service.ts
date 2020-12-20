import { Injectable } from '@angular/core';
import {Member} from "../components/members/member";
import {catchError} from "rxjs/operators";
import {HttpClient} from "@angular/common/http";
import {CredWrapper} from "../components/members/CredWrapper";

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  constructor(private http: HttpClient) { }

  getMyMemberData() {
    return this.http.get<Member>('http://localhost:8080/api/members/mydata');
  }
}
