import { StockService } from './../../stock/stock.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, inject } from '@angular/core';
import { Stock } from '../../stock/stock.model';

@Component({
  selector: 'app-quotation-create',
  templateUrl: './quotation-create.component.html',
  styleUrls: ['./quotation-create.component.css']
})
export class QuotationCreateComponent implements OnInit {
  stocks : Stock[]

  stock : Stock

  constructor(
    private dialogRef : MatDialogRef<QuotationCreateComponent>,
    private stockService : StockService
    ) { }

  ngOnInit(): void {
    this.loadStocks()
  }

  loadStocks(): void {
    this.stockService.getStocks().subscribe(
      (s : Stock[]) => {
        this.stocks = s
      }
    )
  }

  onNoClick() : void {
    this.dialogRef.close()
  }
}
