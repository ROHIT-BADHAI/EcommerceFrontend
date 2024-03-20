import React, { useEffect } from "react";
import Home from "./pages/Home";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CartPage from "./pages/CartPage";
import Checkout from "./pages/Checkout";
import ProductDetailsPage from "./pages/ProductDetailsPage";
import Protected from "./features/auth/components/Protected";
import { useDispatch, useSelector } from "react-redux";
import { selectLoggedInUser } from "./features/auth/authSlice";
import { fetchCartByUserIdAsync } from "./features/cart/cartSlice";
import PageNotFound from "./pages/404";
import OrderSuccessPage from "./pages/orderSuccess";
// import UserOrders from "./features/user/components/UserOrders";
import UserOrdersPage from "./pages/UserOrdersPage";
import UserProfilePage from "./pages/UserProfilePage";
import { fetchLoggedInUserAsync } from "./features/user/userSlice";
import Logout from "./features/auth/components/Logout";
import ForgotPassword from "./features/auth/components/ForgotPassword";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ProtectedAdmin from "./features/auth/components/ProtectedAdmin";
import AdminHome from "./pages/AdminHome";
import AdminProductDetails from "./features/admin/components/AdminProductDetails";
import AdminProductDetailsPage from "./pages/AdminProductDetailsPage";
import ProductForm from "./features/admin/components/ProductForm";
import AdminProductFormPage from "./pages/AdminProductFormPage";
import AdminOrdersPage from "./pages/AdminOrdersPage";
function App() {
  const dispatch=useDispatch();
  const loggedInUser=useSelector(selectLoggedInUser)
  useEffect(()=>{
    (async()=>{
      if(loggedInUser){
        
         dispatch(fetchLoggedInUserAsync(loggedInUser.id))
       dispatch(fetchCartByUserIdAsync(loggedInUser.id))
      }
    })();
  },[dispatch,loggedInUser])
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Protected><Home /></Protected>} />
        <Route exact path="/admin" element={<ProtectedAdmin><AdminHome /></ProtectedAdmin>} />  {/*admin */}
        <Route exact path="/login" element={<LoginPage />} />
        <Route exact path="/signup" element={<SignupPage />} />
        <Route exact path="/cart" element={<Protected><CartPage /></Protected>} />
        <Route exact path="/checkout" element={<Protected><Checkout /></Protected>} />
        <Route exact path="/product-details/:id" element={<Protected><ProductDetailsPage /></Protected>} />
        <Route exact path="/admin/product-details/:id" element={<ProtectedAdmin><AdminProductDetailsPage /></ProtectedAdmin>} />   {/*admin */}
        <Route exact path="/order-success/:id" element={<OrderSuccessPage/>} />
        <Route exact path="/orders" element={<Protected><UserOrdersPage/></Protected>} />
        <Route exact path="/profile" element={<Protected><UserProfilePage/></Protected>} />
        <Route exact path="/logout" element={<Protected><Logout/></Protected>} />
        <Route exact path="/forgotPassword" element={<ForgotPasswordPage/>} />
        <Route exact path="*" element={<PageNotFound/>} />
        <Route exact path="/admin/product-form" element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
        <Route exact path="/admin/product-form/edit/:id" element={<ProtectedAdmin><AdminProductFormPage /></ProtectedAdmin>} />
        <Route exact path="/admin/orders" element={<ProtectedAdmin><AdminOrdersPage /></ProtectedAdmin>} />
      </Routes>
    </Router>
  );
}

export default App;
