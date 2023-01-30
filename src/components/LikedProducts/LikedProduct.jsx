import React from "react";
import { Link, useLoaderData } from "react-router-dom";
import { useLikeProduct } from "../../context/LikeProductsContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeartCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { formatToVND } from "../../utils/currencyFormat";

export default function LikedProduct({ id }) {
  const productData = useLoaderData();
  const { removeLikeProduct, openOrCloseLikedProducts } = useLikeProduct();
  const product = productData.find((product) => product.id === id);
  return (
    <div className="flex py-3 px-2 hover:bg-slate-200 cursor-pointer">
      <Link to={`/product/${id}`} className="flex" onClick={() => openOrCloseLikedProducts()}>
        <div className="w-1/6 self-center">
          <img src={product.image} alt={product.title} className="object-contain mix-blend-multiply w-3/4" />
        </div>
        <div className="w-3/4">
          <p className="">{product.title}</p>
          <p className="mt-5">{formatToVND(product.price)}</p>
        </div>
      </Link>
      <button className="self-start mr-3 hover:opacity-75" onClick={() => removeLikeProduct(product.id)}>
        <FontAwesomeIcon icon={faHeartCircleXmark} color="#ff3945" fontSize={25} />
      </button>
    </div>
  );
}
