import { TransactionUpdateComponent } from './../transaction-update/transaction-update.component';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { DayTradeTransaction } from './../dayTradeTransaction.model';
import { TransactionService } from './../transaction.service';
import { NormalTransaction } from './../normalTransaction.model';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { TransactionDeleteComponent } from '../transaction-delete/transaction-delete.component';

@Component({
  selector: 'app-transaction-read',
  templateUrl: './transaction-read.component.html',
  styleUrls: ['./transaction-read.component.css']
})
export class TransactionReadComponent implements OnInit {
  normalDataSource : MatTableDataSource<NormalTransaction>
  @ViewChild('normalPaginator', {read: MatPaginator}) normalPaginator: MatPaginator

  dayTradeDataSource : MatTableDataSource<DayTradeTransaction>
  @ViewChild('dayTradePaginator', {read: MatPaginator}) dayTradePaginator: MatPaginator


  normalColumnsToDisplay = ['date', 'type', 'stock', 'amount', 'price', 'brokerageFee', 'totalValue', 'result', 'action']
  dayTradeColumnsToDisplay = ['date', 'stock', 'amount', 'buyPrice', 'sellPrice', 'brokerageFee', 'netValue', 'action']

  constructor(private transactionService : TransactionService,
      private editDialog : MatDialog,
      private deleteDialog : MatDialog) {
  }

  ngOnInit(): void {
    this.loadNT()
    this.loadDTT()
  }

  loadNT() : void {
    this.transactionService.readNT().subscribe((normalTransactions : NormalTransaction[]) => {
      this.normalDataSource = new MatTableDataSource<NormalTransaction>(normalTransactions)
      this.normalDataSource.paginator = this.normalPaginator
    })
  }

  loadDTT() : void {
    this.transactionService.readDTT().subscribe((dayTradeTransactions : DayTradeTransaction[]) => {
      this.dayTradeDataSource = new MatTableDataSource<DayTradeTransaction>(dayTradeTransactions)
      this.dayTradeDataSource.paginator = this.dayTradePaginator
    })
  }

  totalValue (t : NormalTransaction) : number {
    return (t.type == 'C' ? -1 : +1) *(t.amount * t.price + (t.type == 'C' ? t.brokerageFee : -t.brokerageFee))
  }

  netValue (t : DayTradeTransaction) : number {
    return  t.amount * (t.sellPrice - t.buyPrice) - t.brokerageFee
  }



  openEditDTT(t : DayTradeTransaction) : void{
    const dialogRef = this.editDialog.open(
      TransactionUpdateComponent, {
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

  openDeleteDTT(t : DayTradeTransaction) : void{
    const dialogRef = this.deleteDialog.open(
      TransactionDeleteComponent, {
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

  openDeleteNT(t : NormalTransaction) : void{
    const dialogRef = this.deleteDialog.open(
      TransactionDeleteComponent, {
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
    this.transactionService.deleteDTT(result.id).subscribe(()=>{
      this.loadDTT()
    })
  }

  deleteNT(result){
    this.transactionService.deleteNT(result.id).subscribe(() => {
      this.loadNT()
    })
  }

  setMyClasses(nt : NormalTransaction): string{
    if(nt.result < 0)
      return 'negative'
    else if(nt.result == 0)
      return 'neutral'
    else
      return 'positive'
  }
}
