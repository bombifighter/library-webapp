import { NgModule } from '@angular/core';
import { BooksComponent} from "../../book/components/books/books.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "../../auth/components/login/login.component";
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {ModifybookComponent} from "../../book/components/modifybook/modifybook.component";
import {AddbookComponent} from "../../book/components/addbook/addbook.component";
import {MembersComponent} from "../../member/components/members/members.component";
import {AddmemberComponent} from "../../member/components/addmember/addmember.component";
import {ModifymemberComponent} from "../../member/components/modifymember/modifymember.component";
import {BorrowsComponent} from "../../borrow/components/borrows/borrows.component";
import {NewborrowComponent} from "../../borrow/components/newborrow/newborrow.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BooksComponent },
  { path: '', component: LoginComponent },
  { path: 'landingpage', component: LandingpageComponent },
  { path: 'modifybook/:id', component: ModifybookComponent },
  { path: 'addbook', component: AddbookComponent },
  { path: 'members', component: MembersComponent },
  { path: 'addmember', component: AddmemberComponent },
  { path: 'modifymember/:id', component: ModifymemberComponent },
  { path: 'borrows', component:BorrowsComponent },
  { path: 'newborrow', component: NewborrowComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }
