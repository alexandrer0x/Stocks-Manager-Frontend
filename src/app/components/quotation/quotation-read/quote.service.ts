import { Stock } from './../../stock/stock.model';
import { environment } from './../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';
import { STORAGE_KEYS } from 'src/app/config/storage_keys.config';
import { User } from '../../user/user.model';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class QuoteService {
    private baseUrl : string = environment.baseUrl + 'users'

    constructor(private http : HttpClient, private authService : AuthService) { }

    getFavoriteStocks() : Observable<Stock[]> {
        let user : User = this.authService.getUser();

        if(user) {
            let params : HttpParams  = new HttpParams().set('email', user.email)
            return this.http.get<Stock[]>(`${this.baseUrl}/favorites`, {params})
        } else {
            this.authService.logOut()
        }
    }

    addFavoriteStock(stock : Stock) : Observable<any> {
        return this.http.post(`${this.baseUrl}/${stock.ticker}`, null)
    }

    deleteFavoriteStock(stockId : string) : Observable<any> {
        return this.http.delete(`${this.baseUrl}/${stockId}`)
    }
}