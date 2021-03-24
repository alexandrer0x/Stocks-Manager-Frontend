import { TradeUpdateComponent } from '../trade-update/trade-update.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DayTrade } from '../dayTrade.model';
import { TradeService } from '../trade.service';
import { PositionTrade } from '../positionTrade.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TradeDeleteComponent } from '../trade-delete/trade-delete.component';

@Component({
  selector: 'app-trade-read',
  templateUrl: './trade-read.component.html',
  styleUrls: ['./trade-read.component.css']
})
export class TradeReadComponent implements OnInit {
  positionTradeDataSource : MatTableDataSource<PositionTrade>
  @ViewChild('normalPaginator', {read: MatPaginator}) positionTradePaginator: MatPaginator

  dayTradeDataSource : MatTableDataSource<DayTrade>
  @ViewChild('dayTradePaginator', {read: MatPaginator}) dayTradePaginator: MatPaginator


  positionTradeColumnsToDisplay = ['date', 'type', 'stock', 'amount', 'price', 'brokerageFee', 'totalValue', 'result', 'action']
  dayTradeColumnsToDisplay = ['date', 'stock', 'amount', 'buyPrice', 'sellPrice', 'brokerageFee', 'netValue', 'action']

  constructor(private tradeService : TradeService,
      private editDialog : MatDialog,
      private deleteDialog : MatDialog) {
  }

  ngOnInit(): void {
    this.loadNT()
    this.loadDTT()
  }

  loadNT() : void {
    this.tradeService.readNT().subscribe((positionTrades : PositionTrade[]) => {
      this.positionTradeDataSource = new MatTableDataSource<PositionTrade>(positionTrades)
      this.positionTradeDataSource.paginator = this.positionTradePaginator
    })
  }

  loadDTT() : void {
    this.tradeService.readDTT().subscribe((dayTrades : DayTrade[]) => {
      this.dayTradeDataSource = new MatTableDataSource<DayTrade>(dayTrades)
      this.dayTradeDataSource.paginator = this.dayTradePaginator
    })
  }

  totalValue (t : PositionTrade) : number {
    return (t.type == 'C' ? -1 : +1) *(t.amount * t.price + (t.type == 'C' ? t.brokerageFee : -t.brokerageFee))
  }

  netValue (t : DayTrade) : number {
    return  t.amount * (t.sellPrice - t.buyPrice) - t.brokerageFee
  }



  openEditDTT(t : DayTrade) : void{
    const dialogRef = this.editDialog.open(
      TradeUpdateComponent, {
        width: '250px',
        data: t
      }
    )

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result)
        console.log('dialog fechada')
      }
    )
  }

  openDeleteDTT(t : DayTrade) : void{
    const dialogRef = this.deleteDialog.open(
      TradeDeleteComponent, {
        width: '250px',
        data: t
      }
    )

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result.id)
        this.deleteDTT(result)
        console.log(result)
        console.log('dialog fechada')
      }
    )
  }

  openDeleteNT(t : PositionTrade) : void{
    const dialogRef = this.deleteDialog.open(
      TradeDeleteComponent, {
        width: '250px',
        data: t
      }
    )

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result.id)
        this.deleteNT(result)
        console.log(result)
        console.log('dialog fechada')
      }
    )
  }

  deleteDTT(result){
    this.tradeService.deleteDTT(result.id).subscribe(()=>{
      this.loadDTT()
    })
  }

  deleteNT(result){
    this.tradeService.deleteNT(result.id).subscribe(() => {
      this.loadNT()
    })
  }

  setMyClasses(nt : PositionTrade): string{
    if(nt.result < 0)
      return 'negative'
    else if(nt.result == 0)
      return 'neutral'
    else
      return 'positive'
  }
}
