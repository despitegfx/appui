import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ClientDetail, ClientOrders } from '../services/endpoint';
import { DatePipe, formatDate } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  orderBringform: boolean;
  BringOrdersTable: boolean;
  BringPortfolio: boolean=true;


  clientdetail: ClientDetail;
  whenclicked:boolean;
  allOrders:[];
  counter:number;

  
  getid=this.apiservice.getUserId();

  orderId: string= "";
  userId: string=this.getid;
  ticker:string="";
  status: string="Unvalidated";
  dateCreated: string = new Date().toString();
  dateModified: string = new Date().toString();
  price:number;
  quantity:number;
  side: string="";

  constructor(private apiservice: ApiService, private router: Router) {}

  ngOnInit(): void {
    this.checklogin();
    this.successfullyLogin();
    this.onFetchOrder();
  }

  bringPortfolio(){
    this.BringOrdersTable=false;
    this.orderBringform=false
  }

  //when order button is clicked
  onOrder(){
    this.orderBringform=true;
    this.BringPortfolio=false
    this.BringOrdersTable=false;
  }

  brindOrdersTable(){
    this.BringOrdersTable=true;
    this.orderBringform=false;
    this.BringPortfolio=false
  }

  addProduct(){
    //this.orderBringform = false;
    // TODO: remove this
    // console.log("hi sedem");
    // this.spawned_password = JSON.stringify(spawn.spawn());    
    // console.log(this.spawned_password);
  }

  clicking(){

  }

  // clear all cookie services when logout
  logout(){
    this.apiservice.logOut();
    this.checklogin();
  }

  // check if clients has logged in
  checklogin(){
    if (this.apiservice.getUserId()==null || this.apiservice.getUserId()==undefined || this.apiservice.getUserId()=="") {
    this.router.navigate(['/login']);
    }

  
 }

 //fetch client details when logged in
  successfullyLogin(){
    this.apiservice.getClientDetail()
    .subscribe(data => {
      this.clientdetail=data;
    });
  }

  //when submit order button is clicked
  onSubmitOrder(){
    if(this.ticker=="" || this.price==null || this.quantity==null || this.side=="") {
  
    } else {
      
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
     var raw = JSON.stringify({
      "orderId":this.makeOrderId(),
      "userId":this.userId,
      "ticker":this.ticker,
      "status":this.status,
      "dateCreated":this.dateCreated,
      "dateModified":this.dateModified,
      "price":this.price,
      "quantity":this.quantity,
      "side":this.side
    });

    var options:RequestInit = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
      mode: 'cors'
    };
  
    fetch("https://trade-client-connectivity.herokuapp.com/submitOrder", options)
    .then(response => response.text())
    .then(result => console.log(result))
    .catch(error => console.log('error', error));
    
    this.onFetchOrder();

    }

  }
  

  // fetch order detaissls heres
  onFetchOrder(){

    this.apiservice.getClientOrders()
    .subscribe(data=>
      this.allOrders=data
    );
    
     }

    //  order id generator
     makeOrderId() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
    
      for (var i = 0; i < 6; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    
      return text;
    }
  
}
