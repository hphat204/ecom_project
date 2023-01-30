import React, { createContext, useContext, useState, useEffect } from "react";

const LikeProductContext = createContext();

export const useLikeProduct = () => {
  return useContext(LikeProductContext);
};

export default function LikeProductsContextProvider({ children }) {
  const [likeProductsId, setLikeProductsId] = useState(getLikeIdLocalStorage());
  const [isProductLikedOpen, setIsProductLikedOpen] = useState(false);

  function getLikeIdLocalStorage() {
    const getLikedProductId = localStorage.getItem("likeProductsId");
    if (!getLikedProductId) return [];
    return JSON.parse(getLikedProductId);
  }
  useEffect(() => {
    localStorage.setItem("likeProductsId", JSON.stringify(likeProductsId));
  }, [likeProductsId]);

  function openOrCloseLikedProducts() {
    return setIsProductLikedOpen((prev) => !prev);
  }
  function ToggleLikeProduct(id) {
    if (checkIfProductLiked(id)) return setLikeProductsId((prev) => prev.filter((productId) => productId !== id));
    return setLikeProductsId((prev) => [...prev, id]);
  }
  function checkIfProductLiked(id) {
    return likeProductsId.some((productId) => productId === id);
  }
  function removeLikeProduct(id) {
    return setLikeProductsId((prev) => prev.filter((productId) => productId !== id));
  }

  return (
    <LikeProductContext.Provider
      value={{
        likeProductsId,
        ToggleLikeProduct,
        isProductLikedOpen,
        removeLikeProduct,
        openOrCloseLikedProducts,
        checkIfProductLiked,
      }}
    >
      {children}
    </LikeProductContext.Provider>
  );
}
