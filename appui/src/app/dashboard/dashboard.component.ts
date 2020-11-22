import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  whenclicked: boolean;
  
  constructor() { 
   
  }

  ngOnInit(): void {
  }

  
  clicking(){
     this.whenclicked = true;
  }

  addProduct(){
    this.whenclicked = false;
 }


}
