import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import SubsRequest from './pages/SubsRequest/SubsRequest';
import { Route, createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom';

const router = createBrowserRouter (
  createRoutesFromElements (
    <>
      <Route index element={<Login/>}></Route>
      <Route path="register" element={<Register/>}></Route>
      <Route path="subsrequest" element={<SubsRequest/>}></Route>
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
