export interface DayTrade {
    id?: number,
    stockSymbol: string,
    date: Date,
    amount: number,
    buyPrice: number,
    sellPrice: number,
    tradeFee: number,
    userId?: number
}