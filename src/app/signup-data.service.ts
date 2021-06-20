import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SignupDataService {
  tokenCheck:Boolean;
  constructor(private http:HttpClient) { }
  user(newUser){ 
      return this.http.post('http://localhost:4000/signup',{'NewUser':newUser})
      .subscribe((data)=>{console.log(data);})
  }
  getUser(id:String){
    return this.http.get(`http://localhost:4000/login/${id}`);
  }
  loginUser(loggedinUser){
    return this.http.post<any>('http://localhost:4000/login',{'loggedInUser':loggedinUser})
  }
  loggedIn(){
    return !!localStorage.getItem('token');  
  }
  getToken(){
    return localStorage.getItem('token');
  }
}
