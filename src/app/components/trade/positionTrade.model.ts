import { Stock } from 'src/app/components/stock/stock.model';

export interface PositionTrade {
    id?: number
    type: string
    stock: Stock
    date: Date
    amount: number
    price: number
    tradeFee: number
    userId?: number
    result?: number
}