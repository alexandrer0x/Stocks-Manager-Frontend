import { Position } from '../components/portfolio/position.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from "@angular/core";
import { PARAM_KEYS } from '../config/storage_keys.config';
import { User } from '../components/user/user.model';
import { Broker } from '../components/portfolio/broker.model';

@Injectable({
    providedIn: 'root'
})
export class PositionService {
    private baseUrl = environment.apiUrl + 'positions'

    constructor(private http : HttpClient) {}

    getPortfolio(user : User) : Observable<Position[]> {
        let params : HttpParams = new HttpParams().set(PARAM_KEYS.user, user.email)

        return this.http.get<Position[]>(this.baseUrl, {params})
    }

    getPositionBrokers(user : User) : Observable<Broker[]> {
        let params : HttpParams = new HttpParams().set(PARAM_KEYS.user, user.email)

        return this.http.get<Broker[]>(`${this.baseUrl}/brokers`, {params})
    }

    getPortfolioByBroker(user : User, brokerId : number) : Observable<Position[]> {
        let params : HttpParams = new HttpParams().set(PARAM_KEYS.user, user.email).append(PARAM_KEYS.broker, brokerId.toString())
        
        return this.http.get<Position[]>(`${this.baseUrl}`, {params})
    }

    deleteUserStock(user : User, brokerId: number, stockTicker: string) : Observable<Position> {
        let params : HttpParams = new HttpParams().set(PARAM_KEYS.user, user.email)
        .append(PARAM_KEYS.broker, brokerId.toString())
        .append(PARAM_KEYS.stock, stockTicker);
        
        return this.http.delete<Position>(`${this.baseUrl}`, {params})
    }
}