import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./Login"
import SignUp from "./Signup";
import Home from "./Home";
import UpdateMenu from "./UpdateMenu";
import Menu from "./Menu";
import Cart from "./Cart"
import Orders from "./Orders";
import Account from "./Account";
import ManageOrders from "./ManageOrders";

function App() {
  return (
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/update-menu" element={<UpdateMenu />} />
          <Route path="/menu" element={<Menu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/account" element={<Account />} />
          <Route path="/manage-orders" element={<ManageOrders />} />
        </Routes>
      </Router>    
  );
}

export default App;
