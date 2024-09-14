import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { createRoot } from "react-dom/client";

import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Link,
} from "react-router-dom";

import Hero from './pages/Hero/Hero'
import Login from './features/auth/components/login/Login'
import Signup from './features/auth/components/signup/Signup'
import PageNotFound from './pages/PageNotFound'

// import TeacherNavbar from './features/teacher/Navbar/Navbar'
import TeacherHome from './features/teacher/Home/Home'
import TeacherClasses from './features/teacher/classes/Classes'
import TeacherNoteBook from './features/teacher/notebook/NoteBook'
import TeacherStudent from './features/teacher/student/Student'
import TeacherLesson from './features/teacher/lesson/Lesson'
import TeacherGroup from './features/teacher/groups/Group'
import TeacherLiveLesson from './features/teacher/livelesson/LiveLesson'

// import StudentNavbar from './features/student/Navbar/Navbar'
import StudentHome from './features/student/Home/Home'
import StudentLiveExercise from './features/student/LiveExercise/LiveExercise'
import StudentNotebook from './features/student/Notebook/Notebook'

// import AdminNavbar from './features/admin/Navbar/Navbar'
import AdminHome from './features/admin/Home/Home'
import AdminDashboard from './features/admin/Dashboard/Dashboard'
import AdminChartViewer from './features/admin/ChartViewer/ChartViewer'
import Protected from './features/auth/components/protected';
import { useDispatch } from 'react-redux';
import { fetchUserAsync } from './features/auth/authSlice';
import Mydeita from './features/teacher/mydeita/Mydeita';


function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <Hero />
      ),
    },
    {
      path: "/teacher/login",
      element: (
        <Login />
      ),
    },
    {
      path: "/student/login",
      element: (
        <Login />
      ),
    },
    {
      path: "/admin/login",
      element: (
        <Login />
      ),
    },
    {
      path: "/signup",
      element: (
        <Signup />
      )
    },
    {
      path: "/teacher",
      element: (
        <Protected>
          <TeacherHome />
        </Protected>
      ),
    },
    {
      path: "/teacher/class",
      element: (
        <Protected>
          <TeacherClasses />
        </Protected>)
    },
    {
      path: "/teacher/notebook",
      element: (
        <Protected>
          <TeacherNoteBook />
        </Protected>
      ),
    },
    {
      path: "/teacher/students",
      element: (
        <Protected>
          <TeacherStudent />
        </Protected>
      ),

    },
    {
      path: "/teacher/lesson",
      element: (
        <Protected>
          <TeacherLesson />
        </Protected>
      ),
    },
    {
      path: "/teacher/groups",
      element: (
        <Protected><TeacherGroup />
        </Protected>),
    },
    {
      path: "/teacher/livelesson",
      element: (<Protected><TeacherLiveLesson /></Protected>),
    },
    {
      path: "/teacher/mydeita",
      element: (<Protected><Mydeita/></Protected>),
    },
    {
      path: "/student",
      element: (<StudentHome />),
    },
    {
      path: "/student/live",
      element: (<StudentLiveExercise />),
    },
    {
      path: "/student/notebook",
      element: (<StudentNotebook />),
    },
    {
      path: "/admin",
      element: (<AdminHome />),
    },
    {
      path: "/admin/dashboard",
      element: (<AdminDashboard />),
    },
    {
      path: "/admin/chartviewer",
      element: (<AdminChartViewer />),
    },
    // {
    //   path: "/admin/productdetail/:id",
    //   element: (<AdminProtected>
    //     <AdminProductFormPage/>
    //   </AdminProtected>),
    // },
    {
      path: "*",
      element: (<PageNotFound />),
    },
  ]);
  const dispatch = useDispatch()
  useEffect(() => {
    console.log("dispatching fetch user");
    dispatch(fetchUserAsync());
  }, [dispatch])

  return (

    <>
      <RouterProvider router={router} />
      {/* <Navbar/> */}
    </>
  )
}

export default App
