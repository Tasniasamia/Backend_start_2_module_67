import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./index.css";
import User from './Component/User';

const router = createBrowserRouter([
  {
    path: "user",
    element:<App></App>,
  }
  ,{
    path:"/user/:id",
    element:<User></User>,
    loader:({params})=>fetch(`http://localhost:2300/user/${params.id}`)
  }
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);