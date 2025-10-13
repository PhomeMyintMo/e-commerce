import React from "react";
import { useRoutes } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import CartTable from "./features/Cart/CartTable";
import WishlistPage from "./features/Wishlist/WishlistPage";
import NotFoundPage from "./components/NotFoundPage";
import HomePage from "./features/Home/HomePage";

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
