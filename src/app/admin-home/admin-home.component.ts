import { animate, state, style, transition, trigger } from '@angular/animations';
import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { SignupDataService } from '../signup-data.service';
import { StudentDataService } from '../student-data.service';
import { StudentdataModel } from '../student-home/student.model';

@Component({
  selector: 'app-admin-home',
  templateUrl: './admin-home.component.html',
  styleUrls: ['./admin-home.component.css'],
  animations: [
    trigger('detailExpand', [
    state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
    state('expanded', style({height: '*'})),
    transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
]),
],
})
export class AdminHomeComponent implements OnInit {

  displayedColumns: string[] = ['studentID','Name','PhNumber', 'Email', 'qlfn', 'passyear', 'SkillSet', 'status', 'traincourse', 'year', 'paymentStatus', 'approvalStatus', 'actions'];
  // dataSource: MatTableDataSource<StudentdataModel>;
  dataSource:any;
  actualDataArray:any;
  
  expandedElement: StudentdataModel | null;

  @ViewChild(MatSort) sort:MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

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
      setTimeout(()=>{
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource([])
        this.actualDataArray = new MatTableDataSource([])
        this.dataSource.data=students; 
        this.actualDataArray.data=students;         
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },100)
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
    this.router.navigate([`profile/${id}`,'view','admin']) 
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
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }
  course1(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if(this.dataSource.data[i].traincourse=='COURSE1'){
        course1Array.push(this.dataSource.data[i])
      }      
    }
    console.log(course1Array);
    this.dataSource=course1Array
  }
  course2(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if(this.dataSource.data[i].traincourse=='COURSE2'){
        course1Array.push(this.dataSource.data[i])
      }      
    }
  
    this.dataSource=course1Array
  }
  course3(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if(this.dataSource.data[i].traincourse=='COURSE3'){
        course1Array.push(this.dataSource.data[i])
      }      
    }
    this.dataSource=course1Array
  }
  after2021(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if(this.dataSource.data[i].passyear>=2021){
      }      
    }
    this.dataSource=course1Array
  }
  before2021(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if(this.dataSource.data[i].passyear<2021){
        if(this.dataSource.data[i].passyear>=2015){
          course1Array.push(this.dataSource.data[i])
        }
      }      
    }
    this.dataSource=course1Array
  }
  before2015(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if( this.dataSource.data[i].passyear<2015){
       course1Array.push(this.dataSource.data[i])
      }      
    }
    this.dataSource=course1Array
  }
  approved(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if(this.dataSource.data[i].approvalStatus=='APPROVED'){
        course1Array.push(this.dataSource.data[i])
      }      
    }
    this.dataSource=course1Array
  }
  pending(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if(this.dataSource.data[i].approvalStatus=='PENDING'){
        course1Array.push(this.dataSource.data[i])
      }      
    }
    this.dataSource=course1Array
  }
  notpaid(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if(this.dataSource.data[i].paymentStatus!='PAID'){
        course1Array.push(this.dataSource.data[i])
      }      
    }
    this.dataSource=course1Array
  }
  paid(){
    var course1Array=[];
    for (let i = 0; i < this.dataSource.data.length; i++) {
      if(this.dataSource.data[i].paymentStatus=='PAID'){
        course1Array.push(this.dataSource.data[i])
      }      
    }
    this.dataSource=course1Array
  }
  onReset(){
    this.ngOnInit();
  }
}
