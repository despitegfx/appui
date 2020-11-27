import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})

export class LoginComponent implements OnInit {
  email:string="";
  password:string="";

  error:boolean;
  incorrectError:boolean;
  userId:any;
  loginstatus:any;
  internetError:string;

  loading:string="Login";

  constructor(private apiservice: ApiService, private router: Router) {}

  ngOnInit(): void {}

  onSubmit(){    

    if(this.email=="" || this.password==""){
      this.error=true;
      
    }else{
      this.loading="logging...";
      this.error=false;

      var myHeaders = new Headers();
      myHeaders.append("Content-Type", "application/json");

      var raw = JSON.stringify({"email":this.email,"password":this.password});
      
      var options:RequestInit = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
        mode: 'cors'
      };

      let id;
      let loginstatus;
      fetch("https://trade-client-connectivity.herokuapp.com/client/login", options)
        .then(response => response.text())
        .then(result => {
          id = JSON.parse(result).userId;
          loginstatus = JSON.parse(result).status;
        
         if (loginstatus=="failed") {
          this.loading="Login";
           this.incorrectError=true;

         } else if(loginstatus=="authenticated"){
          this.loading="Login";
          this.incorrectError=true;
          this.apiservice.setUserId(id);
          this.router.navigate(['/dashboard']);
         
        }
          
        }).catch(error => {
          this.internetError = "Login failed, try again";
          this.loading="Login";
        });


        
      }

      

  }

  signUp(){
    this.router.navigate(['/signup']);
  }

  

}
