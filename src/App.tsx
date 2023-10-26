import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SubsRequest from './pages/SubsRequest/SubsRequest';
import { Route, Navigate, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter (
  createRoutesFromElements (
    <>
      <Route index element={ <Navigate to="login" /> }></Route>
      <Route path="register" element={<Register/>}></Route>
      <Route path="subsrequest" element={<SubsRequest/>}></Route>
      <Route path="login" element={<Login/>}></Route>
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
