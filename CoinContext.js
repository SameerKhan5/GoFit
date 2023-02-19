import React, { useState, createContext } from "react";

export const CoinContext = createContext();

export const CoinProvider = ({ children }) => {
  const [coins, setCoins] = useState(5000);

  const addCoins = (amount) => {
    setCoins(coins + amount);
  };

  const deductCoins = (amount) => {
    setCoins(coins - amount);
  };

  return (
    <CoinContext.Provider value={{ coins, addCoins, deductCoins }}>
      {children}
    </CoinContext.Provider>
  );
};
