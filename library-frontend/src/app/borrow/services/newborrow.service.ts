import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "../../member/components/members/member";
import {Borrow} from "../components/borrows/borrow";

@Injectable({
  providedIn: 'root'
})
export class NewborrowService {

  constructor(private http: HttpClient) { }

  saveBorrow(borrow: Borrow) {
    return this.http.post<Borrow>('http://localhost:8080/api/borrows/newBorrow', borrow);
  }
}
