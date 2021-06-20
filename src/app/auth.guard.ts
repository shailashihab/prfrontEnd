import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { SignupDataService } from './signup-data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  isAdmin:Boolean=false;
  isEmployer:Boolean=false;
  // canActivate(
  //   route: ActivatedRouteSnapshot,
  //   state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
  //   return true;
  // }
  constructor( private signupdataserviceinst:SignupDataService, private route:Router){}
  // constructor(private signupdataserviceinst:SignupDataService, private route:Router){}
  canActivate(): boolean {
    if (this.signupdataserviceinst.loggedIn()){
      this.isAdmin=true;
      return true;
    } else {
      alert('Access Failed');
      return false;
    }
  }
  
}
