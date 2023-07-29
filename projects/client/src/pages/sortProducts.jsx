import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Cart } from "../components/cart";
import { ProductsByCategory } from "../components/cashier/productsByCategory";
import { Back } from "../components/back";

export const CashierProducts = () => {
    return (
        <Box>
            <Navbar />
            <Flex>
                <Back nav={'/cashier'} />
                <Flex justifyContent={"center"} pt={"100px"}>
                    <Flex >
                        <ProductsByCategory />
                        <Flex >
                            <Cart />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
};