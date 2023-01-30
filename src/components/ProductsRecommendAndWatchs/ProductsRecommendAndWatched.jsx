import React from "react";
import { useWatchedProducts } from "../../context/WatchedProductContext";
import { formatToVND } from "../../utils/currencyFormat";
import { Link } from "react-router-dom";
import Rating from "../Rating/Rating";

export default function ProductsRecommendAndWatched({ product, watched }) {
  const { addToWatched } = useWatchedProducts();
  return (
    <div
      className={`border border-slate-300 cursor-pointer text-center px-2 w-full sm:w-1/3 ${
        watched ? "bg-slate-200" : "bg-bgColor"
      }`}
      onClick={() => addToWatched(product.id)}
    >
      <Link to={`/product/${product.id}`} className="flex flex-col justify-around h-60 py-2">
        <h1 className="text-center text-sm sm:text-md">{product.title}</h1>
        <img
          src={product.image}
          alt={product.title}
          className="w-1/3 sm:w-1/2 h-1/2  object-contain mx-auto hover:scale-110 transition-transform mix-blend-multiply py-2"
        />
        <div className="flex justify-center ">
          <Rating productRating={product.rating.rate} />
        </div>
        <p className="text-lg">{formatToVND(product.price)}</p>
      </Link>
    </div>
  );
}
