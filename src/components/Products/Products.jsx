import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faCartPlus, faTrash, faHeart } from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import { formatToVND } from "../../utils/currencyFormat";
import { useCart } from "../../context/CartContext";
import { useLikeProduct } from "../../context/LikeProductsContext";
import { useWatchedProducts } from "../../context/WatchedProductContext";

export default function Products({ products }) {
  const { increaseProductQty, getCartProductQty, decreaseProductQty } = useCart();
  const { ToggleLikeProduct, checkIfProductLiked } = useLikeProduct();
  const { addToWatched } = useWatchedProducts();
  return (
    <div className="w-full gap-4 grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 mt-2">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full relative bg-white rounded pt-2 cursor-pointer transition-shadow hover:shadow-lg "
        >
          <Link
            to={`/product/${product.id}`}
            style={{ textDecoration: "none" }}
            onClick={() => addToWatched(product.id)}
          >
            <div className="h-32 w-full">
              <img src={product.image} alt={product.title} className="h-full mx-auto mix-blend-multiply" />
            </div>
            <div className="pt-2 px-5 h-60 flex flex-col text-ellipsis">
              <h1 className="text-center sm:text-left">
                {product.title.length > 30 ? product.title.slice(0, 40) + "..." : product.title}
              </h1>
              <div className={`${product.title.length <= 30 && "mt-6"} text-lg`}>
                <div className="pl-2 pt-2 sm:pt-0">
                  <span className="mr-1 pt-2">{product.rating.rate}</span>
                  <FontAwesomeIcon icon={faStar} color="#fdd836" />
                  <span className="text-sm text-slate-500">({product.rating.count})</span>
                </div>
              </div>
              <p className="text-2xl ml-auto pr-2 pt-14">{formatToVND(product.price)}</p>
            </div>
          </Link>
          {getCartProductQty(product.id) === 0 ? (
            <button
              onClick={() => increaseProductQty(product.id)}
              className="p-2 w-28 absolute bottom-0 left-0 text-white bg-blue-400 rounded-t hover:bg-blue-600"
            >
              <FontAwesomeIcon icon={faCartPlus} fontSize={20} />
            </button>
          ) : (
            <button
              onClick={() => decreaseProductQty(product.id)}
              className="p-2 w-28 absolute bottom-0 left-0 text-white bg-[#ff3945] rounded-t hover:bg-opacity-80"
            >
              <FontAwesomeIcon icon={faTrash} fontSize={20} />
            </button>
          )}
          <button className="absolute top-1 right-1" onClick={() => ToggleLikeProduct(product.id)}>
            <FontAwesomeIcon
              icon={faHeart}
              color={checkIfProductLiked(product.id) ? "#ff3945" : "rgb(220, 220, 220)"}
              fontSize={25}
            />
          </button>
        </div>
      ))}
    </div>
  );
}
