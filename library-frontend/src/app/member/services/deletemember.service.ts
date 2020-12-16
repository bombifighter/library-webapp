import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class DeletememberService {

  constructor(private http: HttpClient) { }

  deleteMember(id: number) {
    return this.http.delete("http://localhost:8080/api/members/delete/" + id);
  }
}
