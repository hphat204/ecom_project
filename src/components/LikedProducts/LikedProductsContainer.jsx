import React from "react";
import { useLikeProduct } from "../../context/LikeProductsContext";
import LikedProduct from "./LikedProduct";

export default function LikedProductsContainer() {
  const { likeProductsId, isProductLikedOpen } = useLikeProduct();
  if (likeProductsId.length < 1 && isProductLikedOpen)
    return (
      <div className="bg-white shadow-2xl fixed top-48 sm:w-96 sm:top-36 md:top-28 lg:top-20 right-0 w-80  z-30 p-5 text-slate-500 ">
        danh sách thích trống .
      </div>
    );
  return (
    <>
      {isProductLikedOpen && (
        <div className="bg-white shadow-2xl flex flex-col fixed top-36 sm:w-96 md:top-20 lg:top-20 right-0 w-80 max-h-screen  z-30 overflow-auto pb-28 text-black ">
          {likeProductsId.map((productId) => (
            <LikedProduct key={productId} id={productId} />
          ))}
        </div>
      )}
    </>
  );
}
