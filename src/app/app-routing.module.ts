import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AuthGuard } from './auth.guard';
import { EmployerCrudComponent } from './employer-crud/employer-crud.component';
import { EmployerHomeComponent } from './employer-home/employer-home.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { StudentHomeComponent } from './student-home/student-home.component';
import { StudentProfileComponent } from './student-profile/student-profile.component';
import { WelcomeComponent } from './welcome/welcome.component';

const routes: Routes = [
  {path:'', component:WelcomeComponent},
  {path:'signup', component:SignupComponent},
  {path:'login', component:LoginComponent},
  {path:'adminhome', component:AdminHomeComponent},
  {path:'employerlist', component:EmployerHomeComponent},
  {path:'studenthome/:id/editprofile', component:StudentHomeComponent},
  {path:'profile/:id/:scn/:title', component:StudentHomeComponent},
  {path:'employer/:id/:scn/:title', component:EmployerCrudComponent},
  {path:'profile/:scn/:title', component:StudentHomeComponent,canActivate:[AuthGuard]},
  {path:'employer/:scn/:title', component:EmployerCrudComponent,canActivate:[AuthGuard]},
  {path:'employerhome/:id/:scn/:title', component:EmployerHomeComponent},
  {path:'accountactivate', component:StudentProfileComponent},
  {path:'accountactivate/:token', component:StudentProfileComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
