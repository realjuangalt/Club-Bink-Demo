export interface DCAPurchase {
  date: string;
  price: number;
  amountUsd: number;
  amountBtc: number;
  portfolioValueUsd: number;
}

export function calculateDCA(
  priceData: { date: string; price: number }[],
  investmentAmount: number,
  frequencyInWeeks: number
): DCAPurchase[] {
  let totalBtc = 0;
  const purchases: DCAPurchase[] = [];

  priceData.forEach((data, index) => {
    // Only make a purchase if we're at a frequency interval
    const shouldPurchase = index % frequencyInWeeks === 0;
    
    if (shouldPurchase) {
      // Calculate BTC bought at this price point
      const btcBought = investmentAmount / data.price;
      totalBtc += btcBought;

      purchases.push({
        date: data.date,
        price: data.price,
        amountUsd: investmentAmount,
        amountBtc: btcBought,
        portfolioValueUsd: totalBtc * data.price
      });
    } else {
      // On non-purchase weeks, just update the portfolio value
      purchases.push({
        date: data.date,
        price: data.price,
        amountUsd: 0,
        amountBtc: 0,
        portfolioValueUsd: totalBtc * data.price
      });
    }
  });

  return purchases;
}

