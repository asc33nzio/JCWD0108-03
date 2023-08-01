import Axios from "axios"
import { Box, Flex, Input, Radio, RadioGroup, Stack, Image, Button } from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";

export const Search = () => {
    const [value, setValue] = useState("")
    const [products, setProducts] = useState([])
    const [reload, setReload] = useState(true)
    const [page, setPage] = useState(1)
    const [totalPage, setTotalPage] = useState(1)
    const token = localStorage.getItem("token")
    const [search, setSearch] = useState("")
    const [sort, setSort] = useState("DESC")
    const navigate = useNavigate()

    const Products = async (pageNum) => {
        try {
            const response = await Axios.get(`http://localhost:8000/api/products/all?sortBy=productName&page=${pageNum}&sort=${sort}`, {
                headers: { Authorization: `Bearer ${token}` }
            })
            console.log(response);
            setProducts(response.data.result)
            setPage(response.data.page)
            setTotalPage(response.data.totalPage)
        } catch (error) {
            console.log(error);
        }
    }

    const nextPage = () => {
        if (page < totalPage) {
            setPage((prevPage) => +prevPage + 1)
            setReload(!reload)
        }
    }

    const prevPage = () => {
        if (page > 1) {
            setPage((prevPage) => +prevPage - 1)
            setReload(!reload)
        }
    }
    
    const detailProduct = (id) => {
        navigate(`/product/${id}`)
    }

    useEffect(() => {
        Products(page);
    }, [reload])

    return (
        <Box>
            <Box> <Navbar /> </Box>
            <Flex>
                <Box bgColor={"gray.200"} boxShadow={"0px 0px 5px gray"} w={"200px"} h={"100vh"} pt={"100px"} px={"20px"}>
                    <Box mb={"10px"} borderBottom={"1px solid"} borderColor={"gray.400"} pb={"20px"}>
                        <Box mb={"5px"} fontWeight={"thin"} color={"gray"}>Search Product</Box>
                        <Input 
                            value={search} 
                            onChange={(e) => setSearch(e.target.value)} 
                            w={"150px"} h={"30px"} border={"1px solid gray"} bgColor={"white"} 
                            placeholder="Enter Product Name" 
                            _placeholder={{ fontSize: "10px", align: "center" }} 
                        />
                        <Button w={"150px"} bgColor={"#FFC900"} mt={"10px"} color={"gray.600"} _hover={{bgColor:"yellow.500"}}>Search</Button>
                    </Box>
                    <Box>
                        <Box mb={"5px"} fontWeight={"thin"} color={"gray"}>Sort</Box>
                        <RadioGroup onChange={(value) => setSort(value)} value={sort}>
                            <Stack color={"gray"}>
                                <Radio colorScheme="yellow" borderColor={"gray"} value='DESC'>A - Z</Radio>
                                <Radio borderColor={"gray"} colorScheme="yellow" value='ASC'>Z - A</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </Box>
                <Flex justifyContent={"center"} pt={"100px"} w={"full"}>
                    <Flex>
                        <Box>
                            <Flex justifyContent={"center"} wrap={"wrap"} px={"100px"} pt={"50px"} w={"1100px"} h={"500px"} gap={"15px"} >
                                {products?.map(data => {
                                    return (
                                        <Box onClick={() => detailProduct(data.id)} cursor={"pointer"} boxShadow={"0px 0px 8px gray"} borderRadius={"10px"} w={"150px"} h={"200px"}>
                                            <Box h={"140px"} >
                                                <Image borderTopRadius={"9px"} w={"full"} h={"140px"} src={`http://localhost:8000/api/products/image/${data?.imgURL}`} />
                                            </Box>
                                            <Box borderBottomRadius={"10px"} textShadow={"0px 0px 1px gray"} bgColor={"gray.100"} justifyContent={"center"} fontFamily={"revert"} color={"gray.700"} p={"10px"} fontSize={"14px"}>
                                                <Box color={"gray.700"}>{data.productName}</Box>
                                                <Box color={"gray.700"} fontWeight={"bold"}>Rp.{data.price}.00</Box>
                                            </Box>
                                        </Box>
                                    )
                                })}
                            </Flex>
                            <Flex justifyContent={"center"} gap={"50px"}>
                                {totalPage > 1 && (
                                    <Button bgColor={"#FFC900"} color={"gray.600"} onClick={prevPage} >Prev</Button>
                                )}
                                {page < totalPage && (
                                    <Button bgColor={"#FFC900"} color={"gray.600"} onClick={nextPage}>Next</Button>
                                )}
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>

        </Box>
    )
}
