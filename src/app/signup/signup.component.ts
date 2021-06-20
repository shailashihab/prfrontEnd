import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { employerDataModel } from '../admin-home/employer.model';
import { EmployerDataService } from '../employer-data.service';
import { SignupDataService } from '../signup-data.service';
import { StudentDataService } from '../student-data.service';
import { StudentdataModel } from '../student-home/student.model';
import { SignUpModel } from './signup.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {
  signupData = new SignUpModel(null,null,null,null,null);
  studentData = new StudentdataModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
  employerData = new employerDataModel(null, null, null, null, null, null, null, null, null)
  constructor( private db:SignupDataService, private router:Router, private studentDB:StudentDataService,
    private employerDB:EmployerDataService) { }

  ngOnInit(): void {
  }
  newUser(){
    console.log(this.studentData)
    this.studentDB.user(this.studentData)
    this.router.navigate(['login']);
  }
  newEmployer(){
    console.log(this.employerData)
    this.employerDB.user(this.employerData)
    this.router.navigate(['login']);
  }
}
