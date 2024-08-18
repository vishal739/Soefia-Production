import { useEffect, useState } from 'react'
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
import Signup from './features/auth/components/signup/Signup'
import { useDispatch } from 'react-redux'
import { fetchUserAsync } from './features/auth/authSlice'
function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Hero/>
      ),
    },
    {
      path: "/teacher",
      element: (
        <Home/>
      ),
    },
    {
      path: "/login",
      element: (
        <Login/>
      ),
    },
    {
      path: "/signup",
      element: (
        <Signup/>
      )
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
  const dispatch= useDispatch();
    
  return (
    
    <>
      <RouterProvider router={router} />
      {/* <Navbar/> */}
    </>
  )
}

export default App
