import React from "react";
import { useLoaderData, useParams } from "react-router-dom";
import ProductsRecommendAndWatched from "../ProductsRecommendAndWatchs/ProductsRecommendAndWatched";

export default function ProductsRecommend() {
  const { id } = useParams();
  const productData = useLoaderData();
  const findProduct = productData.find((product) => product.id === Number(id));
  const getProductsCategory = productData.filter(
    (product) => product.category === findProduct.category && product.id !== findProduct.id
  );
  const randomProductsRecommend = (getProductsCategory) => {
    const randomProduct = [];
    if (getProductsCategory.length === 0) return;
    if (getProductsCategory.length <= 4) return getProductsCategory;
    for (let i = 0; i < 4; i++) {
      const randomNum = Math.round(Math.random() * (getProductsCategory.length - 1));
      randomProduct.push(getProductsCategory[randomNum]);
      getProductsCategory.splice(randomNum, 1);
    }
    return randomProduct;
  };
  return (
    <div className="mt-20">
      <p className="text-lg mb-3">Sản phẩm gợi ý</p>
      <div className="flex flex-col sm:flex-row">
        {randomProductsRecommend(getProductsCategory).map((product) => {
          return <ProductsRecommendAndWatched key={product.id} product={product} />;
        })}
      </div>
    </div>
  );
}
