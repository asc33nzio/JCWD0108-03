import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { ErrorPage } from "./pages/404";
import { Navbar } from "./components/navbar";
import { Cashier } from "./pages/cashier";
import { CashierList } from "./components/cashierList";
import { AllProducts } from "./pages/allProducts";

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },
  { path: "/cashier", element : <Cashier />},
  { path: "/cashierlist", element : <CashierList />},
  { path: "/AllProducts", element : <AllProducts />}
<<<<<<< HEAD


=======
>>>>>>> 880b7a1b42a4f61edd2b3d8c26a78a18f354bb7a
]);

function App() {
  return (
    <RouterProvider router={router} />
  )
}

export default App;
