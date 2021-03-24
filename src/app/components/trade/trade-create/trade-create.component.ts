import { StockService } from '../../stock/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { TradeService } from '../trade.service';
import { DayTrade } from '../dayTrade.model';
import { PositionTrade } from '../positionTrade.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-trade-create',
  templateUrl: './trade-create.component.html',
  styleUrls: ['./trade-create.component.css']
})
export class TradeCreateComponent implements OnInit {
  
  type = {
    id: null,
    value: null,
    viewValue: null
  };

  types = [
    {id: 'D', value: "Daytrade", viewValue: "Day-Trade"},
    {id: "C", value: "Buy", viewValue: "Compra"},
    {id: 'V', value: "Sell", viewValue: "Venda"}
  ]

  stock = {
    id: null
  }

  stocks = [ ]


  dayTrade : DayTrade = {
    stockSymbol: null,
    date: null,
    amount: null,
    buyPrice: null,
    sellPrice: null,
    brokerageFee: null
  }

  positionTrade : PositionTrade = {
    type: null,
    stock: null,
    date: null,
    amount: null,
    price: null,
    brokerageFee: null
  }

  constructor(private tradeService: TradeService,
      private stockService: StockService,
      private router: Router, private snackBar: MatSnackBar,
      private toastr : ToastrService) { }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    })
  }

  createTrade() : void {
    if(this.type.id == 'D'){
      this.tradeService.createDT(this.dayTrade).subscribe(()=>{
        this.toastr.success('Transação criada!')
        this.router.navigate(['/trade'])
      })
    }
    else if (this.type.id == 'C' || this.type.id == 'V'){
      this.positionTrade.type = this.type.id
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
