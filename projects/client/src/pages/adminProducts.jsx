import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Cart } from "../components/cart";
import { ProductsByCategoryCashier } from "../components/cashier/productByCategoryCashier";
import { Back } from "../components/back";

export const AdminProducts = () => {
  const [cartItems, setCartItems] = useState([]);
  const [updatedQuantities, setUpdatedQuantities] = useState({});

  const addToCart = (newItem) => {
    const existingItemIndex = cartItems.findIndex(
      (item) => item.ProductId === newItem.ProductId
    );

    if (existingItemIndex !== -1) {
      const updatedCartItems = [...cartItems];
      updatedCartItems[existingItemIndex].quantity += newItem.quantity;
      setCartItems(updatedCartItems);
    } else {
      setCartItems((prevCartItems) => [...prevCartItems, newItem]);
    }
  };

  return (
    <Box>
      <Navbar />
      <Flex>
        <Back nav={'/cashier'} />
        <Flex justifyContent={"center"} pt={"100px"}>
          <Flex>
            <ProductsByCategoryCashier addToCart={addToCart} cartItems={cartItems} setCartItems={setCartItems} updatedQuantities={updatedQuantities} setUpdatedQuantities={setUpdatedQuantities} />
            <Flex>
              <Cart cartItems={cartItems} setCartItems={setCartItems} updatedQuantities={updatedQuantities} setUpdatedQuantities={setUpdatedQuantities} />
            </Flex>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  )
};