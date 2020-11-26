import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { timer } from 'rxjs';
import { ApiService } from "../services/api.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  allMarketData:[];
  when:boolean=true;

  constructor(private router: Router, private apiservice: ApiService) { }

  ngOnInit(): void {
    this.marketData();
    
  }

  goToDashboard(){
    this.router.navigate(['/dashboard']);
  }

  marketData(){
    this.apiservice.getMarketData()
    .subscribe(data => this.allMarketData=data);
    
  }

}
