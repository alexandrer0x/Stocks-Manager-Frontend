import { QuoteService } from './quote.service';

import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Stock } from '../../stock/stock.model';
import { MatPaginator } from '@angular/material/paginator';
import { StockService } from '../../stock/stock.service';
import { MatDialog } from '@angular/material/dialog';
import { QuotationCreateComponent } from '../quotation-create/quotation-create.component';

@Component({
  selector: 'app-quotation-read',
  templateUrl: './quotation-read.component.html',
  styleUrls: ['./quotation-read.component.css']
})
export class QuotationReadComponent implements OnInit {
  dataSource : MatTableDataSource<Stock>
  @ViewChild('paginator', {read: MatPaginator}) paginator: MatPaginator

  constructor(
    private stockService : StockService, 
    private quoteService : QuoteService,
    private dialog : MatDialog) { }

  teste : any 
  stocks : Stock[]
  columnsToDisplay = ['icon', 'ticker', 'quote', 'changePercent', 'previousClosePrice', 'lastTime', 'lastDate', 'buttons']

  ngOnInit(): void {
    this.stocks = []
    this.loadFavoriteStocks()
  }

  loadFavoriteStocks(){
    this.quoteService.getFavoriteStocks().subscribe((stocks : Stock[]) => {
      this.teste = stocks
      this.dataSource = new MatTableDataSource(stocks)
      this.dataSource.paginator = this.paginator
      this.getQuote(stocks);
    })
  }

  getQuote(stocks : Stock[]){
    for(let s of stocks){
      this.stockService.getQuote(s.ticker).subscribe((stock : Stock) => {
        let aux : Stock = this.dataSource.data.find(x => x.ticker == stock.ticker)
        
        aux.changePercent = stock.changePercent
        aux.lastUpdated = stock.lastUpdated
        aux.previousClosePrice = stock.previousClosePrice
        aux.price = stock.price
      })
    }
  }

  setMyClasses(stock : Stock): string{
    if(stock.changePercent < 0)
      return 'negative'
    else if(stock.changePercent == 0)
      return 'neutral'
    else
      return 'positive'
  }

  getStatusIcon(stock : Stock) : string {
    if(stock.changePercent < 0)
      return 'fas fa-caret-down fa-2x negative'
    else if(stock.changePercent == 0)
      return 'fas fa-equals neutral'
    else
      return 'fas fa-caret-up fa-2x positive'
  }

  deleteFavoriteStock(stock : Stock) : void{
    this.quoteService.deleteFavoriteStock(stock.ticker).subscribe(
      () => {
        this.loadFavoriteStocks()
      },
      error => {})
  }

  openAddFavoriteDialog() : void{
    const diaglogRef = this.dialog.open(
      QuotationCreateComponent, {
        width: '250px'
      }
    )

    diaglogRef.afterClosed().subscribe(
      stock => {
        this.quoteService.addFavoriteStock(stock).subscribe(()=> {
          this.loadFavoriteStocks()
        })
      }
    ) 
  }
}