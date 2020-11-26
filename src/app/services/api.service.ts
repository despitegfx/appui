import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})

export class ApiService {

    url_: string = "https://trade-client-connectivity.herokuapp.com";

    constructor(private http: HttpClient, private cookieservice: CookieService) {}

    getClientDetail(): Observable<any>{
        return this.http.get(this.url_+'/client/get/'+this.getUserId());
    }

    idname:string;
    setUserId(id: string){
        this.cookieservice.set(this.idname, id);
    }
    getUserId(){
        return this.cookieservice.get(this.idname);
    }

    logOut(){
        this.cookieservice.deleteAll('/');
    }
}