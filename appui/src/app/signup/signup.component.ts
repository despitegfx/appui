import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Form } from '@angular/forms';
import { timer } from 'rxjs';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  fname:string="";
  lname:string="";
  email:string="";
  cardDetails:string="";
  bankBalance:string="";
  password:string="";
  confirmPassword:string="";

  error:boolean;
  incorrectError:boolean;
  failed:boolean;

  constructor(private router: Router) { }

  ngOnInit(): void {
  }


onCreate(){
  if(this.fname=="" || this.lname=="" || this.email=="" || this.cardDetails=="" || this.bankBalance=="" || this.password=="" || this.confirmPassword=="") {
    this.error = true;

  } else {
    
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");

  var raw = JSON.stringify({"fname":this.fname, "lname":this.lname, "email":this.email, "password": this.password, 
                            "cardDetails":this.cardDetails, "bankBalance":this.bankBalance, "userPortfolio":[] });
  
  var options:RequestInit = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
    mode: 'cors'
  };

  let id;

  fetch("https://trade-client-connectivity.herokuapp.com/client/create", options)
    .then(response => response.text())
    .then(result => {
      id = JSON.parse(result).id;
    
    if (id) {
      this.error = false;
      const numbers = timer(1000);
      numbers.subscribe(call => this.router.navigate(['/login']));
     
    }else{
      this.failed=true;
    }
      
    }).catch(error => console.log('error', error));

  }
}
  onGoToLogin(){
    this.router.navigate(['/login']);
  }

}
