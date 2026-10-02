import MainLayout from "../components/layout/MainLayout";

import ProductsPage from "../pages/ProductsPage";
import ProductDetailPage from "../pages/ProductDetailPage";
import CartPage from "../pages/CartPage";
import WishlistPage from "../pages/WishListPage";
import CheckoutPage from "../pages/CheckoutPage";
import HomePage from "../pages/HomePage";
import { createBrowserRouter, RouterProvider } from "react-router";
import { AppProvider } from "../context/AppContext";
import { productLoader } from "./loader/productLoader";

const AppRoutes = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AppProvider />,
      children: [
        {
          element: <MainLayout />,
          children: [
            {
              index: true,
              element: <HomePage />,
            },
            {
              path: "products",
              element: <ProductsPage />,
            },
            {
              path: "products/:id",
              loader: productLoader,
              element: <ProductDetailPage />,
            },
            {
              path: "cart",
              element: <CartPage />,
            },
            {
              path: "wishlist",
              element: <WishlistPage />,
            },
            {
              path: "checkout",
              element: <CheckoutPage />,
            },
          ],
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default AppRoutes;
