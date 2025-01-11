import priceData from './bitcoin_prices.json';

export interface HistoricalPrice {
  date: string;
  price: number;
}

// Type assertion since we know the structure of our JSON
export const historicalPrices = priceData as HistoricalPrice[];

