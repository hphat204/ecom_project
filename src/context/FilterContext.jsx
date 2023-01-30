import React, { createContext, useContext, useState } from "react";

const FilterContext = createContext();
const IsFilterContext = createContext();
export const useFilter = () => {
  return useContext(FilterContext);
};
export const useIsFilter = () => {
  return useContext(IsFilterContext);
};
export default function FilterContextProvider({ children }) {
  const [filterProducts, setFilterProducts] = useState([]);
  const [isFilter, setIsFilter] = useState(false);
  return (
    <FilterContext.Provider value={{ filterProducts, setFilterProducts }}>
      <IsFilterContext.Provider value={{ isFilter, setIsFilter }}>{children}</IsFilterContext.Provider>
    </FilterContext.Provider>
  );
}
