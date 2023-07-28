import { Box, Button, Flex, FormControl, FormLabel, Grid, GridItem, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react"
import { Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import Axios from "axios";
import { AddIcon, PlusSquareIcon } from "@chakra-ui/icons";
import { AddCategory } from "../addCategory";

export const ProductCategoryAdmin = () => {
    const navigate = useNavigate()
    const [categories, setCategories] = useState([])
    const { onClose, onOpen, isOpen } = useDisclosure()


    const category = async (data) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/categories`, data)
            setCategories(response.data.result)
        } catch (error) {
            console.log(error);
        }
    }

    const handleClick = (id) => {
        navigate(`/category/${id}`)
    }

    useEffect(() => {
        category()
    }, [])


    return (
        <Flex>
            <Flex justifyContent={"center"} w={"full"} h={"100%"}>
                <Box>
                    <Grid templateColumns={{ base: 'repeat(2, 1fr)', sm: 'repeat(2, 1fr)', md: 'repeat(2, 1fr)', lg: 'repeat(3, 1fr)' }} gap={'5'}>
                        {categories.map(item => {
                            return (
                                <GridItem borderRadius={'8px'} h={{ base: '100px', sm: '150px', md: '180px' }} w={{ base: '80px', sm: '120px', md: '160px' }} display={"flex"} lineHeight={{ base: '40px', sm: '110px', md: '100px' }} fontSize={{ base: '10px', sm: '10px', md: '17px', lg: '20px' }} fontWeight={"bold"} justifyContent={"center"} pt={"30px"} color={"white"} bgColor={"yellow.600"} cursor={"pointer"} _hover={{ transform: 'scale(0.98)', transition: "0.3s" }} boxShadow={"0px 0px 5px gray"} onClick={() => handleClick(item.id)}>{item.category}</GridItem>
                            )
                        })}
                        <AddCategory />
                    </Grid>
                </Box>
            </Flex>
        </Flex>
    )
}