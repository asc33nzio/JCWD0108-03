import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { ErrorPage } from "./pages/error";
import { Navbar } from "./components/navbar";
import { Cashier } from "./pages/cashier";

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },
  { path: "/cashier", element : <Cashier />}

]);

function App() {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
