import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ClientDetail } from '../services/endpoint';
import {spawn} from 'node_modules/spawn-password/spawn';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  orderBringform: boolean;
  clientdetail: ClientDetail;
  whenclicked:boolean;

  constructor(private apiservice: ApiService, private router: Router) { 
   
  }

  

  ngOnInit(): void {
    this.checklogin();
    this.successfullyLogin();
  }

  getid=this.apiservice.getUserId();
  
  clicking(){
    //this.orderBringform = true;
  }

  addProduct(){
    //this.orderBringform = false;
    // TODO: remove this
    // console.log("hi sedem");
    // this.spawned_password = JSON.stringify(spawn.spawn());    
    // console.log(this.spawned_password);
  }

  logout(){
    this.apiservice.logOut();
    this.checklogin();
  }

  checklogin(){
    if (this.apiservice.getUserId()==null || this.apiservice.getUserId()==undefined || this.apiservice.getUserId()=="") {
    this.router.navigate(['/login']);
    }
 }

  successfullyLogin(){
    this.apiservice.getClientDetail()
    .subscribe(data => {
      this.clientdetail=data;
    });
  }

  onOrder(){
    this.orderBringform=true;
  }

}
