import React, { useEffect } from "react";
import "./App.scss";
import Home from "./UI/Pages/Home/Home.jsx";
import AdminLogin from "./UI/Pages/AdminLogin/AdminLogin.jsx";
import UserLogin from "./UI/Pages/UserLogin/UserLogin.jsx";
import AdminDashboard2 from "./UI/Pages/AdminDashboard/AdminDashboard2.jsx";
import UserDashboard from "./UI/Pages/UserDashboard/UserDashboard.jsx";
import CreateUser from "./UI/Pages/CreateUser/CreateUser.jsx";
import Navbar from "./UI/Components/Navbar/Navbar.jsx";
import Footer from "./UI/Components/Footer/Footer.jsx";
import SingleProduct from "./UI/Pages/SingleProduct/SingleProduct.jsx";
import CategoryView from "./UI/Pages/CategoryView/CategoryView.jsx";
import Cart from "./UI/Pages/UserDashboard/Cart/Cart.jsx";
import Checkout from "./UI/Pages/Checkout/Checkout.jsx";
import Categories from "./UI/Pages/Categories/Categories.jsx";
import Orders from "./UI/Pages/UserDashboard/Orders/Orders.jsx";
import Wishlist from "./UI/Pages/UserDashboard/Wishlist/Wishlist.jsx";
import Address from "./UI/Pages/UserDashboard/Address/Address.jsx";
import Security from "./UI/Pages/UserDashboard/Security/Security.jsx";
import Returns from "./UI/Pages/UserDashboard/Returns/Returns.jsx";
import About from "./UI/Pages/About/About.jsx";
import { loadUser } from "./Redux/userSlice";

import { Route, Routes } from "react-router-dom";
import { useDispatch } from "react-redux";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser());
  }, []);

  return (
    <div className="App-Main">
      <div className="App-Background" />
      <div className="App-Content">
        <Navbar />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/admin-login" element={<AdminLogin />} />
          <Route exact path="/user-login" element={<UserLogin />} />
          <Route exact path="/admin-dashboard" element={<AdminDashboard2 />} />
          <Route exact path="/user-dashboard" element={<UserDashboard />} />
          <Route exact path="/create-user" element={<CreateUser />} />
          <Route exact path="/product/:id" element={<SingleProduct />} />
          <Route exact path="/category" element={<CategoryView />} />
          <Route exact path="/categories" element={<Categories />} />
          <Route exact path="/cart" element={<Cart />} />
          <Route exact path="/checkout" element={<Checkout />} />
          <Route exact path="/orders" element={<Orders />} />
          <Route exact path="/wishlist" element={<Wishlist />} />
          <Route exact path="/address" element={<Address />} />
          <Route exact path="/security" element={<Security />} />
          <Route exact path="/returns" element={<Returns />} />
          <Route exact path="/about" element={<About />} />
        </Routes>
        <Footer />
      </div>
    </div>
  );
};

export default App;
