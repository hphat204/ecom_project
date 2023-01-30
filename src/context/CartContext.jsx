import React, { createContext, useContext, useEffect, useState } from "react";

const CartContext = createContext();
export const useCart = () => {
  return useContext(CartContext);
};

export default function CartContextProvider({ children }) {
  const [cart, setCart] = useState(getCartLocalStorage());

  function getCartLocalStorage() {
    const getCart = localStorage.getItem("Cart");
    if (!getCart) return [];
    return JSON.parse(getCart);
  }
  useEffect(() => {
    localStorage.setItem("Cart", JSON.stringify(cart));
  }, [cart]);

  const [isCartOpen, setIsCartOpen] = useState(false);

  const cartToggle = () => setIsCartOpen((prev) => !prev);

  const cartQuantity = cart.reduce((total, cur) => cur.quantity + total, 0);

  const getCartTotalPrice = cart.reduce((total, cur) => cur.quantity * cur.price + total, 0);

  const getCartProductQty = (id) => {
    return cart.find((product) => product.id === id)?.quantity || 0;
  };
  const setQty = (id, qty) => {
    setCart((products) => products.map((product) => (product.id === id ? { ...product, quantity: qty } : product)));
  };
  const increaseProductQty = (id) => {
    setCart((products) => {
      if (products.find((product) => product.id === id) == null) {
        return [...products, { id, quantity: 1 }];
      }
      return products.map((product) => (product.id === id ? { ...product, quantity: product.quantity + 1 } : product));
    });
  };
  const decreaseProductQty = (id) => {
    setCart((products) => {
      if (products.find((product) => product.id === id)?.quantity <= 1) {
        return products.filter((product) => product.id !== id);
      }
      return products.map((product) => (product.id === id ? { ...product, quantity: product.quantity - 1 } : product));
    });
  };
  const removeFromCart = (id) => {
    setCart((products) => {
      return products.filter((product) => product.id !== id);
    });
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        cartQuantity,
        cartToggle,
        isCartOpen,
        setQty,
        getCartTotalPrice,
        getCartProductQty,
        increaseProductQty,
        decreaseProductQty,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}
