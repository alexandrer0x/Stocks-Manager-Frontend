import { Broker } from './broker.model';
import { Stock } from '../stock/stock.model';
export interface Position {
    amount: number,
    averageCost: number,
    positionCost: number,
    positonValue: number,
    stock : Stock,
    broker : Broker
}