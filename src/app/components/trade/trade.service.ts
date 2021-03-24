import { environment } from '../../../environments/environment';
import { DayTrade } from './dayTrade.model';
import { PositionTrade } from './positionTrade.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '@angular/compiler';


@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private positionTradeBaseUrl : string = environment.apiUrl + 'position-trade'
  private dayTradeBaseUrl: string = environment.apiUrl + 'day-trade'

  constructor(private http: HttpClient) { }

  createNT(positionTrade : PositionTrade) : Observable<PositionTrade> {
    return this.http.post<PositionTrade>(this.positionTradeBaseUrl, positionTrade)
  }

  createDTT(dayTrade : DayTrade) : Observable<DayTrade> {
    return this.http.post<DayTrade>(this.dayTradeBaseUrl, dayTrade)
  }

  readNT() : Observable<PositionTrade[]> {
    return this.http.get<PositionTrade[]>(this.positionTradeBaseUrl)
  }

  readDTT() : Observable<DayTrade[]> {
    return this.http.get<DayTrade[]>(this.dayTradeBaseUrl)
  }

  readNTById(id : number) : Observable<PositionTrade> {
    const url = `${this.positionTradeBaseUrl}/${id}`
    return this.http.get<PositionTrade>(url)

  }

  readDTTById(id : number) : Observable<DayTrade> {
    const url = `${this.dayTradeBaseUrl}/${id}`
    return this.http.get<DayTrade>(url)

  }

  updateNT(positionTrade : PositionTrade)  : Observable<PositionTrade> {
    const url = `${this.positionTradeBaseUrl}/${positionTrade.id}`
    return this.http.put<PositionTrade>(url, positionTrade)
  }

  updateDTT(dayTrade : DayTrade)  : Observable<DayTrade> {
    const url = `${this.dayTradeBaseUrl}/${dayTrade.id}`
    return this.http.put<DayTrade>(url, dayTrade)
  }

  deleteNT(id : number)  : Observable<PositionTrade> {
    const url = `${this.positionTradeBaseUrl}/${id}`
    return this.http.delete<PositionTrade>(url)
  }

  deleteDTT(id : number)  : Observable<DayTrade> {
    const url = `${this.dayTradeBaseUrl}/${id}`
    return this.http.delete<DayTrade>(url)
  }
}
