import { Stock } from '../components/stock/stock.model';
import { environment } from '../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { Observable } from 'rxjs';
import { StorageService } from 'src/app/_services/storage.service';
import { PARAM_KEYS, STORAGE_KEYS } from 'src/app/config/string_keys.config';
import { User } from '../components/user/user.model';
import { AuthService } from 'src/app/auth/auth.service';


@Injectable({
    providedIn: 'root'
})
export class FavoriteService {
    private baseUrl : string = environment.apiUrl + 'users/favorites'

    constructor(private http : HttpClient, private authService : AuthService) { }

    getFavoriteStocks() : Observable<Stock[]> {
        let user : User = this.authService.getUser();

        if(user) {
            let params : HttpParams  = new HttpParams().set(PARAM_KEYS.user, user.email)
            return this.http.get<Stock[]>(this.baseUrl, {params})
        } else {
            this.authService.logOut()
        }
    }

    addFavoriteStock(stock : Stock) : Observable<any> {
        let user : User = this.authService.getUser();

        if(user) {
            let params : HttpParams  = new HttpParams().set(PARAM_KEYS.user, user.email).append(PARAM_KEYS.stock, stock.ticker)
            return this.http.post(this.baseUrl, undefined, {params})
        } else {
            this.authService.logOut()
        }
    }

    deleteFavoriteStock(stock : Stock) : Observable<any> {
        let user : User = this.authService.getUser();

        if(user) {
            let params : HttpParams  = new HttpParams().set(PARAM_KEYS.user, user.email).append(PARAM_KEYS.stock, stock.ticker)
            return this.http.delete(this.baseUrl, {params})
        } else {
            this.authService.logOut()
        }
    }
}