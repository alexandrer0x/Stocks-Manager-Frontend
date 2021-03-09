import { NormalTransaction } from './../normalTransaction.model';
import { DayTradeTransaction } from './../dayTradeTransaction.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { TransactionUpdateComponent } from '../transaction-update/transaction-update.component';

@Component({
  selector: 'app-transaction-delete',
  templateUrl: './transaction-delete.component.html',
  styleUrls: ['./transaction-delete.component.css']
})
export class TransactionDeleteComponent implements OnInit {
  
  
  constructor(
    private dialogRef : MatDialogRef<TransactionUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public nt : NormalTransaction
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }


}
