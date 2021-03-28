import { StockService } from '../../stock/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { TradeService } from '../trade.service';
import { DayTrade } from '../dayTrade.model';
import { PositionTrade } from '../positionTrade.model';
import { ToastrService } from 'ngx-toastr';
import { TRADE_TYPE_KEYS } from 'src/app/config/string_keys.config';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../user/user.model';
import { Broker } from '../../portfolio/broker.model';
import { BrokerService } from 'src/app/_services/broker.service';

@Component({
  selector: 'app-trade-create',
  templateUrl: './trade-create.component.html',
  styleUrls: ['./trade-create.component.css']
})
export class TradeCreateComponent implements OnInit {

  public TRADE_TYPE_KEYS = TRADE_TYPE_KEYS
  
  type = {
    id: null,
    value: null,
    viewValue: null
  };

  types = [
    //{id: 'D', value: "Daytrade", viewValue: "Day-Trade"},
    {id: TRADE_TYPE_KEYS.compra, value: "Buy", viewValue: "Compra"},
    {id: TRADE_TYPE_KEYS.venda, value: "Sell", viewValue: "Venda"}
  ]

  stock = {
    id: null
  }

  brokers : Broker[] = []

  stocks = [ ]


  dayTrade : DayTrade = {
    stockSymbol: null,
    date: null,
    amount: null,
    buyPrice: null,
    sellPrice: null,
    tradeFee: null
  }

  positionTrade : PositionTrade = {
    user: this.authService.getUser(),
    type: null,
    stock: null,
    broker: null,
    date: null,
    amount: null,
    price: null,
    tradeFee: null
  }

  constructor(private tradeService: TradeService,
      private authService : AuthService,
      private stockService: StockService,
      private brokerService : BrokerService,
      private router: Router, private snackBar: MatSnackBar,
      private toastr : ToastrService) { }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    })
    
    this.brokerService.getBrokers().subscribe(brokers => {
      this.brokers = brokers
    })
  }

  createTrade() : void {
    if(this.type.id == 'D'){
      this.tradeService.createDT(this.dayTrade).subscribe(()=>{
        this.toastr.success('Transação criada!')
        this.router.navigate(['/trade'])
      })
    }
    else if (this.type.id == TRADE_TYPE_KEYS.compra || this.type.id == TRADE_TYPE_KEYS.venda){
      this.positionTrade.type = this.type.id
      this.positionTrade.user = this.authService.getUser()
      this.tradeService.createPT(this.positionTrade).subscribe(()=>{
        this.toastr.success('Transação criada!')
        this.router.navigate(['/trade'])
      })
    }
  }

  cancel() : void {
    this.router.navigate(['/trade'])
  }
}
