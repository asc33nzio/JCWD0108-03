import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { ProductCategories } from "../components/cashier/productCategories";
import { Cart } from "../components/cart";
import { AllProducts } from "../components/cashier/productsByCategory";

export const CashierProducts = () => {
    return(
    <Box>
        <Navbar />
        <Flex justifyContent={"center"} pt={"100px"}>
            <Flex >
                <AllProducts/>
                <Flex >
                    <Cart />
                </Flex> 
            </Flex>
        </Flex>
    </Box>
    )
}