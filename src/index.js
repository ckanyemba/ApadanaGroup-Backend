import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";

import productsReducer, { productsFetch } from "./features/productsSlice";
import { productsApi } from './features/productsApi';
import { articlesApi } from './features/articlesApi';
import { galleriesApi } from './features/galleriesApi';
import { eventsApi } from './features/eventsApi';
import cartReducer, {getTotals} from "./features/cartSlice";
import authReducer, { loadUser } from "./features/authSlice";
import ordersSlice from "./features/ordersSlice";
import usersSlice from "./features/usersSlice";
import articlesReducer, { articlesFetch } from './features/articlesSlice';
import galleriesReducer, { galleriesFetch } from './features/galleriesSlice';
import eventsReducer, { eventsFetch } from './features/eventsSlice';

const store = configureStore({
  reducer: {
    products: productsReducer,
    articles: articlesReducer,
    galleries: galleriesReducer,
    events: eventsReducer,
    orders: ordersSlice,
    users: usersSlice,
    cart: cartReducer,
    auth: authReducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [articlesApi.reducerPath]: articlesApi.reducer,
    [galleriesApi.reducerPath]: galleriesApi.reducer,
    [eventsApi.reducerPath]: eventsApi.reducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(productsApi.middleware, articlesApi.middleware,  galleriesApi.middleware, eventsApi.middleware);
  },
});

store.dispatch(productsFetch());
store.dispatch(eventsFetch());
store.dispatch(articlesFetch());
store.dispatch(galleriesFetch());
store.dispatch(getTotals());
store.dispatch(loadUser(null));

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Provider store = {store}>
      <App />
      </Provider>
  </React.StrictMode>
);

