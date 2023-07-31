import Axios from "axios";
import { Box, Button, Flex, Image } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Cart } from "../components/cart";
import { Back } from "../components/back";
import { AiOutlineShoppingCart } from "react-icons/ai"
import { useSelector } from "react-redux";

export const DetailProduct = () => {
    const params = useParams();
    const [cartItems, setCartItems] = useState([]);
    const [product, setProduct] = useState([]);
    const [reload, setReload] = useState(true)

    const handleClick = async (id) => {
        try {
            const response = await Axios.patch(`http://localhost:8000/api/products/`, {productId : id})
            setReload(!reload)
        } catch (error) {
            console.log(error);
        }
    }


    const dataProduct = async (id) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/${params.id}`);
            setProduct(response.data.result);
        } catch (error) {
            console.log(error);
        };
    };

    useEffect(() => {
        dataProduct()
    }, [reload])

    const data = useSelector((state) => state.user.value.isAdmin)
    console.log(data);

    return (
        <Box>
            <Box><Navbar /></Box>
            <Flex>
                <Back nav={"/category"} id={`/${product.CategoryId}`} />
                <Flex justifyContent={"center"} pt={"100px"} px={"150px"}>
                    <Box>
                        <Box>
                            <Image borderRadius={"5px"} boxShadow={"0px 0px 10px black"} w={"400px"} h={"350px"} src={`http://localhost:8000/products/${product?.imgURL}`} />
                        </Box>
                        <Flex w={"400px"} h={"90px"} justifyContent={"space-between"} mt={"5px"}>
                            <Box mb={"110px"} alignContent={"center"}>
                                <Box textShadow={"2px 2px 3px gray"} fontSize={"50px"} fontWeight={"bold"} mb={"20px"}> {product.productName} </Box>
                            </Box>
                            {data? (<Flex alignItems={"center"} gap={"20px"}>
                                {product.isActive ? (<Button w={"30px"} transition={"0.3s"} bgColor={"red"} color={"white"} onClick={()=> handleClick(product.id)}>X</Button>) : (<Button w={"30px"} transition={"0.3s"} onClick={()=> handleClick(product.id)} color={"white"} bgColor={"green"}>asd</Button>)}
                                
                                <Button bgColor={"yellow.400"} color={"white"}> <AiOutlineShoppingCart /> </Button>
                            </Flex>) : ( <Button bgColor={"yellow.400"} color={"white"} mt={"20px"}> <AiOutlineShoppingCart /> </Button>)}
                        </Flex>
                        <Box textAlign={"justify"} w={"400px"}> {product.description} </Box>
                    </Box>
                    <Box>
                        <Cart cartItems={cartItems} setCartItems={setCartItems} />
                    </Box>
                </Flex>
            </Flex>
            
        </Box>
    )
};