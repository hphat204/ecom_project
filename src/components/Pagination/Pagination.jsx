import React, { useEffect } from "react";

export default function Pagination({
  totalProducts,
  currentPage,
  setCurrentPage,
  postPerPage,
  isFilter,
  filterProducts,
}) {
  const pageNum = [];

  if (isFilter) {
    totalProducts = filterProducts.length;
  }
  const countTotalPage = Math.ceil(totalProducts / postPerPage);

  useEffect(() => {
    handlePageChange(1);
  }, [filterProducts]);

  for (let i = 1; i <= countTotalPage; i++) {
    pageNum.push(i);
  }
  function handlePageChange(newPage) {
    setCurrentPage(newPage);
    document.documentElement.scroll({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }
  return (
    <div className="w-full flex justify-center">
      <ul className="flex py-5">
        {pageNum.map((page) => (
          <li
            key={page}
            onClick={() => handlePageChange(page)}
            className={`mx-2 cursor-pointer ${
              currentPage === page ? "bg-red-500 text-white" : "text-black"
            } py-2 w-10 text-center rounded `}
          >
            {page}
          </li>
        ))}
      </ul>
    </div>
  );
}
