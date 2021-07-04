import { Location } from '@angular/common';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SignupDataService } from '../signup-data.service';
import { StudentDataService } from '../student-data.service';
import { Course } from './course';
import { StudentdataModel } from './student.model';



@Component({
  selector: 'app-student-home',
  templateUrl: './student-home.component.html',
  styleUrls: ['./student-home.component.css']
})
export class StudentHomeComponent implements OnInit {
  isLinear = false;
  Courses:Course[]=[
         {
      "id":1,
     "course": "COURSE1",

    },
    {
      "id":2,
    "course": "COURSE2",

    },
    {
      "id":3,
      "course": "COURSE3",

      },
  ]
  fee:String;
  trcourse:String;
  selectedCourse:Course = new Course(0, 'Course0')
studentProfile=new StudentdataModel(null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null, null)
  constructor( 
    private rote:ActivatedRoute, 
    private router:Router,  
    private location:Location,
    private studentDB:StudentDataService,
    private ref:ChangeDetectorRef,
    private _auth:SignupDataService) { 
      setTimeout(() => {
        this.ref.detectChanges()
      }, 500)
      this.rote.params.subscribe((val)=>{
        console.log(val);
        this.id = this.rote.snapshot.paramMap.get('id');
        this.scenario = this.rote.snapshot.paramMap.get('scn');
        this.person = this.rote.snapshot.paramMap.get('title');
      })
      if(this.person=='student'){
        this.isStudent=true;
      }else if(this.person=='admin'){
        this.isAdmin=true;
      }
      if(this.scenario=='view'){
        this.isView = true;
      }
    }

    loggedIn=this._auth.loggedIn();
    id:String;
    person:string;
    scenario:string;
    isStudent:Boolean=false;
    isAdmin:Boolean=false;
    isView:Boolean=false;
    courseEdit:Boolean=true;
    public isChecked = false;
  file:File;
  fileName:string="No file selected";
  fileSize:Number;
  PickedImg(event:Event){
    console.log('PickedImg function called')
    const file=(event.target as HTMLInputElement).files[0];
    this.fileSize=file.size
    this.fileName=file.name;
    console.log(this.fileName);
    console.log(this.fileSize)
    if(this.fileSize>65000){alert("File Size exceeds limit. It may not get added.")}
    this.file=file;
    console.log(file)
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload=()=>{
      //   the "result" attribute contains the data as a base64 encoded string.
      this.studentProfile.photo = reader.result as string;
      console.log(this.studentProfile.photo);
    }
  }

  onSelect(courseid){
    console.log(courseid);
    if(courseid == 1){
      this.studentProfile.traincourse="COURSE1";
      this.fee="18,000 plus GST"
      this.studentProfile.fees=this.fee
    }else if(courseid == 2){
      this.studentProfile.traincourse="COURSE2";
      this.fee="20,000 plus GST"
      this.studentProfile.fees=this.fee
    }else if(courseid == 3){
      this.studentProfile.traincourse="COURSE3";
      this.fee="22,000 plus GST"
      this.studentProfile.fees=this.fee
    }
  }

  editCourse(){
    this.courseEdit = !this.courseEdit
  }

  onBack(){
    this.location.back();
  }

  ngOnInit(): void {

    const id = this.rote.snapshot.paramMap.get('id');
    if(this.scenario=='edit' || this.scenario == 'view'){
      this.studentDB.getUser(id)
      .subscribe(data=>{
        if(data){
          this.studentProfile=JSON.parse(JSON.stringify(data));
          console.log(this.studentProfile);
        }else{
          alert("Error occured")
        }
      })
    }

  }
  onSubmit(){
    setInterval(() => {
      this.ref.detectChanges()
    }, 500);
    if(this.isStudent==true && this.scenario=='edit'){
      console.log("Student edit");
      var myDate = new Date();
      var autoID = myDate.getHours() + "" + myDate.getMinutes() + "" + myDate.getSeconds() + "" + myDate.getMilliseconds();
      if( autoID.length>10 ){
        autoID = autoID.substr(0,10);
      }
      var StautoID="ST-"+autoID
      this.studentProfile.studentID = StautoID;
      this.studentDB.toApproval(this.studentProfile).subscribe(data=>{
        console.log(data);
        alert("Student Profile Created Successfully,your studentID is"+autoID+" Please check your registered mail for confirmation.");
        this.router.navigate([''])
      })
    }else if(this.isAdmin==true && this.scenario=='edit'){
      this.studentDB.editStudent(this.id,this.studentProfile).subscribe(data=>{
        alert("student details updated successfully");
        this.router.navigate(['adminhome'])
      })
    }else if(this.isAdmin==true && this.scenario=='add'){
      var myDate = new Date();
      var autoID = myDate.getHours() + "" + myDate.getMinutes() + "" + myDate.getSeconds() + "" + myDate.getMilliseconds();
      if( autoID.length>10 ){
        autoID = autoID.substr(0,10);
      }
      var StautoID="ST-"+autoID
      this.studentProfile.studentID = StautoID;
      this.studentDB.addStudent(this.studentProfile).subscribe((data)=>{
        console.log(data);
        alert("Student Details added Successfully");
        this.router.navigate(['adminhome'])
      })
    }

  }




}
