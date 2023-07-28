import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import Axios from "axios";
// import { Navbar } from "./components/Navbar";
// import { AllProducts } from "./pages/allProducts";
import { CashierList } from "./components/cashierList";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { ErrorPage } from "./pages/404";
import { Cashier } from "./pages/cashier";
import { DetailProduct } from "./pages/detailProduct";
import { CashierProducts } from "./pages/sortProducts";
import { setValue } from './redux/userSlice';

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },
  { path: "/cashier", element: <Cashier /> },
  { path: "/cashierlist", element: <CashierList /> },
  { path: "/category/:categoryId", element: <CashierProducts /> },
  { path: "/product/:id", element: <DetailProduct /> }
]);

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const keepLogin = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/api/users/keeplogin`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        dispatch(setValue(response.data));
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    keepLogin();
  }, [dispatch, token]);

  return (
    <RouterProvider router={router} />
  )
};

export default App;
