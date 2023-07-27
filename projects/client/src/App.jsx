import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { Cashier } from "./pages/cashier";
import { CashierList } from "./pages/cashierList";
import { ErrorPage } from "./pages/404";

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },
  { path: "/cashier", element: <Cashier /> },
  { path: "/cashierlist", element: <CashierList /> }

]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
