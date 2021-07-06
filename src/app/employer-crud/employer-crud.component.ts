import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { employerDataModel } from '../admin-home/employer.model';
import { EmployerDataService } from '../employer-data.service';

@Component({
  selector: 'app-employer-crud',
  templateUrl: './employer-crud.component.html',
  styleUrls: ['./employer-crud.component.css']
})
export class EmployerCrudComponent implements OnInit {
  isAddmode:Boolean = true;
  employerData = new employerDataModel(null, null, null, null, null, null, null, null);
  id:string;
  scenario:string;

  constructor(private employerDB:EmployerDataService, private router:Router, private rote:ActivatedRoute) {
    this.rote.params.subscribe((val)=>{
      console.log(val);
      this.id = this.rote.snapshot.paramMap.get('id');
      this.scenario = this.rote.snapshot.paramMap.get('scn');
    })
   }

  ngOnInit(): void {
    if(this.scenario=='edit'){
      this.isAddmode = false;
      this.employerDB.getEmployer(this.id).subscribe(data=>{
        if(data){
          this.employerData = JSON.parse(JSON.stringify(data));
        }
      })
    }
  }
  newEmployer(){
    if(this.scenario == 'edit'){
      console.log(this.employerData);
      console.log(this.id);
      this.employerDB.editEmployer(this.id,this.employerData).subscribe(data=>{
        console.log(data);
        this.router.navigate([`employerlist`])
      }) 
    }else{   
    console.log(this.employerData);
    this.employerDB.user(this.employerData);
    this.router.navigate([`employerlist`])
    }
  }

}
