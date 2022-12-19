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

//Router
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,

      },
      {
        path: "/product/list",
        element: <ProductList />,
        loader: productListLoader,
        errorElement: <h2>Product error</h2>
      },
      {
        path: "*",
        element: <ErrorPage />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
)
