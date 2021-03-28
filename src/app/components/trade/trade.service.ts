import { environment } from '../../../environments/environment';
import { DayTrade } from './dayTrade.model';
import { PositionTrade } from './positionTrade.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Position } from '@angular/compiler';
import { User } from '../user/user.model';


@Injectable({
  providedIn: 'root'
})
export class TradeService {

  private positionTradeBaseUrl : string = environment.apiUrl + 'position-trades'
  private dayTradeBaseUrl: string = environment.apiUrl + 'day-trades'

  constructor(private http: HttpClient) { }

  createPT(positionTrade : PositionTrade) : Observable<PositionTrade> {

    return this.http.post<PositionTrade>(this.positionTradeBaseUrl, positionTrade)
  }

  createDT(dayTrade : DayTrade) : Observable<DayTrade> {
    return this.http.post<DayTrade>(this.dayTradeBaseUrl, dayTrade)
  }

  readPT(user: User) : Observable<any> {
    let params : HttpParams = new HttpParams().set('user', user.email)

    return this.http.get<PositionTrade[]>(`${this.positionTradeBaseUrl}/user`, {params})
  }

  readDT() : Observable<DayTrade[]> {
    return this.http.get<DayTrade[]>(this.dayTradeBaseUrl)
  }

  readPTById(id : number) : Observable<PositionTrade> {
    const url = `${this.positionTradeBaseUrl}/${id}`
    return this.http.get<PositionTrade>(url)

  }

  readDTById(id : number) : Observable<DayTrade> {
    const url = `${this.dayTradeBaseUrl}/${id}`
    return this.http.get<DayTrade>(url)

  }

  updatePT(positionTrade : PositionTrade)  : Observable<PositionTrade> {
    const url = `${this.positionTradeBaseUrl}/${positionTrade.id}`
    return this.http.put<PositionTrade>(url, positionTrade)
  }

  updateDT(dayTrade : DayTrade)  : Observable<DayTrade> {
    const url = `${this.dayTradeBaseUrl}/${dayTrade.id}`
    return this.http.put<DayTrade>(url, dayTrade)
  }

  deletePT(id : number)  : Observable<PositionTrade> {
    const url = `${this.positionTradeBaseUrl}/${id}`
    return this.http.delete<PositionTrade>(url)
  }

  deleteDT(id : number)  : Observable<DayTrade> {
    const url = `${this.dayTradeBaseUrl}/${id}`
    return this.http.delete<DayTrade>(url)
  }
}
