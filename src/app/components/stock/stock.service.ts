import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl : string = environment.baseUrl + 'stocks'

  constructor(private http : HttpClient) { }

  getStocks() : Observable<Stock[]> {
    return this.http.get<Stock[]>(this.baseUrl);
  }

  getStock(stockId : string) : Observable<Stock> {
    return this.http.get<Stock>(this.baseUrl + `/${stockId}`);
  }

  getQuote(stockTicker : string) : Observable<Stock> {
    let params : HttpParams = new HttpParams().set('ticker', stockTicker)
    return this.http.get<Stock>(this.baseUrl + `/quote`, {params});
  }
}
