import React from "react";
import { Outlet, useRoutes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CartTable from "./features/Cart/CartTable";
import WishlistPage from "./features/Wishlist/WishlistPage";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./features/Home/HomePage";
import Products from "./features/Products/Products";
import CategoryDetailPage from "./features/Products/CategoryDetailPage";
import ProductDetailPage from "./features/Products/ProductDetailPage";

const Route: React.FC = () => {
  const routes = useRoutes([
    {
      path: "/",
      element: (
        <MainLayout>
          <HomePage />
        </MainLayout>
      ),
    },
    {
      path: "/products",
      element:(
        <MainLayout>
          <Outlet/>
        </MainLayout>
      ),
      children: [
        {
          path: "/products",
          element: <Products/>
        },
         {
          path: "/products/:id",
          element: <ProductDetailPage/>
        },
        // {
        //   path: "/products/:categoryId",
        //   element:
        //       <CategoryDetailPage/>
        // },
       
      ]
    },
    {
      path: "/cart",
      element: (
        <MainLayout>
          <CartTable />
        </MainLayout>
      ),
    },
    {
      path: "/wishlist",
      element: (
        <MainLayout>
          <WishlistPage />
        </MainLayout>
      ),
    },
    {
      path: "*",
      element: (
        <MainLayout>
          <NotFoundPage/>
        </MainLayout>
      )
    }
  ]);
  return <div>{routes}</div>;
};

export default Route;
