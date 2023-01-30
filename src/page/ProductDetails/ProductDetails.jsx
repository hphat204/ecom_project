import React from "react";
import { useLoaderData, ScrollRestoration, Outlet } from "react-router-dom";
import { getProductDetails } from "../../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus, faMinus, faCartShopping, faHeart } from "@fortawesome/free-solid-svg-icons";
import { formatToVND } from "../../utils/currencyFormat";
import { useCart } from "../../context/CartContext";
import { useLikeProduct } from "../../context/LikeProductsContext";
import Rating from "../../components/Rating/Rating";
export default function ProductDetails() {
  const product = useLoaderData();
  const { increaseProductQty, decreaseProductQty, getCartProductQty, setQty } = useCart();
  const { ToggleLikeProduct, checkIfProductLiked } = useLikeProduct();
  const getQty = getCartProductQty(product.id);
  return (
    <div className="mx-auto bg-bgColor h-auto pt-10 p-4 font-poppins ">
      <ScrollRestoration />
      <div className="flex flex-col md:flex-row ">
        <div className="w-full md:w-1/2">
          <img src={product.image} alt={product.title} className="w-1/2 m-auto mix-blend-multiply" />
          <p className=" mt-5 font-serif text-sm md:text-base">{product.description}</p>
        </div>
        <div className="w-full md:w-1/2 mx-auto md:pl-16 mt-3 md:mt-0 ">
          <p className=" text-slate-400 font-serif">{product.category}</p>
          <div className="flex">
            <h1 className="text-2xl mr-3">{product.title}</h1>
            <button onClick={() => ToggleLikeProduct(product.id)} className="self-start">
              <FontAwesomeIcon
                icon={faHeart}
                color={checkIfProductLiked(product.id) ? "#ff3945" : "rgb(220, 220, 220)"}
                fontSize={25}
              />
            </button>
          </div>
          <div className="mt-3">
            <Rating productRating={product.rating.rate} />
            <span className="ml-2 text-sm text-slate-500">({product.rating.count} đánh giá)</span>
          </div>
          <div className="text-center md:text-start">
            <p className="mt-7 ml-2 text-3xl font-semibold">{formatToVND(product.price)}</p>
            {getQty >= 1 && (
              <>
                <p className="font-sans mt-5">Số Lượng</p>
                <div className="flex mt-2 justify-center md:justify-start">
                  <button
                    className="w-10 py-1 bg-white border hover:bg-slate-200"
                    onClick={() => decreaseProductQty(product.id)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <input
                    type="number"
                    className="w-10 outline-none text-center"
                    value={getQty}
                    onChange={(e) => setQty(product.id, Number(e.target.value) ? Number(e.target.value) : 1)}
                  />
                  <button
                    className="w-10 py-1 bg-white border hover:bg-slate-200"
                    onClick={() => increaseProductQty(product.id)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                </div>
              </>
            )}
            {getQty === 0 && (
              <button
                className="py-3 px-16 rounded text-white font-semibold mt-10 bg-[#ff3945] hover:bg-opacity-80"
                onClick={() => increaseProductQty(product.id)}
              >
                <FontAwesomeIcon icon={faCartShopping} fontSize="20" />
              </button>
            )}
          </div>
        </div>
      </div>
      <Outlet />
    </div>
  );
}

export function loader({ params }) {
  const id = params.id;
  return getProductDetails(id);
}
