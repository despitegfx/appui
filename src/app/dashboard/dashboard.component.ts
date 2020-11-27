import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';
import { ClientDetail, ClientOrders } from '../services/endpoint';
import { DatePipe} from '@angular/common';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  
  orderBringform: boolean;
  BringOrdersTable: boolean;
  BringPortfolio: boolean=true;
  chooseMessage:boolean;
  successMessage:string;
  emptyInput:boolean=false;


  clientdetail:[];
  createPortfolio:boolean;
  allOrders:[];
  counter:number;
  allMarketData:[];
  
  getid=this.apiservice.getUserId();

  orderId: string= "";
  userId: string=this.getid;
  ticker:string="";
  status: string="Unvalidated";
  dateCreated:number= Date.now();
  dateModified:number = Date.now();
  price:number;
  quantity:number;
  side: string="";

  constructor(private apiservice: ApiService, private router: Router ) {}

  ngOnInit(): void {
    this.checklogin();
    this.successfullyLogin();
    this.onFetchOrder();
    this.onFetchOrder();
    this.marketData();
  }

  bringPortfolio(){
    this.BringOrdersTable=false;
    this.orderBringform=false;
    this.createPortfolio=false;
  }

  //when order button is clicked
  onOrder(){
    this.orderBringform=true;
    this.BringPortfolio=false
    this.BringOrdersTable=false;
    this.createPortfolio=false;
    this.marketData();
  }

  brindOrdersTable(){
    this.BringOrdersTable=true;
    this.orderBringform=false;
    this.BringPortfolio=false
  }

  addPortfolio(){
    this.createPortfolio=true;
    this.BringOrdersTable=false;
    this.orderBringform=false;
    this.BringPortfolio=false
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
      this.emptyInput=true;

    } else {
    this.emptyInput=false;
    this.successMessage="submitting order...";
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
  let holdresultStatus;
  let holdresultId;
    fetch("https://trade-client-connectivity.herokuapp.com/submitOrder", options)
    .then(response => response.text())
    .then(result => {
        holdresultStatus = JSON.parse(result).status;
        holdresultId = JSON.parse(result).orderId;
        console.log(result);

        if (holdresultStatus=="created") {
          this.onFetchOrder();
          this.chooseMessage=true;
          this.successMessage="Order Successful";
    
        } else {
          this.chooseMessage=false;
          this.successMessage="Order Failed";
        }
    })
    .catch(error => console.log('error', error));
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

    marketData(){
      this.apiservice.getMarketData()
      .subscribe(data => this.allMarketData=data);
      
    }
  
}
