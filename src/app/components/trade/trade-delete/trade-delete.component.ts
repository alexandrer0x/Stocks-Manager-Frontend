import { PositionTrade } from '../positionTrade.model';
import { DayTrade } from '../dayTrade.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { TradeUpdateComponent } from '../trade-update/trade-update.component';

@Component({
  selector: 'app-trade-delete',
  templateUrl: './trade-delete.component.html',
  styleUrls: ['./trade-delete.component.css']
})
export class TradeDeleteComponent implements OnInit {
  
  
  constructor(
    private dialogRef : MatDialogRef<TradeUpdateComponent>,
    @Inject(MAT_DIALOG_DATA) public nt : PositionTrade
  ) { }

  ngOnInit(): void {
  }

  onNoClick(): void {
    this.dialogRef.close()
  }


}
