import React, { useMemo, useState } from "react";
import { useLoaderData, useNavigate } from "react-router-dom";
import { useFilter, useIsFilter } from "../../context/FilterContext";

export default function FilterBar() {
  const productsData = useLoaderData();
  const { setFilterProducts } = useFilter();
  const { setIsFilter } = useIsFilter();
  const [curCategoryName, setcurCategoryName] = useState("");
  const navigate = useNavigate();
  const getUniqueCategory = useMemo(() => new Set(productsData.map((product) => product.category)), [productsData]);
  const arrayOfUniqueCategory = Array.from(getUniqueCategory);

  function removeActive() {
    const getCateLinks = document.querySelectorAll(".category-link");
    getCateLinks.forEach((link) => link.classList.remove("active"));
  }
  function handleChange(e) {
    removeActive();
    setIsFilter(true);
    setcurCategoryName("");
    const checkValue = e.target.value;
    if (checkValue === "default") setFilterProducts(productsData);
    if (checkValue === "asc") {
      setFilterProducts(productsData.sort((product1, product2) => product1.price - product2.price));
    }
    if (checkValue === "desc") {
      setFilterProducts(productsData.sort((product1, product2) => product2.price - product1.price));
    }
    navigate("/");
  }

  function removeAndSetActive(e) {
    if (e.target.classList.contains("active")) return e.target.classList.remove("active");
    removeActive();
    e.target.classList.add("active");
  }

  function handleClick(e, category) {
    setIsFilter(true);
    removeAndSetActive(e);
    if (category === curCategoryName) {
      setcurCategoryName("");
      setFilterProducts([]);
      return setIsFilter(false);
    }
    setcurCategoryName(category);
    setFilterProducts(productsData.filter((product) => product.category === category));

    navigate("/");
  }
  return (
    <div className="bg-white pl-10 gap-2 flex flex-wrap py-4">
      <div>
        <select id="price" onChange={handleChange} className="outline-none border-b-4 py-2">
          <option value="default">giá</option>
          <option value="desc">giảm dần</option>
          <option value="asc">tăng dần</option>
        </select>
      </div>

      {arrayOfUniqueCategory.map((category, index) => (
        <div
          key={index}
          className="ml-4 px-2 py-2 border font-sans cursor-pointer category-link rounded"
          onClick={(e) => handleClick(e, category)}
        >
          {category}
        </div>
      ))}
    </div>
  );
}
