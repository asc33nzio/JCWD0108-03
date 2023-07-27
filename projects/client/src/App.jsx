import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { ErrorPage } from "./pages/404";
import { Navbar } from "./components/navbar";
import { Cashier } from "./pages/cashier";
import { CashierList } from "./components/cashierList";
import { CashierProducts } from "./pages/sortProducts";

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },
  { path: "/cashier", element : <Cashier />},
  { path: "/cashierlist", element : <CashierList />},
  { path: "/category/:categoryId", element : <CashierProducts />}
]);

function App() {
  return (
   <RouterProvider router={router} />
  )
}

export default App;
