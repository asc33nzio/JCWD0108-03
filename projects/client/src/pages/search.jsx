import Axios from "axios"
import { Box, Flex, Input, Radio, RadioGroup, Stack } from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import { useState } from "react";
import { SearchProduct } from "./allProducts"

export const Search = () => {
    const [value, setValue] = useState("")

    return (
        <Box>
            <Box> <Navbar /> </Box>
            <Flex>
                <Box bgColor={"gray.200"} boxShadow={"0px 0px 5px gray"} w={"200px"} h={"100vh"} pt={"100px"} px={"20px"}>
                    <Box mb={"10px"} borderBottom={"1px solid"} borderColor={"gray.400"} pb={"20px"}>
                        <Box mb={"5px"} fontWeight={"thin"} color={"gray"}>Search Product</Box>
                        <Input w={"150px"} h={"30px"} border={"1px solid gray"} bgColor={"white"} placeholder="Enter Product Name" _placeholder={{ fontSize: "10px", align: "center" }} />
                    </Box>
                    <Box>
                        <Box mb={"5px"} fontWeight={"thin"} color={"gray"}>Sort</Box>
                        <RadioGroup onChange={setValue} value={value}>
                            <Stack color={"gray"}>
                                <Radio colorScheme="yellow" borderColor={"gray"} value='DESC'>A - Z</Radio>
                                <Radio borderColor={"gray"} colorScheme="yellow" value='ASC'>Z - A</Radio>
                            </Stack>
                        </RadioGroup>
                    </Box>
                </Box>
                <Flex pt={"100px"} w={"full"}>
                    <SearchProduct />
                </Flex>
            </Flex>

        </Box>
    )
}