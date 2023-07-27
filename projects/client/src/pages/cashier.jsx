<<<<<<< HEAD
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import { ProductCategory } from "../components/cashier/productsCategory"
import { Cart } from "../components/cart"
=======
import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { ProductCategories } from "../components/cashier/productCategories";
import { Cart } from "../components/cart";
>>>>>>> 880b7a1b42a4f61edd2b3d8c26a78a18f354bb7a

export const Cashier = () => {
    return(
    <Box>
        <Navbar />
        <Flex justifyContent={"center"} pt={"100px"}>
            <Flex >
<<<<<<< HEAD
                <ProductCategory/>
=======
                <ProductCategories/>
>>>>>>> 880b7a1b42a4f61edd2b3d8c26a78a18f354bb7a
                <Flex >
                    <Cart />
                </Flex> 
            </Flex>
        </Flex>
    </Box>
    )
}