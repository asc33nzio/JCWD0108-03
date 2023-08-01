import Axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Flex } from "@chakra-ui/react";
import { CircleLoader } from "react-spinners";
import { AiOutlineDelete } from "react-icons/ai";
import { IconButton } from "@chakra-ui/react";

export const Cart = ({ cartItems, setCartItems }) => {
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);

    const fetchCartItems = async () => {
        try {
            setDeleteLoading(true);
            const token = localStorage.getItem("token");
            const response = await Axios.get("http://localhost:8000/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
            });

            const newCartItems = response.data.result.map((cartItem) => ({
                ...cartItem,
                productName: cartItem.Product.productName,
                price: cartItem.Product.price
            }));

            setCartItems((prevCartItems) => [...prevCartItems, ...newCartItems]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleDelete = async (ProductId) => {
        try {
            const token = localStorage.getItem("token");

            setDeleteLoading(true);

            await Axios.delete("http://localhost:8000/api/cart", {
                headers: { Authorization: `Bearer ${token}` },
                data: { ProductId }
            });

            setCartItems((prevCartItems) => prevCartItems.filter((item) => item.ProductId !== ProductId));

            setDeleteLoading(false);
        } catch (error) {
            console.error(error);
            setDeleteLoading(false);
        }
    };

    const formatPrice = (price) => {
        return price.toLocaleString("id-ID");
    };

    const updateCartItems = async () => {
        await fetchCartItems();
    };

    const calculateTotalPrice = () => {
        if (!cartItems || cartItems.length === 0) {
            return "0";
        }

        const totalPrice = cartItems.reduce((total, item) => total + (item.Product?.price || 0) * item.quantity, 0);
        return formatPrice(totalPrice);
    };

    useEffect(() => {
        updateCartItems();
    }, []);

    useEffect(() => {
        setDeleteLoading(false);
    }, [cartItems]);

    return (
        <Box>
            <Box
                borderBottomRadius={"0px"}
                borderTopRadius={"10px"}
                bgGradient={"linear(yellow.500,#FFC900)"}
                ml={{ base: "10px", sm: "25px", md: "80px" }}
                w={{ base: "190px", sm: "215px", md: "255px", lg: "335px", xl: "535px" }}
            >
                <Flex
                    justifyContent={"center"}
                    p={"20px"}
                    fontWeight={"bold"}
                    fontSize={{ base: "20px", sm: "25px", md: "35px", lg: "40px" }}
                    color={"white"}
                >
                    Shopping Cart
                </Flex>
                <Box w={{ base: "155px", sm: "180px", md: "220px", lg: "300px", xl: "500px" }} h={"3px"} bgColor={"white"}></Box>
                <Box p={"20px"}>
                    {loading && deleteLoading ? (
                        <Flex justifyContent="center" alignItems="center" height="200px">
                            <CircleLoader size={200} color={"black"} loading={loading} />
                        </Flex>
                    ) : cartItems && cartItems.length > 0 ? (
                        cartItems.map((item) => (
                            <Flex
                                key={Math.random(item.ProductId + item.quantity)}
                                justifyContent="space-between"
                                fontSize={{ base: "10px", sm: "13px", md: "18px", lg: "25px" }}
                                borderBottom="1px solid white"
                                pb="10px"
                                fontWeight="hairline"
                                color="white"
                                alignItems={'center'}
                            >
                                <Box flex="2">{item.Product?.productName || "Product Name Is Being Loaded"}</Box>
                                <Flex flex="1" justifyContent="space-between" alignItems="center" ml="20px">
                                    <Box mx={'5px'} color="black" textAlign={'center'}>QTY:</Box>
                                    <Box mr={'5px'} color={'black'} fontWeight={'semibold'} textAlign={'center'}>{item.quantity}</Box>
                                </Flex>
                                <Box ml="40px">Rp. {formatPrice(item.Product?.price * item.quantity) || "Price Is Being Loaded"},00</Box>
                                <IconButton
                                    ml={'10px'}
                                    mt={'10px'}
                                    icon={<AiOutlineDelete />}
                                    colorScheme="red"
                                    aria-label="Delete"
                                    onClick={() => handleDelete(item.ProductId)}
                                />
                            </Flex>
                        ))
                    ) : (
                        <Flex justifyContent="center" color="white">
                            Your cart is empty.
                        </Flex>
                    )}
                    <Flex
                        mt={"20px"}
                        justifyContent={"space-between"}
                        fontWeight={"semibold"}
                        fontSize={{ base: "12px", sm: "16px", md: "20px", lg: "25px" }}
                        color={"white"}
                    >
                        <Box>Total</Box>
                        <Box>Rp. {calculateTotalPrice()},00</Box>
                    </Flex>
                </Box>
            </Box>
            <Flex
                justifyContent={"end"}
                p={"20px"}
                borderTopRadius={"0px"}
                borderBottomRadius={"10px"}
                bgColor={"#FFC900"}
                ml={{ base: "10px", sm: "25px", md: "80px" }}
                w={{ base: "190px", sm: "215px", md: "255px", lg: "335px", xl: "535px" }}
            >
                <Button color={"#FFC900"}>Checkout</Button>
            </Flex>
        </Box>
    );
}