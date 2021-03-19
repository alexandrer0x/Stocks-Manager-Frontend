import { environment } from './../../../environments/environment';
import { DayTradeTransaction } from './dayTradeTransaction.model';
import { NormalTransaction } from './normalTransaction.model';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TransactionService {

  private normalBaseUrl : string = environment.apiUrl + 'normalTransaction'
  private dayTradeBaseUrl: string = environment.apiUrl + 'dayTradeTransaction'

  constructor(private http: HttpClient) { }

  createNT(normalTransaction : NormalTransaction) : Observable<NormalTransaction> {
    return this.http.post<NormalTransaction>(this.normalBaseUrl, normalTransaction)
  }

  createDTT(dayTradeTransaction : DayTradeTransaction) : Observable<DayTradeTransaction> {
    return this.http.post<DayTradeTransaction>(this.dayTradeBaseUrl, dayTradeTransaction)
  }

  readNT() : Observable<NormalTransaction[]> {
    return this.http.get<NormalTransaction[]>(this.normalBaseUrl)
  }

  readDTT() : Observable<DayTradeTransaction[]> {
    return this.http.get<DayTradeTransaction[]>(this.dayTradeBaseUrl)
  }

  readNTById(id : number) : Observable<NormalTransaction> {
    const url = `${this.normalBaseUrl}/${id}`
    return this.http.get<NormalTransaction>(url)

  }

  readDTTById(id : number) : Observable<DayTradeTransaction> {
    const url = `${this.dayTradeBaseUrl}/${id}`
    return this.http.get<DayTradeTransaction>(url)

  }

  updateNT(normalTransaction : NormalTransaction)  : Observable<NormalTransaction> {
    const url = `${this.normalBaseUrl}/${normalTransaction.id}`
    return this.http.put<NormalTransaction>(url, normalTransaction)
  }

  updateDTT(dayTradeTransaction : DayTradeTransaction)  : Observable<NormalTransaction> {
    const url = `${this.dayTradeBaseUrl}/${dayTradeTransaction.id}`
    return this.http.put<NormalTransaction>(url, dayTradeTransaction)
  }

  deleteNT(id : number)  : Observable<NormalTransaction> {
    const url = `${this.normalBaseUrl}/${id}`
    return this.http.delete<NormalTransaction>(url)
  }

  deleteDTT(id : number)  : Observable<DayTradeTransaction> {
    const url = `${this.dayTradeBaseUrl}/${id}`
    return this.http.delete<DayTradeTransaction>(url)
  }
}
