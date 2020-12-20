import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "../../member/components/members/member";
import {Borrow} from "../components/borrows/borrow";

@Injectable({
  providedIn: 'root'
})
export class MyborrowsService {

  constructor(private http: HttpClient) { }

  getMemberBorrows() {
    return this.http.get<Borrow[]>('http://localhost:8080/api/borrows/myborrows');
  }
}
