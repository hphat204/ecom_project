import React, { useState } from "react";
import { useLoaderData } from "react-router-dom";
import Products from "../Products/Products";
import Pagination from "../Pagination/Pagination";
import { useFilter, useIsFilter } from "../../context/FilterContext";
import FilterBar from "../FilterBar/FilterBar";

export default function ProductsContainer() {
  const productsData = useLoaderData();
  const [currentPage, setCurrentPage] = useState(1);
  const { filterProducts } = useFilter();
  const { isFilter } = useIsFilter();
  const postPerPage = 8;
  const indexOflastProduct = currentPage * postPerPage;
  const indexOfFirstProduct = indexOflastProduct - postPerPage;

  const productsToShow = (data) => {
    return data.slice(indexOfFirstProduct, indexOflastProduct);
  };
  if (isFilter && filterProducts.length === 0) {
    return <p className="w-100 text-center pt-5 bg-white">không có sản phẩm để hiện</p>;
  }

  return (
    <div className="w-100 mx-4 mt-2">
      <FilterBar />
      {productsData.length ? (
        <>
          <Products products={isFilter ? productsToShow(filterProducts) : productsToShow(productsData)} />

          <Pagination
            totalProducts={productsData.length}
            currentPage={currentPage}
            postPerPage={postPerPage}
            setCurrentPage={setCurrentPage}
            filterProducts={filterProducts}
            isFilter={isFilter}
          />
        </>
      ) : (
        <p className="w-100 text-center pt-5 bg-white">không có sản phẩm để hiện</p>
      )}
    </div>
  );
}
