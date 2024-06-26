import { Counter } from './features/counter/Counter';
import './App.css';
// import ProductList from './features/product-list/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckOut from './pages/CheckOut';
import ProductDetailPage from './pages/ProductDetailPage';
import PageNotFound from './pages/404'

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
  useSearchParams,
} from "react-router-dom";
import Protected from './features/auth/components/Protected';
import { useDebugValue, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchItemsByUserIdAsync } from './features/cart/CartSlice';
import { selectLoggedInUser } from './features/auth/authSlice';
import OrderSuccessPage from './pages/OrderSuccessPage';
import UserOrdersPage from './pages/UserOrdersPage';
import UserProfilePage from './pages/UserProfilePage';
import { fetchLoggedInUserAsync } from './features/user/userSlice';
import Logout from './features/auth/components/Logout';
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import ProtectedAdmin from './features/auth/components/ProtectedAdmin';
import AdminHome from './pages/AdminHome';
import AdminProductDetailPage from './pages/AdminProductDetailPage';
import AdminProductFormPage from './pages/AdminProductFormPage';
import AdminOrdersPage from './pages/AdminOrdersPage';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
  },
  {
    path: "/admin",
    element: <ProtectedAdmin><AdminHome/></ProtectedAdmin>,
  },
  {
    path: "/login",
    element: <LoginPage/>,
  },
  {
    path: "/signup",
    element: <SignupPage/>,
  },
  {
    path: "/cart",
    element:  <Protected><CartPage/></Protected>,
  },
  {
    path: "/checkout",
    element: <Protected><CheckOut/></Protected>
  },
  {
    path: "/productdetail/:id",
    element: <Protected><ProductDetailPage/></Protected>
  },
  {
    path: "/admin/productdetail/:id",
    element: <ProtectedAdmin><AdminProductDetailPage/></ProtectedAdmin>
  },
  {
    path: "/admin/product-form",
    element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
  },
  {
    path: "/admin/product-form/edit/:id",
    element: <ProtectedAdmin><AdminProductFormPage/></ProtectedAdmin>
  },
  {
    path: "/admin/orders",
    element: <ProtectedAdmin><AdminOrdersPage/></ProtectedAdmin>
  },
  {
    path: "/order-success/:id",
    element: <OrderSuccessPage></OrderSuccessPage>
  },
  {
    path: "/orders",
    element: <UserOrdersPage></UserOrdersPage>
  },
  {
    path: "/profile",
    element: <UserProfilePage></UserProfilePage>
  },
  {
    path: "/logout",
    element: <Logout></Logout>
  },
  {
    path: "/forgot-password",
    element: <ForgotPasswordPage></ForgotPasswordPage>
  },
  {
    path: "*",
    element: <PageNotFound></PageNotFound>
  }
]);


function App() {

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect( () => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
      dispatch(fetchLoggedInUserAsync(user.id))
    }
  }, [dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
