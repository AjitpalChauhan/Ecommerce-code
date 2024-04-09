import { Counter } from './features/counter/Counter';
import './App.css';
// import ProductList from './features/product-list/ProductList';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import CartPage from './pages/CartPage';
import CheckOut from './pages/CheckOut';
import ProductDetailPage from './pages/ProductDetailPage';

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


const router = createBrowserRouter([
  {
    path: "/",
    element: <Protected><Home/></Protected>,
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
]);


function App() {

  const dispatch = useDispatch()
  const user = useSelector(selectLoggedInUser)

  useEffect( () => {
    if (user) {
      dispatch(fetchItemsByUserIdAsync(user.id))
    }
  }, [dispatch, user])

  return (
    <div className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
