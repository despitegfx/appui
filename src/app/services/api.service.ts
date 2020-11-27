import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

    url_: string = "https://trade-client-connectivity.herokuapp.com";
    url_orders: string = "https://trade-reporting-service.herokuapp.com";
    url_market: string= "https://exchange2.matraining.com/md";
    idname:string;

    constructor(private http: HttpClient, private cookieservice: CookieService) {}

    getClientDetail(): Observable<any>{
        return this.http.get(this.url_+'/client/get/'+this.getUserId());
    }

    getClientOrders(): Observable<any>{
        return this.http.get(this.url_orders+'/get/order/'+this.getUserId());
    }

    getMarketData(): Observable<any>{
        return this.http.get(this.url_market);
    }

    setUserId(id: string){
        this.cookieservice.set(this.idname, id);
    }
    getUserId(){
        return this.cookieservice.get(this.idname);
    }

    logOut(){
        this.cookieservice.delete(this.idname);
    }
}


