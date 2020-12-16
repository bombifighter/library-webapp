import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeleteborrowService {

  constructor(private http: HttpClient) { }

  deleteBorrow(id: number) {
    return this.http.delete("http://localhost:8080/api/borrows/delete/" + id);
  }
}
