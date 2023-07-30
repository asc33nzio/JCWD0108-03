import Axios from "axios";
import { Box, Flex, Image } from "@chakra-ui/react";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { SiQuicklook } from "react-icons/si"
import { AddProduct } from "../admin/addProduct";

export const ProductsByCategory = ({ addToCart, cartItems, setCartItems }) => {
    const params = useParams();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [inputQuantities, setInputQuantities] = useState({});

    const productsByCategory = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/category/${params.categoryId}`);
            setProducts(response.data);
        } catch (error) {
            console.log(error);
        };
    };

    const getCartByUser = async () => {
        try {
            const token = localStorage.getItem('token');
            const response = await Axios.get('http://localhost:8000/api/cart', {
                headers: { Authorization: `Bearer ${token}` },
            });
            const cartItems = response.data.result;
            setCartItems(cartItems);
        } catch (error) {
            console.error(error);
        }
    };

    const handleClick = (id) => {
        navigate(`/product/${id}`);
    };

    const handleMinusClick = (productId) => {
        const currentQuantity = inputQuantities[productId] || 1;
        const newQuantity = Math.max(currentQuantity - 1, 1);
        setInputQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity,
        }));
    };

    const handlePlusClick = (productId) => {
        const product = products.find((product) => product.id === productId);
        const currentQuantity = inputQuantities[productId] || 1;
        const newQuantity = currentQuantity + 1;

        if (product && newQuantity <= product.stock) {
            const cartItem = cartItems.find((item) => item.ProductId === productId);

            if (cartItem) {
                const totalQuantityInCart = cartItem.quantity + newQuantity;
                if (totalQuantityInCart <= product.stock) {
                    setInputQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: newQuantity,
                    }));
                }
            } else {
                if (newQuantity <= product.stock) {
                    setInputQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: newQuantity,
                    }));
                }
            }
        }
    };

    const handleAddToCart = async (productId) => {
        const inputQuantity = inputQuantities[productId] || 1;
        const token = localStorage.getItem('token');
        const product = products.find((product) => product.id === productId);

        try {
            if (product && inputQuantity >= 1) {
                const payload = {
                    ProductId: productId,
                    quantity: inputQuantity
                };

                const cartItem = cartItems.find((item) => item.ProductId === productId);
                const totalQuantityInCart = cartItem ? cartItem.quantity + inputQuantity : inputQuantity;

                if (totalQuantityInCart <= product.stock) {
                    await Axios.post('http://localhost:8000/api/cart', payload, {
                        headers: { Authorization: `Bearer ${token}` },
                        "Content-type": "multipart/form-data"
                    });

                    addToCart(payload);

                    setInputQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: 0,
                    }));

                    await productsByCategory(params.categoryId);

                    getCartByUser();
                } else {
                    setInputQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: product.stock - (cartItem?.quantity || 0),
                    }));
                }
            };
        } catch (error) {
            console.error(error);
        };
    };

    useEffect(() => {
        productsByCategory(params.categoryId);
    }, [params.categoryId]);

    useEffect(() => {
        getCartByUser();
    }, []);

    return (
        <Flex>
            <Flex justifyContent={"center"} w={"full"}>
                <Flex flexWrap={"wrap"} w={{ base: '200px', sm: '350px', md: '350px', lg: '600px' }} gap={"3"}>
                    {products.map((item) => {
                        const productId = item.id;
                        const inputQuantity = inputQuantities[productId] || 0;
                        return (
                            <Box mb={{ base: "30px" }} key={item.id}>
                                <Box borderTopRadius={'8px'} h={{ base: '100px', sm: '150px', md: '200px' }} w={{ base: '80px', sm: '120px', md: '160px' }} fontSize={{ base: '10px', sm: '10px', md: '17px', lg: '20px' }} fontWeight={"bold"} color={"white"}>
                                    <Box h={"100px"} borderTopRadius={"9px"}>
                                        <Box position={"absolute"} w={{ base: '80px', sm: '120px', md: '160px' }} >
                                            <Image borderRadius={"10px"} h={{ base: '130px', sm: '170px', md: '200px' }} filter={"auto"} brightness={"60%"} src={`http://localhost:8000/api/products/image/${item?.imgURL}`} />
                                        </Box>
                                        <Box position={"relative"}>
                                            <Flex justifyContent={"center"} fontWeight={"thin"}>{item.productName}</Flex>
                                            <Flex justifyContent={"center"}>Rp.{item.price}</Flex>
                                        </Box>
                                    </Box>
                                    <Flex mt={{ base: '0px', sm: '35px' }} position={"relative"} w={{ base: '80px', sm: '120px', md: '160px' }} p={"10px"} alignItems={"center"} color={"white"} borderBottomRadius={"10px"} justifyContent={"space-evenly"}>
                                        {/* Minus button */}
                                        <Flex onClick={() => handleMinusClick(productId)} justifyContent={"center"} align={"center"} fontSize={{ base: '7px', md: '15px' }} p={{ base: '3px', sm: '5px', md: '7px' }} cursor={"pointer"} _active={{ bgColor: 'yellow.500' }} transition={"0.3s"} borderRadius={"5px"} bgColor={"white"} color={"#FFC900"} >-</Flex>
                                        {/* Quantity display */}
                                        <Flex mx={4} fontSize="20px" fontWeight="bold">{inputQuantity}</Flex>
                                        {/* Plus button */}
                                        <Flex onClick={() => handlePlusClick(productId)} justifyContent={"center"} align={"center"} fontSize={{ base: '7px', md: '15px' }} p={{ base: '3px', sm: '5px', md: '7px' }} cursor={"pointer"} _active={{ bgColor: 'yellow.500' }} transition={"0.3s"} borderRadius={"5px"} bgColor={"white"} color={"#FFC900"} >+</Flex>
                                    </Flex>
                                    <Flex mt={{ base: '5px', sm: '10px' }} position={"relative"} w={{ base: '80px', sm: '120px', md: '160px' }} p={"10px"} alignItems={"center"} color={"white"} borderBottomRadius={"10px"} justifyContent={"space-evenly"}>
                                        <Flex onClick={() => handleAddToCart(item.id)} justifyContent={"center"} align={"center"} fontSize={{ base: '7px', md: '15px' }} p={{ base: '3px', sm: '5px', md: '7px' }} cursor={"pointer"} _active={{ bgColor: 'yellow.500' }} transition={"0.3s"} borderRadius={"5px"} bgColor={"yellow.600"} color={"white"} > <AiOutlineShoppingCart /> </Flex>
                                        <Flex onClick={() => handleClick(item.id)} justifyContent={"center"} align={"center"} fontSize={{ base: '7px', md: '15px' }} p={{ base: '3px', sm: '5px', md: '7px' }} cursor={"pointer"} _active={{ bgColor: 'yellow.500' }} transition={"0.3s"} borderRadius={"5px"} bgColor={"yellow.600"} color={"white"} ><SiQuicklook /> </Flex>
                                    </Flex>
                                </Box>
                            </Box>
                        )
                    })}
                    <AddProduct />
                </Flex>
            </Flex>
        </Flex>
    );
};
