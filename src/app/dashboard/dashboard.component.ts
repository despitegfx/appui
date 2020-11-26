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
  clientdetail: ClientDetail;
  whenclicked:boolean;
  allOrders:[];
  counter:number=1;

  
  getid=this.apiservice.getUserId();

  orderId: string="dfsdhk5";
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
    if(this.ticker=="" || this.price==null || this.quantity==null || this.side=="") {
      // TODO: remove this.error = true;
  
    } else {
      
    var myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");
  
     var raw = JSON.stringify({
      "orderId":this.orderId,
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
    
    }

  }
  

  // fetch order detaissls heres
  onFetchOrder(){

    this.apiservice.getClientOrders()
    .subscribe(data=>
      this.allOrders=data
    );
      
     }

     
  
}
