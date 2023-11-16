import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SubsRequest from './pages/SubsRequest/SubsRequest';
import ManagePodcast from './pages/ManagePodcast/ManagePodcast';
import Profile from './pages/Profile/Profile';
import { Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';
import { JSX } from 'react';
import { getRole } from './utils/auth';
import Feedback from './pages/Feedback/Feedback';


type CustomRoute = {
  path: string;
  children: JSX.Element;
  role: string;
}

const ProtectedRoute = ({
  path,
  children,
  role,
}: CustomRoute): JSX.Element => {
  // Check if a JWT token exists in local storage. If not, redirect to the login page.
  if (localStorage.getItem("token") === null) {
    if (path === "/login" || path === "/register") {
      return children;
    } else {
      return (
        <>
          <Navigate to="/login" />;
        </>
      );
    }
  } else {
    let userRole = getRole();
    if (userRole === role) {
      return children; //
    } else {
      if (userRole === "user") {
        return (
          <>
            <Navigate to="/manage-podcast" />;
          </>
        );
      } 

      if (userRole === "admin") {
        return (
          <>
            <Navigate to="/subsrequest" />;
          </>
        );
      }
      return <Navigate to="/notfound" />;
    }
  } 
}

const router = createBrowserRouter (
  
  createRoutesFromElements (
    <>
      <Route index element={ <Navigate to="login" /> }></Route>
      {/* <Route path="login" element={<Login/>}></Route> */}
      <Route
        path="/register"
        element={
          <ProtectedRoute role={""} path="/register">
            <Register />
          </ProtectedRoute>
        }
      />
      <Route
        path="/login"
        element={
          <ProtectedRoute role={""} path="/login">
            <Login />
          </ProtectedRoute>
        }
      />
      <Route
        path="/manage-podcast"
        element={
          <ProtectedRoute role={"user"} path="/manage-podcast">
            <ManagePodcast />
          </ProtectedRoute>
        }
      />
      <Route
        path="/subsrequest"
        element={
          <ProtectedRoute role={"admin"} path="/subsrequest">
            <SubsRequest />
          </ProtectedRoute>
        }
      />
      <Route
        path="/feedback"
        element={
          <ProtectedRoute role={"user"} path="/feedback">
            <Feedback />
          </ProtectedRoute>
        }
      />
      <Route
        path="/profile"
        element={
          <ProtectedRoute role={"user"} path="/profile">
            <Profile />
          </ProtectedRoute>
        }
      />
    </>
  )
)

export default function App() {
  return (
    <>
      <RouterProvider router={router}/>
    </>
  );
}
