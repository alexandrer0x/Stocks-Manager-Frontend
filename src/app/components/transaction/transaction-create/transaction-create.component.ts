import { StockService } from './../../stock/stock.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';


import { TransactionService } from './../transaction.service';
import { DayTradeTransaction } from '../dayTradeTransaction.model';
import { NormalTransaction } from '../normalTransaction.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-transaction-create',
  templateUrl: './transaction-create.component.html',
  styleUrls: ['./transaction-create.component.css']
})
export class TransactionCreateComponent implements OnInit {
  
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


  dayTradeTransaction : DayTradeTransaction = {
    stockSymbol: null,
    date: null,
    amount: null,
    buyPrice: null,
    sellPrice: null,
    brokerageFee: null
  }

  normalTransaction : NormalTransaction = {
    type: null,
    stock: null,
    date: null,
    amount: null,
    price: null,
    brokerageFee: null
  }

  constructor(private transactionService: TransactionService,
      private stockService: StockService,
      private router: Router, private snackBar: MatSnackBar,
      private toastr : ToastrService) { }

  ngOnInit(): void {
    this.stockService.getStocks().subscribe(stocks => {
      this.stocks = stocks;
    })
  }

  createTransaction() : void {
    if(this.type.id == 'D'){
      this.transactionService.createDTT(this.dayTradeTransaction).subscribe(()=>{
        this.toastr.success('Transação criada!')
        this.router.navigate(['/transaction'])
      })
    }
    else if (this.type.id == 'C' || this.type.id == 'V'){
      this.normalTransaction.type = this.type.id
      this.transactionService.createNT(this.normalTransaction).subscribe(()=>{
        this.toastr.success('Transação criada!')
        this.router.navigate(['/transaction'])
      })
    }
  }

  cancel() : void {
    this.router.navigate(['/transaction'])
  }
}
