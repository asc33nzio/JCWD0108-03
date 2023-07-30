import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
import { Navbar } from "./navbar";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, } from '@chakra-ui/react';
import InitialFocus from "./formModal";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";

export const CashierList = () => {
    const [data, setData] = useState();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const getCashier = async (data) => {
        try {
            const response = await Axios.get("http://localhost:8000/api/admin/all", data);
            setData(response.data);
        } catch (error) {
            console.log(error);
        };
    };
    useEffect(() => {
        getCashier();
        if (!token) {
            navigate("/")
        }

    }, []);
    console.log(data);

    return (
        <>
            <Flex mt={"0px"}>
                <Navbar />
            </Flex>
            <Flex mt={"110px"} justifyContent={"center"}>
                <InitialFocus />
            </Flex>
            <Flex mt={"40px"} justifyContent={"center"}>
                <Box>
                    <TableContainer w={{ base: '250px', md: '800px', lg: '700px', xl: "1000px" }}>
                        <Table variant='simple' >
                            <Thead >
                                <Tr >
                                    <Th textAlign={"center"}>Photo</Th>
                                    <Th textAlign={"center"}>Username</Th>
                                    <Th textAlign={"center"}>Email</Th>
                                    <Th textAlign={"center"}>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                {data?.map((item) => {
                                    return (
                                        <Tr>
                                            <Td textAlign={"center"}><Avatar src={`http://localhost:8000/avatars/${item.avatar}`} /></Td>
                                            <Td textAlign={"center"}>{item.username}</Td>
                                            <Td textAlign={"center"}>{item.email}</Td>
                                            <Td textAlign={"center"} ><Button color={"white"} bg={"blue"}>Edit</Button>
                                                <Button ml={"5px"} color={"white"} bg={"red"}>Delete</Button> <Button ml={"1px"} color={"white"} bg={"teal"}>Suspend</Button></Td>
                                        </Tr>
                                    );
                                })}
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
        </>
    )
};