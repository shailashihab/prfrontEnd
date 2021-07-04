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
    return this.http.get('http://localhost:4000/employers');
  }
  getEmployer(id){
    return this.http.get(`http://localhost:4000/employers/${id}`);
  }
  editEmployer(id, adminProfile){
    return this.http.put(`http://localhost:4000/admin/editEmployer/${id}`,{'EditProfile':adminProfile})
  }
  addEmployer(employerData){
    return this.http.post<any>('http://localhost:4000/admin/addEmployer',{'EmployerData':employerData})
  }
  deleteEmployer(id){
    return this.http.delete(`http://localhost:4000/admin/deleteEmployer/${id}`);    
  }
}
