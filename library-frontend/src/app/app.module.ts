import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './misc/components/app-routing.module';
import { BooksComponent } from './book/components/books/books.component';
import { LoginComponent } from './auth/components/login/login.component';
import {FormsModule} from "@angular/forms";
import { HttpInterceptorService} from "./auth/services/http-interceptor.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuComponent } from './misc/components/menu/menu.component';
import { LandingpageComponent } from './misc/components/landingpage/landingpage.component';
import { ModifybookComponent } from './book/components/modifybook/modifybook.component';
import { NotloggedinComponent } from './auth/components/notloggedin/notloggedin.component';
import { AddbookComponent } from './book/components/addbook/addbook.component';
import { MembersComponent } from './member/components/members/members.component';
import { AddmemberComponent } from './member/components/addmember/addmember.component';
import { ModifymemberComponent } from './member/components/modifymember/modifymember.component';
import { BorrowsComponent } from './borrow/components/borrows/borrows.component';
import { NewborrowComponent } from './borrow/components/newborrow/newborrow.component';
import { ProfileComponent } from './profiles/components/profile/profile.component';
import { MyborrowsComponent } from './memberborows/components/myborrows/myborrows.component';
import { NopermissionComponent } from './misc/components/nopermission/nopermission.component';


@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    LoginComponent,
    MenuComponent,
    LandingpageComponent,
    ModifybookComponent,
    NotloggedinComponent,
    AddbookComponent,
    MembersComponent,
    AddmemberComponent,
    ModifymemberComponent,
    BorrowsComponent,
    NewborrowComponent,
    ProfileComponent,
    MyborrowsComponent,
    NopermissionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: HttpInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
