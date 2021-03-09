import { Stock } from './../../stock/stock.model';
import { environment } from './../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class QuoteService {
    private baseUrl : string = environment.baseUrl + 'favorite'

    constructor(private http : HttpClient) { }

    getFavoriteStocks() : Observable<Stock[]> {
        return this.http.get<Stock[]>(this.baseUrl)
    }

    addFavoriteStock(stock : Stock) : Observable<any> {
        return this.http.post(`${this.baseUrl}/${stock.id}`, null)
    }

    deleteFavoriteStock(stockId : string) : Observable<any> {
        return this.http.delete(`${this.baseUrl}/${stockId}`)
    }
}