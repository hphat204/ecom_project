import React from "react";
import { useLoaderData } from "react-router-dom";
import { useWatchedProducts } from "../../context/WatchedProductContext";
import ProductsRecommendAndWatched from "../ProductsRecommendAndWatchs/ProductsRecommendAndWatched";

export default function WatchedProducts() {
  const { watchedProductsId } = useWatchedProducts();
  const productData = useLoaderData();
  const reverseWatchedProducts = [...watchedProductsId].reverse().slice(0, 4);

  if (watchedProductsId.length === 0) return;
  return (
    <div className="mt-10">
      <p className="text-lg mb-3">Các sản phẩm đã xem</p>
      <div className="flex flex-col sm:flex-row">
        {reverseWatchedProducts.map((id, index) => {
          const product = productData.find((product) => product.id === id);
          return <ProductsRecommendAndWatched key={index} product={product} watched={true} />;
        })}
      </div>
    </div>
  );
}
