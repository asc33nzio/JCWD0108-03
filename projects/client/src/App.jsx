import { ChakraProvider } from "@chakra-ui/react";
import { Navbar } from "./components/navbar";
import { Cashier } from "./pages/cashier";


function App() {
  return (
  <ChakraProvider>
    <Cashier />
  </ChakraProvider>
  )
}

export default App;
