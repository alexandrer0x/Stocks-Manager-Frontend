import { environment } from 'src/environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable, Observer } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { Broker } from '../broker.model';
import { PositionService } from 'src/app/_services/position.service';
import { AuthService } from 'src/app/auth/auth.service';


@Component({
  selector: 'app-portfolio-tab-group',
  templateUrl: './portfolio-tab-group.component.html',
  styleUrls: ['./portfolio-tab-group.component.css']
})
export class PortfolioTabGroupComponent implements OnInit {
  brokers : Broker[]
  isLoaded : boolean = false
  baseUrl : string = environment.apiUrl

  constructor(private positionService : PositionService, private authService : AuthService) { }

  ngOnInit(): void {
    this.getBrokers()
  }

  getBrokers() {
    this.positionService.getPositionBrokers(this.authService.getUser()).subscribe(
      (brokers : Broker[]) => {
        this.brokers = brokers
        
        if(this.brokers && brokers.length > 0){
          this.loadPortfolio(this.brokers[0].id)
        }

        this.isLoaded = true
      }
    )
  }

  loadPortfolio(brokerId : number) {

  }
}
