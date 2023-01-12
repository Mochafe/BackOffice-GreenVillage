import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Style Import
import './assets/css/bootstrap.css';
import './assets/javascript/bootstrap.bundle.js';
import './assets/css/style.css'

//Routes, Loader & Action Import
import ErrorPage from './routes/error';
import App from './app';
import Home from './routes/home/home';
import ProductList, { loader as productListLoader } from './routes/product/productList';
import ProductNew, { loader as productNewLoader, action as productNewAction } from './routes/product/productNew';
import ProductView, { loader as productViewLoader } from './routes/product/productView';
import ProductEdit, { loader as productEditLoader, action as productEditAction} from './routes/product/productEdit';
import { action as productDeleteAction } from './routes/product/productDelete';
import CategoryList, { loader as categoriesLoader } from './routes/category/categoryList';
import CategoryNew, { loader as categoriesNewLoader, action as categoriesNewAction} from './routes/category/categoryNew';
import { action as categoriesDeleteAction } from "./routes/category/categoryDelete";
import Order from './routes/order';
import Account from './routes/account';


//Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <Home />,
        errorElement: <ErrorPage />
      },
      {
        path: "/product/new",
        element: <ProductNew />,
        loader: productNewLoader,
        action: productNewAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/product/list",
        element: <ProductList />,
        loader: productListLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/product/:product/view",
        element: <ProductView />,
        loader: productViewLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/product/:product/edit",
        element: <ProductEdit />,
        loader: productEditLoader,
        action: productEditAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/product/:product/delete",
        action: productDeleteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/category/list",
        element: <CategoryList />,
        loader: categoriesLoader,
        errorElement: <ErrorPage />,
      },
      {
        path: "/category/new",
        element: <CategoryNew />,
        loader: categoriesNewLoader,
        action: categoriesNewAction,
        errorElement: <ErrorPage />
      },
      {
        path: "/category/:category/delete",
        action: categoriesDeleteAction,
        errorElement: <ErrorPage />,
      },
      {
        path: "/order",
        element: <Order />,
        errorElement: <ErrorPage />,
      },
      {
        path: "/account",
        element: <Account />,
        errorElement: <ErrorPage />,

      },
      {
        path: "*",
        element: <ErrorPage />,
        errorElement: <ErrorPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
