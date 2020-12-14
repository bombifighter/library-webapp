import { NgModule } from '@angular/core';
import { BooksComponent} from "./books/books.component";
import {RouterModule, Routes} from "@angular/router";
import {LoginComponent} from "./login/login.component";
import {LandingpageComponent} from "./landingpage/landingpage.component";
import {ModifybookComponent} from "./modifybook/modifybook.component";

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'books', component: BooksComponent },
  { path: '', component: LoginComponent },
  { path: 'landingpage', component: LandingpageComponent },
  { path: 'modifybook/:id', component: ModifybookComponent }
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
