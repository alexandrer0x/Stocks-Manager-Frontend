export interface Stock {
    ticker : string,
    company : string,
    price? : number,
    previousClosePrice? : number,
    changePercent? : number,
    lastUpdated? :  Date
}