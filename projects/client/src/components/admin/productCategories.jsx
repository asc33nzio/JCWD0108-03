import Axios from "axios";
import { Box, Button, Flex, Image } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { AddCategory } from "./addCategory";
import { useSelector } from "react-redux";
import { DeleteIcon } from "@chakra-ui/icons";

export const ProductCategories = ({ cartItems, setCartItems }) => {
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1);
    const [categories, setCategories] = useState([]);
    const [loadingCartUpdate, setLoadingCartUpdate] = useState(false);
    const user = useSelector((state) => state.user.value.isAdmin)
    const navigate = useNavigate();

    const category = async (page) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/categories?page=${page}`)
            setCategories(response.data.result)
            setPage(response.data.page);
            setTotalPage(response.data.totalPage);
        } catch (error) {
            console.log(error);
        };
    };
    
    const deleteCategory = async (id) => {
        try {
            const response = await Axios.patch(`http://localhost:8000/api/products/deleteCategory`, {categoryId: id})
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }

    const getCartByUser = async () => {
        try {
            setLoadingCartUpdate(true);
            const token = localStorage.getItem('token');
            const response = await Axios.get('http://localhost:8000/api/cart', {
                headers: { Authorization: `Bearer ${token}` }
            });
            const cartItems = response.data.result;
            setCartItems(cartItems);
            setLoadingCartUpdate(false);
        } catch (error) {
            setLoadingCartUpdate(false);
            console.error(error);
        };
    };

    const nextPage = () => {
        if (page < totalPage) {
            setPage((prevPage) => Math.max(+prevPage + 1, 1));
        };
    };

    const prevPage = () => {
        if (page > 1) {
            setPage((prevPage) => Math.max(+prevPage - 1, 1));
        };
    };

    const handleClick = (id) => {
        if (user) {
            navigate(`/categoryAdmin/${id}`);
        } else {
            navigate(`/categoryCashier/${id}`)
        }
    };


    useEffect(() => {
        category(page);
        getCartByUser();
    }, [loadingCartUpdate, page]);

    return (
        <Flex ml={{ base: "0px", sm: "100px" }}>
            <Box justifyContent={"center"} w={{ base: "200px", sm: "400px", md: "450px", lg: "600px" }} h={"110%"}>
                <Flex blur={"10px"} wrap={"wrap"} gap={{ base: "3", sm: "5" }} >
                    {categories.map(item => {
                        return (
                            <Flex key={item.id} wrap={"wrap"} borderRadius={'8px'} h={{ base: '70px', sm: '150px', md: '180px' }} w={{ base: '70px', sm: '120px', md: '160px' }} fontSize={{ base: '10px', sm: '10px', md: '17px', lg: '20px' }} fontWeight={"bold"} justifyContent={"center"} cursor={"pointer"} boxShadow={"0px 0px 5px gray"}>
                                <Box w={{ base: '70px', sm: '120px', md: '160px' }} h={{ base: '70px', sm: '150px', md: '180px' }} position={"absolute"} zIndex={"5"} color={"gray.200"} textShadow={"0px 0px 20px white"}>
                                    <Flex p={"5px"}>
                                        {user ? (<Flex onClick={() => deleteCategory(item.id)} borderRadius={"7px"} bgColor={"white"} align={"center"} justifyContent={"center"} w={"30px"} h={"30px"} _hover={{ transform: "scale(1.1)", transition: "0.3s" }}>
                                            <DeleteIcon size={"20px"} color={"red.500"} />
                                        </Flex>) : (null)}
                                    </Flex>
                                    <Flex onClick={() => handleClick(item.id)} color={'red.200'} fontSize={'19px'} fontFamily={'monospace'} fontWeight={'strong'} _hover={{ transform: 'scale(0.98)', transition: "0.3s" }} justifyContent={"center"} lineHeight={{ base: '60px', sm: '140px', md: '170px' }}>
                                        {item.category}
                                    </Flex>
                                </Box>
                                <Image position={"relative"} h={{ base: '70px', sm: '150px', md: '180px' }} w={{ base: '70px', sm: '120px', md: '160px' }} borderRadius={"10px"} src={`http://localhost:8000/categories/${item.imgURL}`} />
                            </Flex>
                        )
                    })}
                    {user ? (<AddCategory />) : (null)}
                </Flex>
                <Flex mt={"20px"} justifyContent={"center"}>
                    {page > 1 && (
                        <Button boxShadow={"0px 0px 10px gray"} _hover={{bgGradient:"linear(to-r, yellow.400, yellow.700)", transform:'scale(0.95)'}} color={"white"} bgGradient={"linear(to-r, yellow.400, yellow.700)"} onClick={prevPage}>Previous Page</Button>
                    )}
                    {page < totalPage && (
                        <Button boxShadow={"0px 0px 10px gray"} _hover={{bgGradient:"linear(to-r, yellow.400, yellow.700)", transform:'scale(0.95)'}} color={"white"} bgGradient={"linear(to-r, yellow.400, yellow.700)"} onClick={nextPage}>Next Page</Button>
                    )}
                </Flex>
            </Box>
        </Flex>
    )
};