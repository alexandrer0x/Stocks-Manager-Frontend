import { environment } from './../../../environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Stock } from './stock.model';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  private baseUrl : string = environment.baseUrl + 'stock'

  constructor(private http : HttpClient) { }

  getStocks() : Observable<Stock[]> {
    return this.http.get<Stock[]>(this.baseUrl);
  }

  getStock(stockId : string) : Observable<Stock> {
    return this.http.get<Stock>(this.baseUrl + `/${stockId}`);
  }

  getQuote(stockId : string) : Observable<Stock> {
    return this.http.get<Stock>(this.baseUrl + `/quote/${stockId}`);
  }
}
