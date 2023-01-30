import React from "react";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../context/CartContext";
import CartProduct from "./CartProduct";
import { useLoaderData } from "react-router-dom";
import { formatToVND } from "../../utils/currencyFormat";
export default function Cart() {
  const { cart, isCartOpen, cartToggle } = useCart();
  const productData = useLoaderData();
  const body = document.querySelector("body");
  if (isCartOpen) {
    body.classList.add("overflow-hidden");
  } else {
    body.classList.remove("overflow-hidden");
  }

  return (
    <div
      className={` bg-white w-2/3 sm:w-1/2 lg:w-1/3 h-screen fixed z-50 overflow-auto pb-32 transition-transform translate-x-full ${
        isCartOpen && "translate-x-0"
      }   right-0 `}
    >
      <div className="w-full text-right">
        {isCartOpen && (
          <button onClick={() => cartToggle()} className="py-1 px-5 text-white bg-[#ff3945] rounded-b mr-20">
            <FontAwesomeIcon icon={faXmark} fontSize={20} />
          </button>
        )}
      </div>
      {cart.map((product, index) => (
        <div key={index} className="w-full">
          <CartProduct id={product.id} />
        </div>
      ))}
      {cart.length !== 0 ? (
        <div className="w-full py-5 px-2 text-right text-2xl font-mono">
          <span className="text-lg text-slate-500 mr-2 font-poppins">Tổng cộng:</span>
          {formatToVND(
            cart.reduce((total, cur) => {
              const product = productData.find((item) => item.id === cur.id);

              return total + (product?.price || 0) * cur.quantity;
            }, 0)
          )}
        </div>
      ) : (
        <p className="text-center mt-10 font-mono text-slate-500">giỏ hàng trống ...</p>
      )}
    </div>
  );
}
