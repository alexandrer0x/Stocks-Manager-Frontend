import { DayTrade } from '../dayTrade.model';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';

@Component({
  selector: 'app-trade-update',
  templateUrl: './trade-update.component.html',
  styleUrls: ['./trade-update.component.css']
})
export class TradeUpdateComponent implements OnInit {
  stock = {
    symbol: null
  }

  stocks = [
    {symbol: "PETR4"},
    {symbol: "PETR3"},
    {symbol: "BBAS3"}
  ]
  constructor(
    private dialogRef : MatDialogRef<TradeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public dayTrade: DayTrade) { }

  ngOnInit(): void {
    
  }

  onNoClick(): void {
    this.dialogRef.close()
  }

}
