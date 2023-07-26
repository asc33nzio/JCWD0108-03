import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { ErrorPage } from "./pages/error";
import { Navbar } from "./components/navbar";
import { Cashier } from "./pages/cashier";
import { CashierList } from "./components/cashierList";

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },
<<<<<<< HEAD
  { path: "/cashier", element : <Cashier />}
=======
  { path: "/cashier", element : <Cashier />},
  { path: "/cashierlist", element : <CashierList />}
>>>>>>> c1b1038597e991bf40bcc7265e26d52be3b57d06

]);

function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App;
