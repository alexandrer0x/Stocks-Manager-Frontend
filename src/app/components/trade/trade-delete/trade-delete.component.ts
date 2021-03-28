import { PositionTrade } from '../positionTrade.model';
import { DayTrade } from '../dayTrade.model';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Component, OnInit, Inject } from '@angular/core';
import { TradeUpdateComponent } from '../trade-update/trade-update.component';
import { TRADE_TYPE_KEYS } from 'src/app/config/string_keys.config';

@Component({
  selector: 'app-trade-delete',
  templateUrl: './trade-delete.component.html',
  styleUrls: ['./trade-delete.component.css']
})
export class TradeDeleteComponent implements OnInit {

  public TRADE_TYPE_KEYS = TRADE_TYPE_KEYS;
  
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
