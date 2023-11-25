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
import ForGallery from "./components/ForGallery";
import ForArticles from "./components/ForArticles";
import About from "./components/About";
import Contact from "./components/Contact";
import Posters from "./components/Posters";

import Dashboard from "./components/admin/Dashboard";
import Orders from "./components/admin/Orders";
import UserProfile from "./components/Details/UserProfile";
import Order from "./components/Details/Order";
import Product from "./components/Details/Product";
import Event from "./components/Details/Event";
import Article from "./components/Details/Article";
import Gallery from "./components/Details/Gallery";
import Socials from "./components/admin/Socials";
import Calendar from "./components/admin/Calendar";
import Products from "./components/admin/Products";
import Articles from "./components/admin/Articles";
import Events from "./components/admin/Events";
import Galleries from "./components/admin/Galleries";
import Summary from "./components/admin/Summary";
import CreateProduct from "./components/admin/CreateProduct";
import CreateEvent from "./components/admin/CreateEvent";
import CreateGallery from "./components/admin/CreateGallery";
import CreateArticle from "./components/admin/CreateArticle";
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { loadUser } from "./features/authSlice";
import ProductsList from "./components/admin/list/ProductsList";
import GalleriesList from "./components/admin/list/GalleriesList";
import EventsList from "./components/admin/list/EventsList";
import ArticlesList from "./components/admin/list/ArticlesList";
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
          <Route path="/forgallery" element={< ForGallery/>} />
          <Route path="/posters" element={< Posters/>} />
          <Route path="/forarticles" element={< ForArticles/>} />
          <Route path="/about" element={< About />} />
          <Route path="/contact" element={< Contact />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/product/:id' element={<Product />} />
          <Route path='/event/:id' element={<Event />} />
          <Route path='/gallery/:id' element={<Gallery />} />
          <Route path='/article/:id' element={<Article />} />
          <Route path='/order/:id' element={<Order />} />
          <Route path='/user/:id' element={<UserProfile />} />
          <Route path='/admin' element={<Dashboard />}>
            <Route path='products' element={<Products />}>
              <Route index element={<ProductsList />} />
              <Route path='create-product' element={<CreateProduct />} />
            </Route>
            <Route path='events' element={<Events />} >
              <Route index element={<EventsList />} />
              <Route path='create-event' element={<CreateEvent />} />
            </Route>
            <Route path='articles' element={<Articles />} >
              <Route index element={<ArticlesList />} />
              <Route path='create-article' element={<CreateArticle />} />
            </Route>
            <Route path='galleries' element={<Galleries />} >
              <Route index element={<GalleriesList />} />
              <Route path='create-gallery' element={<CreateGallery/>} />
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
