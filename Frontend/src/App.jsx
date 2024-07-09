import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Navbar from './features/Navbar/Navbar'
import Home from './features/Home/Home'
import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Classes from './features/classes/Classes'
import NoteBook from './features/notebook/NoteBook'
import Student from './features/student/Student'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Home/>
      ),
    },
    {
      path: "/class",
      element:(<Classes/>),
    },
    {
      path: "/notebook",
      element:( <NoteBook/>),
    },
    {
      path: "/students",
      element:( <Student/>),
    },
    // {
    //   path: "/signup",
    //   element:( <SignupPage />),
    // },
    // {
    //   path: "/cart",
    //   element: (<Protected><CartPage /></Protected>),
    // },
    // {
    //   path: "/checkout",
    //   element: (<Protected><Checkout /></Protected>),
    // },
    // {
    //   path: "/productdetail/:id",
    //   element: (<ProductDetailPage />),
    // },
    // {
    //   path: "/ordersuccess/:id",
    //   element: (<OrderSuccessPage />),
    // },
    // {
    //   path: "/orders",
    //   element: (<Protected><UserOrdersPage /></Protected>),
    // },
    // {
    //   path: "/profile",
    //   element: (<Protected><ProfilePage></ProfilePage></Protected>),
    // },
    // {
    //   path: "/admin",
    //   element: (<AdminProtected><AdminHome/></AdminProtected>),
    // },
    // {
    //   path: "/admin/productdetail/:id",
    //   element: (<AdminProtected><AdminProdDetailPage/></AdminProtected>),
    // },
    // {
    //   path: "/admin/productdetail/:id",
    //   element: (<AdminProtected>
    //     <AdminProductFormPage/>
    //   </AdminProtected>),
    // },
    // {
    //   path: "*",
    //   element: (<PageNotFound />),
    // },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {/* <Navbar/> */}
    </>
  )
}

export default App
