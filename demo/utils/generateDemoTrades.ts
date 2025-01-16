import { Trade } from '../services/mockDataService';

export function generateDemoTrades(): Trade[] {
  const trades: Trade[] = [];
  const startDate = new Date(2024, 0, 1); // January 1, 2024
  const endDate = new Date(); // Current date
  const weekInMilliseconds = 7 * 24 * 60 * 60 * 1000;

  for (let date = startDate; date <= endDate; date = new Date(date.getTime() + weekInMilliseconds)) {
    const price = 30000 + Math.random() * 20000; // Random price between 30,000 and 50,000
    const amount = 100 / price; // $100 worth of BTC each week

    trades.push({
      date: date.toISOString(),
      type: 'BUY',
      amount,
      price,
    });
  }

  return trades;
}

