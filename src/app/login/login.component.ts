import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EmployerDataService } from '../employer-data.service';
import { SignupDataService } from '../signup-data.service';
import { StudentDataService } from '../student-data.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginData={
    type:'',
    Email:'',
    Password:''
  }
  errMsg=false;
  token='';
  isEmployer:Boolean=false;
  constructor(private singupdataServObj:SignupDataService, private route:Router,
    private studentDB:StudentDataService, private employerDB:EmployerDataService) { }

  ngOnInit(): void {
  }
  loginUser(){
    console.log(this.loginData)
    if(this.loginData.type=='recruiter'){
      this.studentDB.loginUser(this.loginData).subscribe(res=>{
        if(res===null){
          alert("no user")
        }else{
          this.route.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
            this.route.navigate(['adminhome']);
          })          
        }
      })
    }else if(this.loginData.type=='student'){
      this.employerDB.loginUser(this.loginData).subscribe(res=>{
        if(res===null){
          alert("no user")
        }else{
          this.route.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
            this.route.navigate([`/profile/${res._id}`,'edit','student']);
          })
        }
      })
    }else{
      this.singupdataServObj.loginUser(this.loginData).subscribe(res=>{
        if(res.token){
              localStorage.setItem('token', res.token);
              console.log('saved');
              this.route.navigateByUrl('/',{skipLocationChange:true}).then(()=>{
                this.route.navigate(['adminhome']);
              })
            }
      })
    }
    // this.singupdataServObj.loginUser(this.loginData)
    // .subscribe(res=>{
    //   console.log(res)
    //         if(res===null){
    //     alert('User not found. Please SignUp First');
    //   }
    //   else if(res.token){
    //     localStorage.setItem('token', res.token);
    //     console.log('saved');
    //     this.route.navigate(['adminhome']);
    //   }
    //   else{
    //     if(this.loginData.type=='recruiter'){
    //       this.route.navigate([`/employerhome/${res._id}/editprofile`]);
    //     }else {
    //       this.route.navigate([`/studenthome/${res._id}/editprofile`]);
    //     }
    //   }
    // })
  }
}
