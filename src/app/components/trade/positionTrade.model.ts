import { Stock } from 'src/app/components/stock/stock.model';
import { Broker } from '../portfolio/broker.model';
import { User } from '../user/user.model';

export interface PositionTrade {
    id?: number
    type: number
    stock: Stock
    user: User
    broker: Broker
    date: Date
    amount: number
    price: number
    tradeFee: number
    result?: number
}