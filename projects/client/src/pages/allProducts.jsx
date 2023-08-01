import Axios from "axios"
import { Box, Flex, Input, Radio, RadioGroup, Stack, Text } from "@chakra-ui/react"
import { useEffect, useState } from "react"
import { AllProducts } from "./allProducts"

export const SearchProduct = () => {
    const [products, setProducts] = useState([])
    const token = localStorage.getItem("token")

    const Products = async () => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/all`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            setProducts(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }
    console.log(products);
    useEffect(() => {
        Products();
    }, [])
    return(
        <Flex wrap={"wrap"} p={"100px"} h={"100px"} w={"100px"}>
            {products?.map((data) => {
                <Box zIndex={"99"} w={"1000px"} h={"1000px"} color={"white"} bgColor={"black"}>
                    {data?.productName}
                </Box>
            })}
        </Flex>
    )
};