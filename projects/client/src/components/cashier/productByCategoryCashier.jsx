import Axios from "axios";
import { Box, Flex, Image, Button } from "@chakra-ui/react";
import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState, useCallback } from "react";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { SiQuicklook } from "react-icons/si"
import { AddProduct } from "../admin/addProduct";
import { CircleLoader } from "react-spinners";

export const ProductsByCategory = ({ addToCart, cartItems, setCartItems }) => {
    const navigate = useNavigate();
    const { categoryId } = useParams();
    const [products, setProducts] = useState([]);
    const [inputQuantities, setInputQuantities] = useState({});
    const [page, setPage] = useState(1);
    const [totalPage, setTotalPage] = useState(1);
    const [loadingProducts, setLoadingProducts] = useState(true);
    const [loadingCartUpdate, setLoadingCartUpdate] = useState(false);

    const fetchProductsByCategory = useCallback(async (page) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/category/${categoryId}?page=${page}`);
            setTotalPage(response.data.totalPage);
            setPage(response.data.page);
            setProducts(response.data.result);
            setLoadingProducts(false);
        } catch (error) {
            console.error(error);
            setLoadingProducts(false);
        }
    }, [categoryId]);

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
        navigate(`/product/${id}`);
    };

    const handleMinusClick = (productId) => {
        const currentQuantity = inputQuantities[productId] || 0;
        const newQuantity = Math.max(currentQuantity - 1, 0);
        setInputQuantities((prevQuantities) => ({
            ...prevQuantities,
            [productId]: newQuantity
        }));
    };

    const handlePlusClick = (productId) => {
        const product = products.find((product) => product.id === productId);
        const currentQuantity = inputQuantities[productId] || 0;
        const newQuantity = currentQuantity + 1;

        if (product && newQuantity <= product.stock) {
            const cartItem = cartItems.find((item) => item.ProductId === productId);

            if (cartItem) {
                const totalQuantityInCart = cartItem.quantity + newQuantity;
                if (totalQuantityInCart <= product.stock) {
                    setInputQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: newQuantity
                    }));
                }
            } else {
                if (newQuantity <= product.stock) {
                    setInputQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: newQuantity
                    }));
                }
            }
        }
    };

    const handleAddToCart = async (productId) => {
        const inputQuantity = inputQuantities[productId] || 0;
        const token = localStorage.getItem('token');
        const product = products.find((product) => product.id === productId);

        try {
            if (product && inputQuantity >= 1) {
                const payload = {
                    ProductId: productId,
                    quantity: inputQuantity,
                    productName: product.productName,
                    price: product.price
                };

                const cartItem = cartItems.find((item) => item.ProductId === productId);
                const totalQuantityInCart = cartItem ? cartItem.quantity + inputQuantity : inputQuantity;

                if (totalQuantityInCart <= product.stock) {
                    setLoadingCartUpdate(true);
                    await Axios.post('http://localhost:8000/api/cart', payload, {
                        headers: { Authorization: `Bearer ${token}` },
                        "Content-type": "multipart/form-data"
                    });

                    addToCart({ ...payload, id: cartItems.length + 1 });

                    setInputQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: inputQuantity,
                    }));
                    setLoadingCartUpdate(false);
                    await productsByCategory(params.categoryId);
                } else {
                    setInputQuantities((prevQuantities) => ({
                        ...prevQuantities,
                        [productId]: product.stock - (cartItem?.quantity || 0),
                    }));
                }
            }
        } catch (error) {
            console.error(error);
        }
    };

    const nextPage = () => {
        if (page < totalPage) {
            setPage((prevPage) => Math.max(+prevPage + 1, 1));
        }
    };

    const prevPage = () => {
        if (page > 1) {
            setPage((prevPage) => Math.max(+prevPage - 1, 1));
        }
    };

    useEffect(() => {
        setLoadingProducts(true);
        Promise.all([getCartByUser(), fetchProductsByCategory(page)])
            .then(() => setLoadingProducts(false))
            .catch(() => setLoadingProducts(false));
    }, [fetchProductsByCategory, page]);

    useEffect(() => {
        if (!loadingCartUpdate) {
            getCartByUser();
        }
    }, [loadingCartUpdate]);

    return (
        <Flex>
            <Flex justifyContent={"center"} w={"full"}>
                <Box>
                    {loadingProducts ? (
                        <Flex justifyContent="center" alignItems="center" height="200px">
                            <CircleLoader size={200} color={"black"} loading={loadingProducts} />
                        </Flex>
                    ) : (
                        <Flex flexWrap={"wrap"} w={{ base: '200px', sm: '350px', md: '350px', lg: '600px' }} gap={"3"}>
                            {products.map((product) => {
                                const productId = product.id;
                                const inputQuantity = inputQuantities[productId] || 0;

                                if (!product || !product.productName || !product.price) {
                                    return null;
                                };

                                return (
                                    <Box key={product.id} mb={{ base: "30px" }}>
                                        <Box borderTopRadius={'8px'} h={{ base: '100px', sm: '150px', md: '200px' }} w={{ base: '80px', sm: '120px', md: '160px' }} fontSize={{ base: '10px', sm: '10px', md: '17px', lg: '20px' }} fontWeight={"bold"} color={"white"}>
                                            <Box h={"100px"} borderTopRadius={"9px"}>
                                                <Box position={"absolute"} w={{ base: '80px', sm: '120px', md: '160px' }} >
                                                    <Image borderRadius={"10px"} h={{ base: '130px', sm: '170px', md: '200px' }} filter={"auto"} brightness={"60%"} src={`http://localhost:8000/api/products/image/${product?.imgURL}`} />
                                                </Box>
                                                <Box position={"relative"}>
                                                    <Flex justifyContent={"center"} fontWeight={"thin"}>{product.productName}</Flex>
                                                    <Flex justifyContent={"center"}>Rp.{product.price}</Flex>
                                                </Box>
                                            </Box>
                                            <Flex mt={{ base: '0px', sm: '35px' }} position={"relative"} w={{ base: '80px', sm: '120px', md: '160px' }} p={"10px"} alignItems={"center"} color={"white"} borderBottomRadius={"10px"} justifyContent={"space-evenly"}>
                                                {/* Minus button */}
                                                <Flex onClick={() => handleMinusClick(productId)} justifyContent={"center"} align={"center"} fontSize={{ base: '7px', md: '15px' }} p={{ base: '3px', sm: '5px', md: '7px' }} cursor={"pointer"} _active={{ bgColor: 'yellow.500' }} transition={"0.3s"} borderRadius={"5px"} bgColor={"white"} color={"#FFC900"} >-</Flex>
                                                {/* Quantity display */}
                                                <Flex mx={4} fontSize="20px" fontWeight="bold">
                                                    {product.stock === 0 ? 0 : inputQuantity}
                                                </Flex>
                                                {/* Plus button */}
                                                <Flex onClick={() => handlePlusClick(productId)} justifyContent={"center"} align={"center"} fontSize={{ base: '7px', md: '15px' }} p={{ base: '3px', sm: '5px', md: '7px' }} cursor={"pointer"} _active={{ bgColor: 'yellow.500' }} transition={"0.3s"} borderRadius={"5px"} bgColor={"white"} color={"#FFC900"} >+</Flex>
                                            </Flex>
                                            <Flex mt={{ base: '5px', sm: '10px' }} position={"relative"} w={{ base: '80px', sm: '120px', md: '160px' }} p={"10px"} alignItems={"center"} color={"white"} borderBottomRadius={"10px"} justifyContent={"space-evenly"}>
                                                <Flex onClick={() => handleAddToCart(product.id)} justifyContent={"center"} align={"center"} fontSize={{ base: '7px', md: '15px' }} p={{ base: '3px', sm: '5px', md: '7px' }} cursor={"pointer"} _active={{ bgColor: 'yellow.500' }} transition={"0.3s"} borderRadius={"5px"} bgColor={"yellow.600"} color={"white"} > <AiOutlineShoppingCart /> </Flex>
                                                <Flex onClick={() => handleClick(product.id)} justifyContent={"center"} align={"center"} fontSize={{ base: '7px', md: '15px' }} p={{ base: '3px', sm: '5px', md: '7px' }} cursor={"pointer"} _active={{ bgColor: 'yellow.500' }} transition={"0.3s"} borderRadius={"5px"} bgColor={"yellow.600"} color={"white"} ><SiQuicklook /> </Flex>
                                            </Flex>
                                        </Box>
                                    </Box>
                                )
                            })}
                            <AddProduct />
                        </Flex>
                    )}
                    <Flex mt={"20px"} justifyContent={"center"} gap={'20px'}>
                        {page > 1 && (
                            <Button onClick={prevPage}>Previous Page</Button>
                        )}
                        {page < totalPage && (
                            <Button onClick={nextPage}>Next Page</Button>
                        )}
                    </Flex>
                </Box>
            </Flex >
        </Flex >
    );
};
