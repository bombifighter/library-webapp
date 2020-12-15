import { Injectable } from '@angular/core';
import { HttpClient} from "@angular/common/http";
import { map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser';

  public username: String;
  public password: String;

  constructor(private http: HttpClient) { }

  loginService(username: String, password: String) {
    return this.http.get(`http://localhost:8080/api/basicauth`,
      { headers: { authorization: this.createBasicAuthToken(username, password) } }).pipe(map((res) => {
      this.username = username;
      this.password = password;
      this.registerSuccessfulLogin(username, password);
    }));
  }

  createBasicAuthToken(username: String, password: String) {
    return 'Basic ' + window.btoa(username + ":" + password);
  }

  registerSuccessfulLogin(username, password) {
    sessionStorage.setItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME, username);
    sessionStorage.setItem("pw", password);
  }

  isUserLoggedIn() {
    let user = sessionStorage.getItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    return user !== null;
  }

  logout() {
    sessionStorage.removeItem(this.USER_NAME_SESSION_ATTRIBUTE_NAME);
    sessionStorage.removeItem("pw");
    this.username = null;
    this.password = null;
  }
}
