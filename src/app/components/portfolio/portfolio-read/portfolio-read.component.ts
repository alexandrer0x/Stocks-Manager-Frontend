import { PositionService } from '../../../_services/position.service';
import { Position } from '../position.model';
import { Component, OnInit, ViewChild, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Stock } from '../../stock/stock.model';
import { MatPaginator } from '@angular/material/paginator';
import { StockService } from '../../stock/stock.service';
import { Broker } from '../broker.model';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-portfolio-read',
  templateUrl: './portfolio-read.component.html',
  styleUrls: ['./portfolio-read.component.css']
})
export class PortfolioReadComponent implements OnInit {
  dataSource : MatTableDataSource<Position>
  @ViewChild('paginator', {read: MatPaginator}) paginator: MatPaginator

  @Input() broker : Broker

  columnsToDisplay = ['stockId', 'position', 'avgPrice', 'price', 'positionCost', 'positonValue', 'gainToMake', 'gainPercent', 'buttons']

  totalPositionCost = 0
  totalPositionValue = 0


  constructor(
    private stockService : StockService, 
    private positionService : PositionService,
    private authService : AuthService
  ) { }

  ngOnInit(): void {
    if(this.broker && this.broker.id){
      this.positionService.getPortfolioByBroker(this.authService.getUser(), this.broker.id).subscribe(
        (positions : Position[]) =>{
          positions.forEach(element => {
            element.positionCost = element.amount * element.averageCost
          });


          this.dataSource = new MatTableDataSource(positions)
          this.dataSource.paginator = this.paginator
          this.getQuote(positions);
        })
    }else {
      this.positionService.getPortfolio(this.authService.getUser()).subscribe(
        (positions : Position[]) =>{

          positions.forEach(element => {
              element.positionCost = element.amount * element.averageCost
          });


          this.dataSource = new MatTableDataSource(positions)
          this.dataSource.paginator = this.paginator
          this.getQuote(positions);
        })
      
    }
  }

  getQuote(userStocks : Position[]) : void {
    for(let us of userStocks){
      this.stockService.getQuote(us.stock.ticker).subscribe((stock : Stock) => {
        let aux : Position = this.dataSource.data.find(x => x.stock.ticker == stock.ticker)
        
        aux.stock.changePercent = stock.changePercent
        aux.stock.lastUpdated = stock.lastUpdated
        aux.stock.previousClosePrice = stock.previousClosePrice
        aux.stock.price = stock.price
        us.positonValue = us.amount * us.stock.price
        this.totalPositionCost += us.positionCost
        this.totalPositionValue += us.positonValue
      })
    }
  }

  deleteUserStock(userStock: Position) {
    this.positionService.deleteUserStock(this.authService.getUser(), userStock.broker.id, userStock.stock.ticker).subscribe(
      () => {
        this.dataSource.data = this.dataSource.data.filter(obj => obj !== userStock)
        this.totalPositionCost -= userStock.positionCost
        this.totalPositionValue -= userStock.positonValue
      }
    )
  }

  setMyClasses(userStock : Position): string{
    if(userStock.positionCost > userStock.positonValue)
      return 'negative'
    else if(userStock.positionCost == userStock.positonValue)
      return 'neutral'
    else
      return 'positive'
  }

  getBrokerName() : string{
    if(this.broker) {
      return 'Carteira ' + this.broker.name
    }else {
      return 'Carteira consolidada'
    }
  }
  
  getTotalGain() : number {
    return this.totalPositionValue - this.totalPositionCost
  }

  setTotalClasses(): string{
    const gain = this.getTotalGain()
    if(gain < 0) 
      return 'negative'
    else if(gain == 0)
      return 'neutral'
    else
      return 'positive'
  }

}


