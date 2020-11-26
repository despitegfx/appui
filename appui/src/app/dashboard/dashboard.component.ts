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
  clientdetail: ClientDetail;
  whenclicked:boolean;
  allOrders:string;
  
  getid=this.apiservice.getUserId();

  orderId: string="dfsdh8934hb349348";
  userId: string=this.getid;
  unitPrice:number;
  tickerSymbol:string="";
  statusId: number;
  quantity:number;
  transactionId: number;
  dateCreated: string = new Date().toString();
  dateModified: string = new Date().toString();
  orderTypeId: number;
  
  
  //side: string="";
  constructor(private apiservice: ApiService, private router: Router) {}


  ngOnInit(): void {
    this.checklogin();
    this.successfullyLogin();
    this.onFetchOrder();
  }

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

  //order here
  onOrder(){
    this.orderBringform=true;
  }

  onSubmitOrder(){
    if(this.tickerSymbol=="" || this.unitPrice==null || this.quantity==null ){//|| this.side=="") {
      // TODO: remove this.error = true;
  
    } else {
      
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

     var raw = JSON.stringify({
      "orderId":this.orderId,
      "userId":this.userId,
      "unitPrice":this.unitPrice,
      "tickerSymbol":this.tickerSymbol,
      "statusId":this.statusId,
      "quantity":this.quantity,
      "transactionId":this.transactionId,
      "dateCreated":this.dateCreated,
      "dateModified":this.dateModified,
      "orderTypeId":this.orderTypeId
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
    
    }
  }
  

  // fetch order details here
  onFetchOrder(){

    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    var requestOptions:RequestInit = {
      method: 'GET',
      headers: myHeaders,
      redirect: 'follow',
      mode: 'no-cors'
    };

    fetch("https://trade-reporting-service.herokuapp.com/orders/all", requestOptions)
    .then(response => response.text())
    .then(result => {
      console.log(JSON.stringify(result));
    })
    .catch(error => console.log('error', error));
      
    
    }
  
}
