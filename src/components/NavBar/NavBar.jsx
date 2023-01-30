import React, { useState } from "react";
import { faMagnifyingGlass, faCartShopping } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useFilter, useIsFilter } from "../../context/FilterContext";
import { useLoaderData, useLocation } from "react-router-dom";
import Cart from "../Cart/Cart";
import { useCart } from "../../context/CartContext";
import LikedProductsContainer from "../LikedProducts/LikedProductsContainer";
import { useLikeProduct } from "../../context/LikeProductsContext";

export default function NavBar() {
  const [inputValue, setInputValue] = useState("");
  const productsData = useLoaderData();
  const { setFilterProducts } = useFilter();
  const { setIsFilter } = useIsFilter();
  const { cartQuantity, isCartOpen, cartToggle } = useCart();
  const { openOrCloseLikedProducts, isProductLikedOpen } = useLikeProduct();
  const location = useLocation();
  const isInProductPage = location.pathname.includes("product");
  function handleInput(e) {
    setIsFilter(true);
    setInputValue(e.target.value);
    setFilterProducts(productsData.filter((product) => product.title.toLowerCase().includes(e.target.value)));
  }

  return (
    <>
      <Cart />
      <LikedProductsContainer />
      <nav
        className={`bg-white px-4 flex py-3 justify-between items-center flex-wrap z-40 ${
          isCartOpen === false && "shadow-md sticky top-0 left-0"
        }`}
      >
        <a href="/" className="mx-auto sm:mx-0">
          <h1 className="text-5xl ">ecom+</h1>
        </a>
        <div
          className={`font-sans w-full sm:w-1/2 relative sm:order-2 py-2 sm:py-0 lg:ml-24 ${
            isInProductPage && "hidden"
          }`}
        >
          <FontAwesomeIcon icon={faMagnifyingGlass} className="absolute left-4 top-5 sm:top-3" />
          <input
            type="text"
            placeholder="Tìm kiếm tên sản phẩm"
            value={inputValue}
            onChange={handleInput}
            className="border py-2 px-12 lg:w-2/3 outline-none rounded focus:border-slate-400 w-full"
          />
        </div>

        <button
          className={`${
            isProductLikedOpen ? "bg-slate-200 text-black" : "bg-white"
          } text-slate-600 cursor-pointer relative hover:text-black rounded order-3 sm:p-2 w-1/2 md:w-auto sm:ml-auto `}
          onClick={() => openOrCloseLikedProducts()}
        >
          sản phẩm đã thích
        </button>

        <div className="relative sm:order-3 order-4 mt-0 ml-auto sm:ml-0 " role="button" onClick={() => cartToggle()}>
          <FontAwesomeIcon
            icon={faCartShopping}
            className="mr-2 text-lg text-blue-600 rounded hover:bg-blue-100 p-2 mt-5 md:mt-0"
          />
          <div className="rounded-full bg-red-500 w-auto absolute bottom-8 px-2 left-5 text-white text-center text-sm font-mono">
            {cartQuantity}
          </div>
        </div>
      </nav>
      {isCartOpen && (
        <div
          className="bg-black bg-opacity-60 h-full fixed top-0 left-0 w-full z-10 shadow-lg"
          onClick={() => cartToggle()}
        ></div>
      )}
    </>
  );
}
