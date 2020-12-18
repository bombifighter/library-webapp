import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";
import {Member} from "../components/members/member";
import {throwError} from "rxjs";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModifymemberService {

  constructor(private http: HttpClient,
              private router: Router) { }

  memberById(id: number) {
    return this.http.get<Member>('http://localhost:8080/api/members/'+id)
      .pipe(
        catchError(this.handleErrorNoMember)
      );
  }

  saveModification(member: Member) {
    if(this.isThereEmptyField(member)) {
      return this.handleErrorEmptyField(Error);
    }
    if(!this.isValidEmail(member.email)) {
      return this.handleErrorInvalidEmail(Error);
    }
    return this.http.put<Member>("http://localhost:8080/api/members/update/" + member.id, member);
  }

  handleErrorNoMember(error) {
    let errorMessage = `Error Code: ${error.status}\nMember not found in the database`;
    return throwError(errorMessage);
  }

  isThereEmptyField(member: Member) {
    return member.name === null || member.email === null || member.address === null || member.dateOfBirth === null
      || member.name == "" || member.email == "" || member.address == "" || member.dateOfBirth == "";
  }

  isValidEmail(email: string) {
    return new RegExp("[a-zA-Z0-9_\.\+-]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-\.]+").test(email);
  }

  handleErrorEmptyField(error) {
    let errorMessage = "emptyFieldError";
    return throwError(errorMessage);
  }

  handleErrorInvalidEmail(error) {
    let errorMessage = "invalidEmailError";
    return throwError(errorMessage);
  }
}
