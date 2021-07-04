import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent implements OnInit {
  stCount:number=0;
  stCountstop:any= setInterval(()=>{
    this.stCount++;
    if(this.stCount==1296){
      clearInterval(this.stCountstop);
    }
  },10)
  cousCount:number=0;
  cousCountstop:any= setInterval(()=>{
    this.cousCount++;
    if(this.cousCount==25){
      clearInterval(this.cousCountstop);
    }
  },300)
  trCount:number=0;
  trCountstop:any= setInterval(()=>{
    this.trCount++;
    if(this.trCount==45){
      clearInterval(this.trCountstop);
    }
  },150)

  constructor() { }

  ngOnInit(): void {
  }

}
