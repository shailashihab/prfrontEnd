import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EmployerDataService {
  isEmployer:Boolean=false;

  constructor(private http:HttpClient) { }
  user(newUser){ 
    return this.http.post('http://localhost:4000/signup/employer',{'NewUser':newUser})
    .subscribe((data)=>{console.log(data);})
  }
  loginUser(loggedinUser){
    return this.http.post<any>('http://localhost:4000/login',{'loggedInUser':loggedinUser})
  }
  getEmployers(){

  }
  getEmployer(id){

  }
  editEmployer(id){

  }
  addEmployer(employerData){

  }
  deleteEmployer(id){
    
  }
}
