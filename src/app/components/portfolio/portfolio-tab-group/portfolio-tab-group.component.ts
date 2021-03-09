import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Broker } from '../broker.model';


@Component({
  selector: 'app-portfolio-tab-group',
  templateUrl: './portfolio-tab-group.component.html',
  styleUrls: ['./portfolio-tab-group.component.css']
})
export class PortfolioTabGroupComponent implements OnInit {
  brokers : Broker[]
  isLoaded : boolean = false
  baseUrl : string = environment.baseUrl

  constructor(private HttpClient : HttpClient) { }

  ngOnInit(): void {
    this.getBrokers()
  }

  getBrokers() {
    this.HttpClient.get(`${this.baseUrl}portfolio/brokers`).subscribe((brokers : Broker[]) => {
      this.brokers = brokers
      
      if(this.brokers && brokers.length > 0){
        this.loadPortfolio(this.brokers[0].id)
      }

      this.isLoaded = true
    })
  }

  loadPortfolio(brokerId : number) {

  }

  /* getContent(index : number) {
    if(!this.tabs[index].requested) {
      this.HttpClient.get(`http://stockexchange.ddns.net:5000/api/stock/${this.tabs[index].label}`).subscribe(
        result => {
          this.tabs[index].content = result
        },
        error => {
          this.tabs[index].content = error
        })
    }
    this.tabs[index].requested = true
  } */

}
