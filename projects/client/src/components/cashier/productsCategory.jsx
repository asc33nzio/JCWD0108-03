import { Box, Flex, Grid, GridItem } from "@chakra-ui/react"
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import Axios from "axios"

export const ProductCategory = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])

    const category = async () => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/categories`)
            setCategories(response)
            console.log(response);
        } catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        category()
    }, [])

    return (
        <Flex>
            <Flex justifyContent={"center"} pt={"100px"} w={"full"} h={"100vh"}>
                <Box>
                    <Grid templateColumns={'repeat(3, 1fr)'} gap={'5'}>
                        <GridItem w={"200px"} borderRadius={'8px'} h={"230px"} display={"flex"} lineHeight={"100px"} justifyContent={"center"} pt={"30px"} color={"white"} bgColor={"#FFC900"} cursor={"pointer"} _hover={{ transform: 'scale(0.98)', transition: "0.3s" }} boxShadow={"0px 0px 5px gray"}></GridItem>
                    </Grid>
                </Box>
            </Flex>
        </Flex>
    )
};