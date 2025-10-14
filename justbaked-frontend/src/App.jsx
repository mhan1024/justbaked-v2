import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './pages/Home';
import Menu from "./pages/Menu";
import UpdateMenu from "./pages/UpdateMenu";
import ManageOrders from "./pages/ManageOrders";
import Account from "./pages/Account";
import Login from "./pages/Login";
import SignUp from "./pages/Signup";
import Cart from "./pages/Cart";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/update-menu" element={<UpdateMenu />} />
        <Route path="/manage-orders" element={<ManageOrders />} />
        <Route path="/account" element={<Account />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
  )
}

export default App
