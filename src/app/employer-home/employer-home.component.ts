import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { EmployerDataService } from '../employer-data.service';
import { SignupDataService } from '../signup-data.service';

@Component({
  selector: 'app-employer-home',
  templateUrl: './employer-home.component.html',
  styleUrls: ['./employer-home.component.css']
})
export class EmployerHomeComponent implements OnInit {
  displayedColumns: string[]=['EmployerID', 'Name', 'PhNumber', 'Email', 'department', 'actions'];

  dataSource:any;
  actualDataArray:any;

  @ViewChild(MatSort) sort:MatSort;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(
    private employerDB:EmployerDataService,
    private router:Router,
    private _auth:SignupDataService
  ) { }

  loggedIn = this._auth.loggedIn();

  ngOnInit(): void {
    this.employerDB.getEmployers().subscribe(employers=>{
      console.log(employers);
      setTimeout(()=>{
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource([])
        this.actualDataArray = new MatTableDataSource([])
        this.dataSource.data=employers; 
        console.log(this.dataSource.data);
        this.actualDataArray.data=employers;         
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },100)
    })
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
    }
  }
  editEmployer(id){
    this.router.navigate([`employer/${id}`,'edit','admin'])
  }
  deleteEmployer(id){
    this.employerDB.deleteEmployer(id).subscribe((data)=>{
      this.ngOnInit();
      alert("Employer removed");
    })
  }
}
