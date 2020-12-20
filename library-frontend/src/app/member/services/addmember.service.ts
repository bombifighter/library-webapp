import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "../components/members/member";
import {throwError} from "rxjs";
import {CredWrapper} from "../components/members/CredWrapper";
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AddmemberService {

  constructor(private http: HttpClient) { }

  saveMember(member: Member, password: string) {
    if(this.isThereEmptyField(member, password)) {
      return this.handleErrorEmptyField(Error);
    }
    if(!this.isValidEmail(member.email)) {
      return this.handleErrorInvalidEmail(Error);
    }
    if(member.username == "admin") {
      return this.handleErrorUsernameUnavailable(Error);
    }
    return this.http.post<Member>('http://localhost:8080/api/members/newMember', new CredWrapper(member, password))
      .pipe(catchError(err => {
        return this.handleUsernameError(err.status);
      }));
  }

  isThereEmptyField(member: Member, password: string) {
    return member.name === null || member.email === null || member.address === null || member.dateOfBirth === null
      || password === null || member.name == "" || member.email == "" || member.address == ""
      || member.dateOfBirth == "" || password == "" || member.username === null || member.username == "";
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

  handleErrorUsernameUnavailable(error) {
    let errorMessage = "unavailableUsernameError";
    return throwError(errorMessage);
  }

  handleUsernameError(error) {
    let errorMessage = "usernameAlreadyExistsError";
    return throwError(error);
  }
}
