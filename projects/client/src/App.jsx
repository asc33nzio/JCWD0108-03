import Axios from "axios";
import { useEffect } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useDispatch } from "react-redux";
import { CashierList } from "./pages/cashierList";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { ErrorPage } from "./pages/404";
import { Cashier } from "./pages/cashier";
import { DetailProduct } from "./pages/detailProduct";
import { CashierProducts } from "./pages/cashierProducts";
import { setValue } from './redux/userSlice';
import { Search } from "./pages/search";
import { Profile } from "./pages/profile";
import { ResetPassword } from "./pages/resetPassword";

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },
  { path: "/cashier", element: <Cashier /> },
  { path: "/cashierlist", element: <CashierList /> },
  { path: "/category/:categoryId", element: <CashierProducts /> },
  { path: "/product/:id", element: <DetailProduct /> },
  { path: "/search", element: <Search /> },
  { path: "/profile", element: <Profile /> },
  { path: "/resetpassword", element: <ResetPassword /> },
]);

function App() {
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  useEffect(() => {
    const keepLogin = async () => {
      try {
        const response = await Axios.get(`http://localhost:8000/api/users/keeplogin`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        dispatch(setValue(response.data));
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