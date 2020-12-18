import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Member} from "../components/members/member";
import {throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AddmemberService {

  constructor(private http: HttpClient) { }

  saveMember(member: Member) {
    if(this.isThereEmptyField(member)) {
      return this.handleErrorEmptyField(Error);
    }
    if(!this.isValidEmail(member.email)) {
      return this.handleErrorInvalidEmail(Error);
    }
    console.log(member.dateOfBirth);
    return this.http.post<Member>('http://localhost:8080/api/members/newMember', member);
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
