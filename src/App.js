import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import "react-toastify/dist/ReactToastify.css"

import CheckoutSuccess from './components/CheckoutSuccess';

import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

import Dashboard from "./components/admin/Dashboard";
import Products from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(loadUser(null));
  }, [dispatch]);

  return (
    <div className="App">
      <Router>
        <ToastContainer />
        <NavBar />
        <div className="content-container">
        <Routes>
          <Route path="/cart" element={<Cart />} />
          <Route path="/" element={<Home />} />
          <Route path='/register' element={<Register />} />
          <Route path='/admin' element={<Dashboard />}>
            <Route path='products' element={<Products />}>
              <Route path='create-product' element={<CreateProduct />} />
              </Route>
            <Route path='summary' element={<Summary />} />
          </Route>
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path='/login' element={<Login />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
