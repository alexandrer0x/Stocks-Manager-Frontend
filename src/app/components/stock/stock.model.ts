export interface Stock {
    id : string,
    company : string,
    price? : number,
    previousClosePrice? : number,
    changePercent? : number,
    lastUpdated? :  Date
}