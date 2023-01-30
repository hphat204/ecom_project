import React, { createContext, useContext, useState, useEffect } from "react";

const WatchedProductsContext = createContext();
export const useWatchedProducts = () => {
  return useContext(WatchedProductsContext);
};

export default function WatchedProductContextProvider({ children }) {
  const [watchedProductsId, setWatchedProduct] = useState(getWatchedProductsLocalStorage());

  function getWatchedProductsLocalStorage() {
    const getWatchProductId = localStorage.getItem("watchedProductsId");
    if (!getWatchProductId) return [];
    return JSON.parse(getWatchProductId);
  }
  useEffect(() => {
    localStorage.setItem("watchedProductsId", JSON.stringify(watchedProductsId));
  }, [watchedProductsId]);

  const addToWatched = (id) => {
    if (watchedProductsId.includes(id)) {
      return setWatchedProduct((prev) => [...prev.filter((productId) => productId !== id), id]);
    }
    return setWatchedProduct((prev) => [...prev, id]);
  };
  return (
    <WatchedProductsContext.Provider value={{ watchedProductsId, addToWatched }}>
      {children}
    </WatchedProductsContext.Provider>
  );
}
