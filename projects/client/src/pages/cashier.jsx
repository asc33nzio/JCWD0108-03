import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import { ProductCategory } from "../components/cashier/productsCategory"
import { Cart } from "../components/cart"
import { useEffect } from "react"
import {useNavigate} from 'react-router-dom'

export const Cashier = () => {
    const navigate = useNavigate()
    const token = localStorage.getItem("token")
    
    // useEffect(() => {
    //     if (!token) {
    //         navigate('/')
    //     }
    // }, []);
    return(
    <Box>
        <Navbar />
        <Flex justifyContent={"center"} pt={"100px"}>
            <Flex >
                <ProductCategory/>
                <Flex >
                    <Cart />
                </Flex> 
            </Flex>
        </Flex>
    </Box>
    )
}