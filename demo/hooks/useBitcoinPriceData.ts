import { useState, useEffect } from 'react';
import { historicalPrices, HistoricalPrice } from '../data/bitcoin-prices';

interface PriceData extends HistoricalPrice {}

export function useBitcoinPriceData() {
  const [priceData, setPriceData] = useState<PriceData[]>(historicalPrices);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLatestPrice = async () => {
      try {
        const response = await fetch('https://mempool.space/api/v1/prices');
        if (!response.ok) {
          throw new Error('Failed to fetch latest price');
        }
        const data = await response.json();
        const latestPrice: PriceData = {
          date: new Date().toISOString().split('T')[0],
          price: data.USD
        };

        setPriceData(prevData => {
          const newData = [...prevData];
          // Only add/update if the latest price is newer than our last data point
          const lastDate = new Date(newData[newData.length - 1].date);
          const newDate = new Date(latestPrice.date);
          if (newDate > lastDate) {
            return [...newData, latestPrice];
          } else if (newDate.toISOString().split('T')[0] === lastDate.toISOString().split('T')[0]) {
            newData[newData.length - 1] = latestPrice;
            return newData;
          }
          return newData;
        });
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setIsLoading(false);
      }
    };

    fetchLatestPrice();
    const interval = setInterval(fetchLatestPrice, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return { priceData, isLoading, error };
}

