import { DayTradeTransaction } from './../dayTradeTransaction.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-transaction-update',
  templateUrl: './transaction-update.component.html',
  styleUrls: ['./transaction-update.component.css']
})
export class TransactionUpdateComponent implements OnInit {
  stock = {
    symbol: null
  }

  stocks = [
    {symbol: "PETR4"},
    {symbol: "PETR3"},
    {symbol: "BBAS3"}
  ]
  constructor(
    private dialogRef : MatDialogRef<TransactionUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public dayTradeTransaction: DayTradeTransaction) { }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
