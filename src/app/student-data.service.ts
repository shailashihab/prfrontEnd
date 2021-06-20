import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StudentdataModel } from './student-home/student.model';

@Injectable({
  providedIn: 'root'
})
export class StudentDataService {
  
  constructor(private http:HttpClient) { }
  // student signing up data
  user(newUser){ 
    return this.http.post('http://localhost:4000/signup/student',{'NewUser':newUser})
    .subscribe((data)=>{console.log(data);})
}
loginUser(loggedinUser){
  return this.http.post<any>('http://localhost:4000/login',{'loggedInUser':loggedinUser})
}
getUser(id:String){
  return this.http.get(`http://localhost:4000/student/login/${id}`);
}

getUsers(){
  return this.http.get('http://localhost:4000/students');
}
toApproval(profileData:StudentdataModel){
  console.log(profileData)
  return this.http.post<any>('http://localhost:4000/admin/approveStudent',{'ProfileData':profileData})
}
adminapprove(id,email){
  return this.http.put(`http://localhost:4000/student/approve`,{'mongoId':id,'email':email});
}
confirmEmail(token){
  return this.http.post(`http://localhost:4000/email-activate`,{'TOKEN':token}); 
}
deleteStudent(id){
  return this.http.delete(`http://localhost:4000/admin/deleteStudent/${id}`);
}
editStudent(id,admineditProfile){
  return this.http.put(`http://localhost:4000/admin/ediStudent/${id}`,{'EditedProfile':admineditProfile})
}
paidUpdate(id,email){
  return this.http.put(`http://localhost:4000/student/paid`,{'mongoId':id,'email':email});
}
addStudent(studentData){
  return this.http.post<any>('http://localhost:4000/admin/addStudent',{'StudentData':studentData})
}
}
