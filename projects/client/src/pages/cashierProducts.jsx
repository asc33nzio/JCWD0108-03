import { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Cart } from "../components/cart";
import { ProductsByCategory } from "../components/cashier/productsByCategory";
import { Back } from "../components/back";

export const CashierProducts = () => {
    const [cartItems, setCartItems] = useState([]);

    const addToCart = (item) => {
        setCartItems((prevCartItems) => [...prevCartItems, item]);
    };

    return (
        <Box>
            <Navbar />
            <Flex>
                <Back nav={'/cashier'} />
                <Flex justifyContent={"center"} pt={"100px"}>
                    <Flex >
                        <ProductsByCategory addToCart={addToCart} cartItems={cartItems} />
                        <Flex >
                            <Cart cartItems={cartItems} setCartItems={setCartItems} />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
};