import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import { ProductCategory } from "../components/cashier/productsCategory"

export const Cashier = () => {
    return(
    <Box>
        <Navbar />
        <Flex justifyContent={"center"}>
            <Flex>
                <ProductCategory/>
            </Flex>
        </Flex>
    </Box>
    )
}