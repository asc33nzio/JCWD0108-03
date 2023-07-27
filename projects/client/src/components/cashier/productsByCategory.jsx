import { Box, Button, Flex, Grid, GridItem, Image } from "@chakra-ui/react"
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import Axios from "axios";

export const AllProducts = () => {
    const params = useParams()
    const navigate = useNavigate()
    const [products, setProducts] = useState([])


    const allProducts = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/category/${params.categoryId}`)
            setProducts(response.data)
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        allProducts()
    }, [])

    console.log(products);

    return (
        <Flex>
            <Flex justifyContent={"center"} w={"full"}>
                <Flex flexWrap={"wrap"} w={{ base: '200px', sm: '350px', md: '350px', lg: '600px' }} gap={"3"}>
                    {products.map(item => {
                        return (
                            <Box >
                                <Box borderTopRadius={'8px'} h={{ base: '100px', sm: '150px', md: '200px' }} w={{ base: '80px', sm: '120px', md: '160px' }} fontSize={{ base: '10px', sm: '10px', md: '17px', lg: '20px' }} fontWeight={"bold"} color={"white"} bgColor={"yellow.600"} cursor={"pointer"} _hover={{ transform: 'scale(1.02)', transition: "0.3s" }} >
                                    <Box h={"135px"} borderTopRadius={"9px"}>
                                        <Image src={item.imgURL} />
                                        <Flex justifyContent={"center"} fontWeight={"thin"}>{item.productName}</Flex>
                                        <Flex justifyContent={"center"}>{item.price}</Flex>
                                    </Box>
                                </Box>
                                <Flex w={{ base: '80px', sm: '120px', md: '160px' }} p={"10px"} alignItems={"center"} bgColor={"#FFC900"} color={"white"} borderBottomRadius={"10px"} justifyContent={"space-around"}>
                                    <Flex justifyContent={"center"} align={"center"} fontSize={{base:'7px', md:'15px'}} p={{base:'3px', sm:'5px', md:'7px'}} cursor={"pointer"} _active={{bgColor:'yellow.500'}} transition={"0.3s"} borderRadius={"5px"} bgColor={"white"} color={"#FFC900"}>Add</Flex>
                                    <Flex justifyContent={"center"} align={"center"} fontSize={{base:'7px', md:'15px'}} p={{base:'3px', sm:'5px', md:'7px'}} cursor={"pointer"} _active={{bgColor:'yellow.500'}} transition={"0.3s"} borderRadius={"5px"} bgColor={"white"} color={"#FFC900"}>detail</Flex>
                                </Flex>
                            </Box>
                        )
                    })}
                </Flex>
            </Flex>
        </Flex>
    )
}
