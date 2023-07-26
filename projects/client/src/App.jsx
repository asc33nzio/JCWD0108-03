<<<<<<< HEAD
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Login } from "./pages/login";
import { Forgot } from "./pages/forgot";
import { ErrorPage } from "./pages/Error";
=======
import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/navbar";
import { Cashier } from "./pages/cashier";
>>>>>>> 3ffa5964cc67f87266e45c7b1681fb3a8216f803

const router = createBrowserRouter([
  { path: "/", element: <Login />, errorElement: <ErrorPage /> },
  { path: "/forgot", element: <Forgot />, },

]);

function App() {
  return (
<<<<<<< HEAD
    <div>
      <RouterProvider router={router} />
    </div>
=======
  <ChakraProvider>
    <Cashier />
  </ChakraProvider>
>>>>>>> 3ffa5964cc67f87266e45c7b1681fb3a8216f803
  )
}

export default App;
