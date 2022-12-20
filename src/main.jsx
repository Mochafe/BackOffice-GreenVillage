import React from 'react';
import ReactDOM from 'react-dom/client';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

//Style Import
import './assets/css/bootstrap.css';
import './assets/javascript/bootstrap.bundle';
import './assets/css/style.css'

//Routes, Loader & Action Import
import ErrorPage from './routes/error';
import App from './app';
import Home from './routes/home';
import ProductList, {loader as productListLoader} from './routes/productList';
import ProductView, {loader as productViewLoader} from './routes/productView';
import { action as productDeleteAction } from './routes/productDelete';
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
        path: "/product/list",
        element: <ProductList />,
        loader: productListLoader,
        errorElement: <h2>Product error</h2>
      },
      {
        path: "/product/:product/view",
        element: <ProductView />,
        loader: productViewLoader,
        errorElement: <h2>Product error</h2>
      },
      {
        path: "/product/:product/delete",
        action: productDeleteAction,
        errorElement: <h1>Erreur lors de la suppresion</h1>
      },
      {
        path: "/category",
        errorElement: <h1>Erruer</h1>
      },
      {
        path: "/order",
        element: <Order />
      },
      {
        path: "/account",
        element: <Account />
      },
      {
        path: "*",
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
