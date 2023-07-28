import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Cart } from "../components/Cart";
import { AllProducts } from "../components/cashier/ProductsByCategory";
import { Back } from "../components/Back";

export const CashierProducts = () => {
    return (
        <Box>
            <Navbar />
            <Flex>
                <Back nav={'/cashier'} />
                <Flex justifyContent={"center"} pt={"100px"}>
                    <Flex >
                        <AllProducts />
                        <Flex >
                            <Cart />
                        </Flex>
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
};