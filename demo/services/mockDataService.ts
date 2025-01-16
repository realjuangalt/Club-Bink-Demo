import { useState, useEffect } from 'react';
import { initialUserTrades, addTrade as addTradeToData } from '../data/userTradeData';

export interface UserProfile {
  username: string;
  phoneNumber: string;
  email: string;
}

export interface Trade {
  date: string;
  type: 'BUY' | 'SELL';
  amount: number;
  price: number;
}

export interface UserData {
  profile: UserProfile;
  trades: Trade[];
}

const STORAGE_KEY = 'bitcoinDcaUserData';

const DEFAULT_USER_DATA: UserData = {
  profile: {
    username: 'demo_user',
    phoneNumber: '+1234567890',
    email: 'demo@example.com'
  },
  trades: initialUserTrades
};

export const useMockDataService = () => {
  const [userData, setUserData] = useState<UserData | null>(null);

  useEffect(() => {
    // Load data from localStorage on component mount
    const storedData = localStorage.getItem(STORAGE_KEY);
    if (storedData) {
      setUserData(JSON.parse(storedData));
    } else {
      setUserData(DEFAULT_USER_DATA);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_USER_DATA));
    }
  }, []);

  const saveUserProfile = (profile: UserProfile) => {
    const updatedUserData = { ...userData, profile };
    setUserData(updatedUserData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserData));
  };

  const saveTrade = (trade: Trade) => {
    const updatedTrades = addTradeToData(trade);
    const updatedUserData = {
      ...userData,
      trades: updatedTrades,
    };
    setUserData(updatedUserData);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUserData));
  };

  const exportTradesToCSV = () => {
    if (!userData?.trades.length) return '';

    const headers = ['Date', 'Type', 'Amount', 'Price'];
    const csvContent = [
      headers.join(','),
      ...userData.trades.map(trade => 
        `${trade.date},${trade.type},${trade.amount},${trade.price}`
      )
    ].join('\n');

    return csvContent;
  };

  return {
    userData,
    saveUserProfile,
    saveTrade,
    exportTradesToCSV,
  };
};

