import React from "react";
import ReactDOM from "react-dom/client";
import App, { loader as ProductsLoader } from "./App";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProductsContainer from "./components/ProductsContainer/ProductsContainer";
import ProductDetails, { loader as ProductDetailsLoader } from "./page/ProductDetails/ProductDetails";
import ErrorPage from "./page/ErrorPage";
import FilterContextProvider from "./context/FilterContext";
import CartContextProvider from "./context/CartContext";
import ProductsRecommendList from "./components/ProductsRecommendList/ProductsRecommendList";
import LikeProductsContextProvider from "./context/LikeProductsContext";
import WatchedProductContextProvider from "./context/WatchedProductContext";
import WatchedProductsList from "./components/WatchedProductsList/WatchedProductsList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    loader: ProductsLoader,
    children: [
      {
        path: "/",
        element: <ProductsContainer />,
        loader: ProductsLoader,
      },
      {
        path: "/product/:id",
        element: <ProductDetails />,
        errorElement: <ErrorPage />,
        loader: ProductDetailsLoader,
        children: [
          {
            path: "/product/:id",
            element: (
              <>
                <ProductsRecommendList />
                <WatchedProductsList />
              </>
            ),
            errorElement: <ErrorPage />,
            loader: ProductsLoader,
          },
        ],
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <FilterContextProvider>
      <CartContextProvider>
        <LikeProductsContextProvider>
          <WatchedProductContextProvider>
            <RouterProvider router={router} />
          </WatchedProductContextProvider>
        </LikeProductsContextProvider>
      </CartContextProvider>
    </FilterContextProvider>
  </React.StrictMode>
);
