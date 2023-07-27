import { Box, Flex, Grid, GridItem } from "@chakra-ui/react";
import { Navigate, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import Axios from "axios";

export const AllProducts = () => {
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);


    const allProducts = async (data) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/category/1`);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        allProducts();
    }, []);

    console.log(products);

    return (
        <Flex>
            <Flex justifyContent={"center"} w={"full"} h={"100%"}>
                <Flex flexWrap={"wrap"} w={{ base: '200px', sm: '350px', md: '350px', lg: '600px' }} gap={"3"}>
                    {products.map(item => {
                        return (
                            <Box borderRadius={'8px'} h={{ base: '100px', sm: '150px', md: '200px' }} w={{ base: '80px', sm: '120px', md: '160px' }} fontSize={{ base: '10px', sm: '10px', md: '17px', lg: '20px' }} fontWeight={"bold"} color={"white"} bgColor={"yellow.600"} cursor={"pointer"} _hover={{ transform: 'scale(0.98)', transition: "0.3s" }} boxShadow={"0px 0px 5px gray"} >
                                <Box bgColor={"black"} h={"135px"} borderTopRadius={"9px"}>
                                    foto
                                </Box>
                                <Flex justifyContent={"center"} fontWeight={"thin"}>{item.productName}</Flex>
                                <Flex justifyContent={"center"}>{item.price}</Flex>
                            </Box>
                        )
                    })}
                </Flex>
            </Flex>
        </Flex>
    )
};
