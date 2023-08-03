import Axios from "axios";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cart } from "../components/cart";
import { Back } from "../components/back";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector } from "react-redux";
import { EditProduct } from "../components/admin/editProduct";

export const DetailProduct = () => {
    const navigate = useNavigate()
    const params = useParams();
    const data = useSelector((state) => state.user.value.isAdmin)
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState([]);
    const [updatedQuantities, setUpdatedQuantities] = useState({});
    const [loadingCartUpdate, setLoadingCartUpdate] = useState(false);

    const handleClick = async (id) => {
        try {
            await Axios.patch(`http://localhost:8000/api/products/`, { productId: id })
            window.location.reload()
        } catch (error) {
            console.log(error);
        }
    }
    console.log(product.id);

    const dataProduct = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/${params.id}`);
            setProduct(response.data.result);
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

    const handleBack = () => {
        if (data) {
            return ("categoryAdmin")
        } else {
            return ("categoryCashier")
        }
    }



    useEffect(() => {
        dataProduct();
        getCartByUser();
    }, [loadingCartUpdate]);



    return (
        <Box>
            <Box><Navbar /></Box>
            <Flex>
                <Back nav={`/${handleBack()}`} id={`/${product.CategoryId}`} />
                <Flex justifyContent={"center"} pt={{ base: "70px", sm: "100px" }} px={{ base: "10px", sm: "30px", md: "50px" }} wrap={"wrap"} w={{ base: "350px", sm: "800px", md: "1200px" }} gap={"20px"}>
                    <Box>
                        <Box>
                            <Image borderRadius={"5px"} boxShadow={"1px 2px 3px black"} w={{ base: "250px", sm: "250px", md: "300px", lg: "400px" }} h={{ base: "200px", sm: "200px", md: "250px", lg: "370px" }} src={`http://localhost:8000/products/${product?.imgURL}`} />
                        </Box>
                        <Flex w={{ base: "250px", sm: "250px", md: "300px", lg: "400px" }} h={{ base: "20px", sm: "40px", md: "60px" }} mb={{ base: "5px", sm: "30px", md: "20px" }} pb={{ base: "30px", sm: "45px" }} lineHeight={{ base: "20px", sm: "40px" }} justifyContent={"space-between"} mt={{ base: "10px", sm: "15px" }}>
                            <Box mb={"110px"} alignContent={"center"} mr={{ base: "5px" }}>
                                <Box pb={"20px"} borderBottom={"2px solid gray"} w={{ base: "250px", sm: "250px", md: "300px", lg: "400px" }} textShadow={"2px 2px 2px gray"} fontSize={{ base: "25px", sm: "35px", md: "45px" }} color={"gray.700"} fontFamily={"sans-serif"} fontWeight={"bold"} > {product.productName} </Box>
                                <Flex fontSize={"20px"} color={"gray.600"} w={{ base: "250px", sm: "250px", md: "300px", lg: "400px" }} pb={"10px"} borderBottom={"2px solid gray"} fontFamily={"sans-serif"} ><Box fontWeight={"bold"} fontSize={{ base: "15px", sm: "17px", md: "24px" }} >Stock Product :</Box> <Box ml={"5px"} fontSize={{ base: "15px", sm: "17px", md: "24px" }} >{product.stock}</Box> </Flex>
                            </Box>
                            <Flex>
                                {data ? (<Flex alignItems={"center"} gap={{ base: "5px" }} mt={{ base: "10px", sm: "25px" }}>
                                    <Flex> <EditProduct productName={product.productName} price={product.price} description={product.description} stock={product.stock} /> </Flex>
                                    {product.isActive ? (<Box cursor={"pointer"} boxShadow={"0px 0px 3px green"} borderRadius={"5px"} textAlign={"center"} lineHeight={{ base: "15px", sm: "20px", md: "25px", lg: "30px" }} w={{ base: "40px", sm: "50px", md: "60px", lg: "70px" }} h={{ base: "15px", sm: "20px", md: "25px", lg: "30px" }} fontSize={{ base: "10px", sm: "15px" }} transition={"0.3s"} bgColor={"green"} color={"white"} onClick={() => handleClick(product.id)}>Active</Box>) : (<Button boxShadow={"0px 0px 3px red"} borderRadius={"5px"} textAlign={"center"} lineHeight={{ base: "15px", sm: "20px", md: "25px", lg: "30px" }} w={{ base: "40px", sm: "50px", md: "60px", lg: "70px" }} h={{ base: "15px", sm: "20px", md: "25px", lg: "30px" }} fontSize={{ base: "10px", sm: "15px" }} transition={"0.3s"} bgColor={"red"} color={"white"} onClick={() => handleClick(product.id)}>Deactive</Button>)}


                                </Flex>) : (null)}
                            </Flex>
                        </Flex>
                        <Box mt={"70px"} w={{ base: "250px", sm: "220px", md: "300px" }} fontSize={{ base: "15px", sm: "17px", md: "24px" }} fontFamily={"heading"} color={"gray.600"}>
                            <Box fontWeight={"bold"}>Product Description :</Box>
                            <Box>
                            {product.description}
                            </Box>
                        </Box>
                    </Box>
                    <Box>
                        <Cart cartItems={cartItems} setCartItems={setCartItems} updatedQuantities={updatedQuantities} setUpdatedQuantities={setUpdatedQuantities} />
                    </Box>
                </Flex>
            </Flex>

        </Box>
    )
};
