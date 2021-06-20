import { HttpInterceptor } from '@angular/common/http';
import { Injectable, Injector } from '@angular/core';
import { SignupDataService } from './signup-data.service';

@Injectable({
  providedIn: 'root'
})
export class TokenInterceptorService implements HttpInterceptor {

  constructor( private injector:Injector) { }
  intercept(req:any,nxt:any){
    let signupDataServiceInst = this.injector.get(SignupDataService);
    let tokenizedReq = req.clone(
      {
        setHeaders:{
          Authorization:`Bearer ${signupDataServiceInst.getToken()}`
        }
      }
    )
    return nxt.handle(tokenizedReq);
  }
}
