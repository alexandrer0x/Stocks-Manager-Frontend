import { Broker } from './broker.model';
import { Stock } from './../stock/stock.model';
export interface UserStock {
    position: number,
    avgPrice: number,
    positionCost: number,
    positonValue: number,
    stock : Stock,
    broker : Broker
}