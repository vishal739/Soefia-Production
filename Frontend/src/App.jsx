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
import Lesson from './features/lesson/Lesson'
import Group from './features/groups/Group'
import Hero from './pages/Hero/Hero'
import Login from './features/auth/components/login/Login'
import Classlist from './features/classList/Classlist'
import PageNotFound from './pages/PageNotFound'
import LiveLesson from './features/livelesson/LiveLesson'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Hero/>
      ),
    },
    {
      path: "/teacher/:id",
      element: (
        <Home/>
      ),
    },
    {
      path: "/teacher",
      element: (
        <Login/>
      ),
    },
    // {
    //   path: "/class",
    //   element: (
    //     <Classlist/>
    //   )
    // },
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
    {
      path: "/lesson",
      element:( <Lesson/>),
    },
    {
      path: "/groups",
      element: (<Group/>),
    },
    {
      path: "/livelesson",
      element: (<LiveLesson/>),
    },
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
    {
      path: "*",
      element: (<PageNotFound/>),
    },
  ]);
  return (
    <>
      <RouterProvider router={router} />
      {/* <Navbar/> */}
    </>
  )
}

export default App
