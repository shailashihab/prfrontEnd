import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupDataService } from '../signup-data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  loginCheck:boolean=false;
  
  constructor(private _router:Router, private _auth:SignupDataService, private ref:ChangeDetectorRef) { 
    setInterval(() => {
      this.ref.detectChanges()
    }, 500)
  }

  loggedIn = this._auth.loggedIn();
  
  ngOnInit(): void {
    setInterval(()=>{
      this.loggedIn
    },100)
  }
  log_out(){
		localStorage.removeItem('token');
    this.ngOnInit();
		this._router.navigate([''])
	}
  addStudent(){
    this._router.navigate([`profile/`,'add','admin'])
  }
  addEmployer(){
    this._router.navigate([`employer/`,'add','admin'])
  }
  EmployerList(){
    this._router.navigate([`employerlist`])
  }
}
