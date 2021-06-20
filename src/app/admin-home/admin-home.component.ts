import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SignupDataService } from '../signup-data.service';
import { StudentDataService } from '../student-data.service';
import { StudentdataModel } from '../student-home/student.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css']
})
export class AdminHomeComponent implements OnInit {
students:StudentdataModel[];
  constructor(
    private studentDB:StudentDataService,
    private router:Router,
    private ref:ChangeDetectorRef,
    private _auth:SignupDataService
  ) { }

  loggedIn = this._auth.loggedIn();
  
  ngOnInit(): void {
    this.studentDB.getUsers().subscribe(students=>{
      console.log(students);
      this.students=JSON.parse(JSON.stringify(students));
    })
  }
  approve(id,email){
    console.log(id);
    this.studentDB.adminapprove(id,email).subscribe(data=>{
      alert("student profile approved")
    })
  }
  viewStudent(id){

  }
  editStudent(id){
    this.router.navigate([`profile/${id}`,'edit','admin'])
  }
  deleteStudent(id){
    this.studentDB.deleteStudent(id).subscribe((data)=>{
      this.ngOnInit();
      alert("Student removed");
    })
  }
}
