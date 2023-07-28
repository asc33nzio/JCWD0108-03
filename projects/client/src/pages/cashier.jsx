import { Box, Flex } from "@chakra-ui/react";
import { Navbar } from "../components/Navbar";
import { Cart } from "../components/Cart";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { ProductCategories } from "../components/admin/ProductCategories";

export const Cashier = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, []);
    return (
        <Box>
            <Navbar />
            <Flex justifyContent={"center"} pt={"100px"}>
                <Flex >
                    <ProductCategories />
                    <Flex >
                        <Cart />
                    </Flex>
                </Flex>
            </Flex>
        </Box>
    )
};