import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Borrow} from "../components/borrows/borrow";

@Injectable({
  providedIn: 'root'
})
export class BorrowsService {

  constructor(private http: HttpClient) { }

  borrowService() {
    return this.http.get<Borrow[]>('http://localhost:8080/api/borrows/getAllBorrows');
  }

  extendByOneMonth(id: number) {
    return this.http.patch("http://localhost:8080/api/borrows/extendBorrow/" + id, null);
  }
}
