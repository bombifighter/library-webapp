import {Member} from "./member";

export class CredWrapper {
  member: Member;
  password: string;

  constructor(member: Member, password: string) {
    this.member = member;
    this.password = password;
  }
}
