export interface DayTradeTransaction {
    id?: number,
    stockSymbol: string,
    date: Date,
    amount: number,
    buyPrice: number,
    sellPrice: number,
    brokerageFee: number,
    userId?: number
}