import { UserStock } from './../components/portfolio/userStock.model';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class PortfolioService {
    private baseUrl = environment.baseUrl + 'portfolio'

    constructor(private http : HttpClient) {}

    getPortfolio() : Observable<UserStock[]> {
        return this.http.get<UserStock[]>(this.baseUrl)
    }

    getPortfolioByBroker(brokerId : number) : Observable<UserStock[]> {
        return this.http.get<UserStock[]>(`${this.baseUrl}/${brokerId}`)
    }

    deleteUserStock(brokerId: number, stockId: string) : Observable<UserStock> {
        return this.http.delete<UserStock>(`${this.baseUrl}/${brokerId}/${stockId}`)
    }
}