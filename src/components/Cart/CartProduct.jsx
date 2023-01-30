import React from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faXmarkCircle } from "@fortawesome/free-solid-svg-icons";
import { formatToVND } from "../../utils/currencyFormat";
export default function CartProduct({ id }) {
  const productData = useLoaderData();
  const navigate = useNavigate();
  const { getCartProductQty, increaseProductQty, decreaseProductQty, setQty, removeFromCart, cartToggle } = useCart();
  const product = productData.find((product) => product.id === id);
  function goToProductPage() {
    cartToggle();
    navigate(`/product/${product.id}`);
  }
  return (
    <div className="px-2 flex mt-5 font-poppins justify-evenly ">
      <img
        src={product.image}
        alt={product.title}
        className="w-1/4 object-contain cursor-pointer"
        onClick={goToProductPage}
      />
      <div className="pl-2 flex flex-col justify-around w-2/3">
        <h1 className="font-bold font-poppins cursor-pointer" onClick={goToProductPage}>
          {product.title}
        </h1>
        <p className="text-right text-xl text-slate-600 mt-2">
          {formatToVND(product.price * getCartProductQty(product.id))}
        </p>
        <div className="flex mt-2 justify-center md:justify-start">
          <button className="w-7 bg-blue-200 border hover:bg-blue-100" onClick={() => decreaseProductQty(product.id)}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <input
            type="number"
            className="w-10 outline-none text-center font-sans"
            value={getCartProductQty(product.id)}
            onChange={(e) => setQty(product.id, Number(e.target.value))}
          />
          <button className="w-7 bg-blue-200 border hover:bg-blue-100 " onClick={() => increaseProductQty(product.id)}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>
      </div>
      <button className="self-start" onClick={() => removeFromCart(product.id)}>
        <FontAwesomeIcon icon={faXmarkCircle} color="#ff3945" fontSize={20} />
      </button>
    </div>
  );
}
