import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { ProductCategories } from "../components/cashier/productCategories";
import { Cart } from "../components/cart";

export const Cashier = () => {
    return(
    <Box>
        <Navbar />
        <Flex justifyContent={"center"} pt={"100px"}>
            <Flex >
                <ProductCategories/>
                <Flex >
                    <Cart />
                </Flex> 
            </Flex>
        </Flex>
    </Box>
    )
}