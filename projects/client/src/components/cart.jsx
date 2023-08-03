import Axios from "axios";
import { useState, useEffect } from "react";
import { Box, Button, Flex, useToast } from "@chakra-ui/react";
import { CircleLoader } from "react-spinners";
import { AiOutlineDelete, AiOutlinePlus, AiOutlineMinus } from "react-icons/ai";
import { IconButton } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setTransactionData } from "../redux/transactionSlice";

export const Cart = ({ cartItems, setCartItems, updatedQuantities, setUpdatedQuantities }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const dispatch = useDispatch();
    const toast = useToast();

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
                price: cartItem.Product.price,
                stock: cartItem.Product.stock
            }));

            const updatedQuantitiesObj = newCartItems.reduce((acc, item) => {
                acc[item.ProductId] = item.quantity;
                return acc;
            }, {});

            setUpdatedQuantities(updatedQuantitiesObj);
            setCartItems((prevCartItems) => [...prevCartItems, ...newCartItems]);
            setLoading(false);
        } catch (error) {
            console.error(error);
            setLoading(false);
        } finally {
            setDeleteLoading(false);
        }
    };

    const handleMinusClick = (productId) => {
        const currentQuantity = updatedQuantities[productId];
        const newQuantity = currentQuantity - 1;

        if (newQuantity >= 1) {
            setUpdatedQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: newQuantity
            }));

            if (currentQuantity !== newQuantity) {
                updateQuantityOnServer(productId, newQuantity);
            }
        }
    }

    const handlePlusClick = (productId) => {
        const currentQuantity = updatedQuantities[productId];
        const product = cartItems.find((item) => item.ProductId === productId);
        const productStock = product?.Product?.stock || 0;
        const newQuantity = currentQuantity + 1;

        if (newQuantity <= productStock) {
            setUpdatedQuantities((prevQuantities) => ({
                ...prevQuantities,
                [productId]: newQuantity,
            }));

            if (currentQuantity !== newQuantity) {
                updateQuantityOnServer(productId, newQuantity);
            }
        } else {
            toast({
                title: "Product Out Of Stock",
                description: `${product.Product.productName} is out of stock. Only ${product.Product.stock} pcs are available. Please contact your supervisor.`,
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
        }
    };

    const updateQuantityOnServer = async (productId, quantity) => {
        try {
            const token = localStorage.getItem("token");

            const response = await Axios.patch(
                `http://localhost:8000/api/cart/${productId}`,
                { "quantity": quantity },
                { headers: { Authorization: `Bearer ${token}` } }
            );

            const updatedCartItem = response.data.cartItem;
            setCartItems((prevCartItems) =>
                prevCartItems.map((item) =>
                    item.ProductId === productId ? { ...item, quantity: updatedCartItem.quantity } : item
                )
            );

        } catch (error) {
            console.error(error);
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

            setUpdatedQuantities((prevQuantities) => {
                const newQuantities = { ...prevQuantities };
                delete newQuantities[ProductId];
                return newQuantities;
            });

            setDeleteLoading(false);
        } catch (error) {
            console.error(error);
            setDeleteLoading(false);
        }
    };

    const handlePayment = async () => {
        try {
            const token = localStorage.getItem("token");

            const response = await Axios.post("http://localhost:8000/api/transactions", {}, {
                headers: { Authorization: `Bearer ${token}` }
            });
            const transactionData = response.data;
            dispatch(setTransactionData(transactionData));
            navigate('/payment');
        } catch (error) {
            console.error(error);
        };
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
                ml={{ base: "0px", sm: "0px", md: "5px" }}
                w={{ base: "150px", sm: "260px", md: "300px", lg: "380px", xl: "580px" }}
            >
                <Flex
                    justifyContent={"center"}
                    p={"20px"}
                    fontWeight={"bold"}
                    fontSize={{ base: "15px", sm: "25px", md: "35px", lg: "40px" }}
                    color={"white"}
                >
                    Shopping Cart
                </Flex>
                <Box w={{ base: "235px", sm: "260px", md: "300px", lg: "380px", xl: "580px" }} h={"3px"} bgColor={"white"}></Box>
                <Box p={{base:"5px"}}>
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
                                p="10px"
                                fontWeight="hairline"
                                color="white"
                                alignItems={'center'}
                                wrap={"wrap"}
                            >
                                <Box flex="2">{item.Product ? item.Product.productName : "Product Name Is Being Loaded"}</Box>
                                <Flex flex="1" justifyContent="space-between" alignItems="center" ml={{base:"5px"}}>
                                    <IconButton
                                        icon={<AiOutlineMinus />}
                                        colorScheme="yellow"
                                        aria-label="Decrease Quantity"
                                        onClick={() => handleMinusClick(item.ProductId)}
                                    />
                                    QTY:
                                    <Box mx="5px" color="black" textAlign="center" fontWeight="semibold">
                                        {updatedQuantities[item.ProductId] !== undefined
                                            ? updatedQuantities[item.ProductId]
                                            : item.quantity}
                                    </Box>
                                    <IconButton
                                        icon={<AiOutlinePlus />}
                                        colorScheme="yellow"
                                        aria-label="Increase Quantity"
                                        onClick={() => handlePlusClick(item.ProductId)}
                                    />
                                </Flex>
                                <Box ml="40px">Rp. {item.Product ? `${formatPrice(item.Product.price * item.quantity)}` : "Price Is Being Loaded"},00</Box>
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
                ml={{ base: "0px", sm: "0px", md: "5px" }}
                w={{ base: "150px", sm: "260px", md: "300px", lg: "380px", xl: "580px" }}            >
                <Button color={"#FFC900"} onClick={() => handlePayment()}>Pay</Button>
            </Flex>
        </Box>
    );
}