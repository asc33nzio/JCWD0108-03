import { Avatar, Box, Button, Flex, Img, Text, useToast } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, } from '@chakra-ui/react';
import InitialFocus from "../components/formModal";
import { useEffect, useState } from "react";
import Axios from "axios";
import { useNavigate } from "react-router";
import { DeleteButton } from "../components/admin/deleteButton";
import { EditIcon } from "@chakra-ui/icons";

export const CashierList = () => {
    const [data, setData] = useState();
    const token = localStorage.getItem("token");
    const navigate = useNavigate();
    const [reload, setReload] = useState(true);
    const toast = useToast();
    const getCashier = async (data) => {
        try {
            const response = await Axios.get("http://localhost:8000/api/admin/all", data);
            setData(response.data);
        } catch (error) {
            console.log(error);
        };
    };
    const handleSuspend = async (id) => {
        try {
            const response = await Axios.patch(`http://localhost:8000/api/admin/suspendCashier/${id}`, {}, {
                headers: { Authorization: `Bearer ${token}` },
                "content-Type": "Multiple/form-data"
            });
            toast({
                title: "Cashier Status Already Changed!",
                description: "Check Your Cashier Status Below!",
                status: "warning",
                duration: 3500,
                isClosable: true,
                position: "top"
            });
            setReload(!reload);
        } catch (error) {
            console.log(error);
        };
    };
    useEffect(() => {
        getCashier();
        if (!token) {
            navigate("/")
        }
    }, [reload]);
    return (
        <>
            <Flex mt={"0px"}>
                <Navbar />
            </Flex>
            <Flex mt={"110px"} justifyContent={"center"}>
                <Img w={"80px"} borderBottom={"2px solid"} src="c__1_-removebg-preview.png" />
                <Text mt={"10px"} borderBottom={"2px solid"} fontFamily={"Times New Roman"} fontSize={"35px"}>Cashier Data</Text>
            </Flex>
            <Flex mt={"20px"} justifyContent={"center"}>
                <InitialFocus />
            </Flex>
            <Flex mt={"40px"} justifyContent={"center"}>
                <Box>
                    <TableContainer w={{ base: '250px', md: '800px', lg: '900px', xl: "1200px" }}>
                        <Table variant='simple' >
                            <Thead >
                                <Tr >
                                    <Th textAlign={"center"}>Photo</Th>
                                    <Th textAlign={"center"}>Username</Th>
                                    <Th textAlign={"center"}>Email</Th>
                                    <Th textAlign={"center"}>Password</Th>
                                    <Th textAlign={"center"}>Status</Th>
                                    <Th textAlign={"center"}>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                {data?.map((item) => {
                                    return (
                                        <Tr>
                                            <Td textAlign={"center"}><Avatar boxShadow={"0px 0px 10px grey"} src={`http://localhost:8000/avatars/${item.avatar}`} /></Td>
                                            <Td textAlign={"center"}>{item.username}</Td>
                                            <Td textAlign={"center"}>{item.email}</Td>
                                            <Td overflow="hidden"
                                                whiteSpace="nowrap"
                                                textOverflow="ellipsis"
                                                maxWidth="100px" textAlign={"center"}>{item.password}</Td>
                                            {item.isSuspended ? (
                                                <Td><Flex boxShadow={"0px 0px 10px grey"} ml={"20px"} justifyContent={"center"} bgColor={"red.400"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>Supended</Flex></Td>
                                            ) : (
                                                <Td><Flex boxShadow={"0px 0px 10px grey"} ml={"20px"} justifyContent={"center"} bgColor={"green.400"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>Active</Flex></Td>
                                            )}
                                            <Td display={"flex"} justifyContent={"center"} >
                                                <Button borderRadius={"70px"} color={"white"} bg={"blue.600"}><EditIcon /></Button>
                                                <DeleteButton id={item.id} />
                                                {item.isSuspended ? (<Button w={"90px"} borderRadius={"70px"} onClick={() => handleSuspend(item.id)} color={"white"} bg={"Teal"} ml={"5px"}>Activate</Button>) : (<Button Button w={"90px"} borderRadius={"70px"} onClick={() => handleSuspend(item.id)} color={"white"} bg={"#D5AD18"} ml={"5px"}>Suspend</Button>)}
                                            </Td>
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