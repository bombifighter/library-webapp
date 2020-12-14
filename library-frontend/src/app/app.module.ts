import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BooksComponent } from './books/books.component';
import { LoginComponent } from './login/login.component';
import {FormsModule} from "@angular/forms";
import { HttpInterceptorService} from "./http-interceptor.service";
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MenuComponent } from './menu/menu.component';
import { LandingpageComponent } from './landingpage/landingpage.component';
import { ModifybookComponent } from './modifybook/modifybook.component';

@NgModule({
  declarations: [
    AppComponent,
    BooksComponent,
    LoginComponent,
    MenuComponent,
    LandingpageComponent,
    ModifybookComponent
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
