import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { from } from 'rxjs';
import { ApiService } from '../services/api.service';
import { ClientDetail } from '../services/endpoint';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  submitted:boolean = false;
  
  email:string="";
  password:string="";
  error:boolean;

  employees: ClientDetail[];

  constructor(private apiservice: ApiService) {}

  ngOnInit(): void {}

  onSubmit(){

    if(this.email=="" || this.password==""){
      this.error=true;
    }else{
      this.error=false;
    }
    // this.submitted = true;
    // this.apiservice.getEmployees()
    // .subscribe(data => {
    //   this.employees=data;
    // });      
  }

  // onSubmit(){
    // this.apiservice.getEmployees()
    // .subscribe(data => {
    //   this.employees=data;
    // });
  //}

}
