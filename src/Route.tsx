import React from 'react'
import { useRoutes } from 'react-router-dom'
import LogIn from './features/Auth/LogIn'
import ProtectedRoute from './ProtectedRoute'
import MainLayout from './layouts/MainLayout'
import Header from './shared/Header'
import CartTable from './features/Cart/CartTable'
import WishlistPage from './features/Wishlist/WishlistPage'

const Route : React.FC = () => {
  const routes = useRoutes([
    {path: "/login", element: <LogIn/>},
    {
      path: "/",
      element: (
        <ProtectedRoute/>
      ),
      children: [
        {
          path: "/",
          element: (
            <MainLayout>
              <Header/>
            </MainLayout>
          )
        },
        {
          path: "/cart",
          element: (
            <MainLayout>
              <CartTable/>
            </MainLayout>
          )
        },
        {
          path: "/wishlist",
          element: (
            <MainLayout>
              <WishlistPage/>
            </MainLayout>
          )
        }
      ]
    }
  ])
  return (
    <div>{routes}</div>
  )
}

export default Route