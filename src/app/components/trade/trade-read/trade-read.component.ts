import { TradeUpdateComponent } from '../trade-update/trade-update.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DayTrade } from '../dayTrade.model';
import { TradeService } from '../trade.service';
import { PositionTrade } from '../positionTrade.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TradeDeleteComponent } from '../trade-delete/trade-delete.component';
import { AuthService } from 'src/app/auth/auth.service';
import { User } from '../../user/user.model';
import { TRADE_TYPE_KEYS } from '../../../config/string_keys.config'

@Component({
  selector: 'app-trade-read',
  templateUrl: './trade-read.component.html',
  styleUrls: ['./trade-read.component.css']
})
export class TradeReadComponent implements OnInit {
  positionTradeDataSource : MatTableDataSource<PositionTrade>
  @ViewChild('positionTradePaginator', {read: MatPaginator}) positionTradePaginator: MatPaginator

  dayTradeDataSource : MatTableDataSource<DayTrade>
  @ViewChild('dayTradePaginator', {read: MatPaginator}) dayTradePaginator: MatPaginator


  positionTradeColumnsToDisplay = ['date', 'type', 'stock', 'amount', 'price', 'tradeFee', 'totalValue', 'result', 'action']
  dayTradeColumnsToDisplay = ['date', 'stock', 'amount', 'buyPrice', 'sellPrice', 'tradeFee', 'netValue', 'action']

  constructor(private tradeService : TradeService,
      private authService : AuthService,
      private editDialog : MatDialog,
      private deleteDialog : MatDialog) {
  }

  ngOnInit(): void {
    this.loadPT()
    //this.loadDT()
  }

  loadPT() : void {
    let user : User = this.authService.getUser()
    
    this.tradeService.readPT(user).subscribe((positionTrades : PositionTrade[]) => {
      this.positionTradeDataSource = new MatTableDataSource<PositionTrade>(positionTrades)
      this.positionTradeDataSource.paginator = this.positionTradePaginator
    })
  }

  loadDT() : void {
    this.tradeService.readDT().subscribe((dayTrades : DayTrade[]) => {
      this.dayTradeDataSource = new MatTableDataSource<DayTrade>(dayTrades)
      this.dayTradeDataSource.paginator = this.dayTradePaginator
    })
  }

  totalValue (t : PositionTrade) : number {
    return (t.type == TRADE_TYPE_KEYS.compra ? -1 : +1) * (t.amount * t.price + (t.type == TRADE_TYPE_KEYS.compra ? t.tradeFee : -t.tradeFee))
  }

  netValue (t : DayTrade) : number {
    return  t.amount * (t.sellPrice - t.buyPrice) - t.tradeFee
  }



  openEditDT(t : DayTrade) : void{
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

  openDeleteDT(t : DayTrade) : void{
    const dialogRef = this.deleteDialog.open(
      TradeDeleteComponent, {
        width: '250px',
        data: t
      }
    )

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result.id)
        this.deleteDT(result)
        console.log(result)
        console.log('dialog fechada')
      }
    )
  }

  openDeletePT(t : PositionTrade) : void{
    const dialogRef = this.deleteDialog.open(
      TradeDeleteComponent, {
        width: '250px',
        data: t
      }
    )

    dialogRef.afterClosed().subscribe(
      result => {
        console.log(result.id)
        this.deletePT(result)
        console.log(result)
        console.log('dialog fechada')
      }
    )
  }

  deleteDT(result){
    this.tradeService.deleteDT(result.id).subscribe(()=>{
      this.loadDT()
    })
  }

  deletePT(result){
    this.tradeService.deletePT(result.id).subscribe(() => {
      this.loadPT()
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
