import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
<<<<<<< HEAD
import { Cashier } from "./pages/cashier";
import { CashierList } from "./pages/cashierList";
import { ErrorPage } from "./pages/404";
=======
import { ErrorPage } from "./pages/404";
import { Navbar } from "./components/navbar";
import { Cashier } from "./pages/cashier";
import { CashierList } from "./components/cashierList";
import { AllProducts } from "./pages/allProducts";
>>>>>>> d015784a97110c70728aff9ba1d86b1a6605c263

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },
<<<<<<< HEAD
  { path: "/cashier", element: <Cashier /> },
  { path: "/cashierlist", element: <CashierList /> }
=======
  { path: "/cashier", element : <Cashier />},
  { path: "/cashierlist", element : <CashierList />},
  { path: "/AllProducts", element : <AllProducts />}

>>>>>>> d015784a97110c70728aff9ba1d86b1a6605c263

]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
