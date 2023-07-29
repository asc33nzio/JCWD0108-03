import { Box, Flex } from "@chakra-ui/react";
import { useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import { Navbar } from "../components/navbar";
import { Cart } from "../components/cart";
import { ProductCategories } from "../components/admin/productCategories";

export const Cashier = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem("token");

    useEffect(() => {
        if (!token) {
            navigate('/')
        }
    }, []);
    return (
        <Box bgColor={"gray.200"} w={"100%"} h={"720px"}>
            <Navbar />
            <Flex justifyContent={"center"} pt={"100px"} bgColor={"gray.200"} w={"100%"} h={"100%"}>
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