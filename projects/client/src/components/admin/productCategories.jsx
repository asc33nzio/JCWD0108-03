import Axios from "axios";
import { Flex, Image } from "@chakra-ui/react"
import { useNavigate } from 'react-router-dom'
import { useEffect, useState } from "react"
import { AddCategory } from "./addCategory";

export const ProductCategories = ({ cartItems, setCartItems }) => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [loadingCartUpdate, setLoadingCartUpdate] = useState(false);

    const category = async (data) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/categories`, data)
            setCategories(response.data.result)
        } catch (error) {
            console.log(error);
        };
    };

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

    const handleClick = (id) => {
        navigate(`/category/${id}`);
    };

    useEffect(() => {
        category();
        getCartByUser();
    }, [loadingCartUpdate]);

    return (
        <Flex>
            <Flex justifyContent={"center"} w={"full"} h={"100%"}>
                <Flex blur={"10px"} w={"600px"} gap={"15px"} wrap={"wrap"}>
                    {categories.map(item => {
                        return (
                            <Flex key={item.id} align={"end"} wrap={"wrap"} borderRadius={'8px'} h={{ base: '100px', sm: '150px', md: '180px' }} w={{ base: '80px', sm: '120px', md: '160px' }} lineHeight={{ base: '40px', sm: '110px', md: '100px' }} fontSize={{ base: '10px', sm: '10px', md: '17px', lg: '20px' }} fontWeight={"bold"} justifyContent={"center"} cursor={"pointer"} _hover={{ transform: 'scale(0.98)', transition: "0.3s" }} boxShadow={"0px 0px 5px gray"} onClick={() => handleClick(item.id)}>
                                <Flex position={"absolute"} zIndex={"5"} color={"gray.200"} textShadow={"0px 0px 20px white"}>
                                    {item.category}
                                </Flex>
                                <Image position={"relative"} h={{ base: '100px', sm: '150px', md: '180px' }} w={{ base: '80px', sm: '120px', md: '160px' }} borderRadius={"10px"} src={`http://localhost:8000/categories/${item.imgURL}`} />
                            </Flex>
                        )
                    })}
                    <AddCategory />
                </Flex>
            </Flex>
        </Flex>
    )
};