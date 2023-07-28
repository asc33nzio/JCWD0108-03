import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { ErrorPage } from "./pages/404";
import { Navbar } from "./components/navbar";
import { Cashier } from "./pages/cashier";
import { CashierList } from "./components/cashierList";
import { AllProducts } from "./pages/allProducts";
import { useDispatch } from "react-redux";
import { setValue } from './redux/userSlice';
import { useEffect } from "react";
import  Axios  from "axios";

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },
  { path: "/cashier", element: <Cashier /> },
  { path: "/cashierlist", element: <CashierList /> },
  { path: "/category/:categoryId", element: <CashierProducts /> },
  { path: "/product/:id", element: <DetailProduct />}
]);


function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();
  const keepLogin = async () => {
    try {
      const response = await Axios.get(`http://localhost:8000/api/users/keeplogin`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      dispatch(setValue(response.data));
      console.log(response.data);
    }
    catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    keepLogin();
  }, []);
  return (
   <RouterProvider router={router} />
  )
}

export default App;
