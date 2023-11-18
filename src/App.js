import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import './App.css';
import "react-toastify/dist/ReactToastify.css"

import CheckoutSuccess from './components/CheckoutSuccess';

import NavBar from "./components/NavBar";
import Cart from "./components/Cart";
import Home from "./components/Home";
import NotFound from "./components/NotFound";

/*Extra pages */
import Gallery from "./components/Gallery";
import Articles from "./components/Articles";
import About from "./components/About";
import Contact from "./components/Contact";
import Events from "./components/Events";

import Dashboard from "./components/admin/Dashboard";
import Orders from "./components/admin/Orders";
import UserProfile from "./components/Details/UserProfile";
import Order from "./components/Details/Order";
import Product from "./components/Details/Product";
import Socials from "./components/admin/Socials";
import Calendar from "./components/admin/Calendar";
import Products from "./components/admin/Products";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/authSlice";
import ProductsList from "./components/admin/list/ProductsList";
import Users from "./components/admin/Users";

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
          <Route path="/" element={<Home />} />
          <Route path='/checkout-success' element={<CheckoutSuccess />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/gallery" element={< Gallery/>} />
          <Route path="/events" element={< Events/>} />
          <Route path="/articles" element={< Articles/>} />
          <Route path="/about" element={< About />} />
          <Route path="/contact" element={< Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/order/:id' element={<Order />} />
          <Route path='/user/:id' element={<UserProfile />} />
          <Route path='/admin' element={<Dashboard />}>
            <Route path='products' element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path='create-product' element={<CreateProduct />} />
              </Route>
            <Route path='summary' element={<Summary />} />
            <Route path='users' element={<Users />} />
            <Route path='orders' element={<Orders />} />
            <Route path='socials' element={<Socials />} />
            <Route path='calendar' element={<Calendar />} />
          </Route>
          <Route path="*" element={<NotFound />} />
        </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
