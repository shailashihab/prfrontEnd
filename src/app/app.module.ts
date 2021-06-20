import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterComponent } from './footer/footer.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { WelcomeComponent } from './welcome/welcome.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TokenInterceptorService } from '../app/token-interceptor.service'
import { FormsModule } from '@angular/forms';
import { ConfirmEqualValidatorDirective } from '../app/confirm-equal-validator.directive';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { GooglePayButtonModule } from '@google-pay/button-angular';
import { EmployerCrudComponent } from './employer-crud/employer-crud.component';
import { MatIconModule } from '@angular/material/icon'


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    FooterComponent,
    SignupComponent,
    LoginComponent,
    WelcomeComponent,
    StudentHomeComponent,
    AdminHomeComponent,
    EmployerHomeComponent,
    ConfirmEqualValidatorDirective,
    StudentProfileComponent,
    EmployerCrudComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    GooglePayButtonModule,
    MatIconModule

  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptorService,
      multi:true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
