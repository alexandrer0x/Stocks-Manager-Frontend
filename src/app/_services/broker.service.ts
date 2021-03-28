import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Broker } from '../components/portfolio/broker.model';

@Injectable({
  providedIn: 'root'
})
export class BrokerService {
  private baseUrl = environment.apiUrl + 'brokers'

  constructor(private http : HttpClient) {}

  getBrokers() : Observable<Broker[]> {
    return this.http.get<Broker[]>(this.baseUrl)
}
}
