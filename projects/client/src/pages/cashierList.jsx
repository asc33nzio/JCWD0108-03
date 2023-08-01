import Axios from "axios";
import AddCashier from "../components/admin/addCashier";
import UpdateCashier from "../components/admin/updateCashier";
import { Avatar, Box, Button, Flex, Img, Text, useToast } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, } from '@chakra-ui/react';
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { DeleteButton } from "../components/admin/deleteButton";
import AAA_Logo from '../public/aaa_studio_transparent.png';

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
                <Img w={"80px"} borderBottom={"2px solid"} src={AAA_Logo} />
                <Text mt={"10px"} borderBottom={"2px solid"} fontFamily={"Times New Roman"} fontSize={"35px"}>Cashier Data</Text>
            </Flex>
            <Flex mt={"20px"} justifyContent={"center"}>
                <AddCashier />
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
                                                <Td><Flex boxShadow={"0px 0px 10px grey"} ml={"25px"} justifyContent={"center"} bgColor={"red.400"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>Supended</Flex></Td>
                                            ) : (
                                                <Td><Flex boxShadow={"0px 0px 10px grey"} ml={"25px"} justifyContent={"center"} bgColor={"green.400"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"}>Active</Flex></Td>
                                            )}
                                            <Td display={"flex"} justifyContent={"center"} >
                                                <UpdateCashier
                                                    id={item.id}
                                                    username={item.username}
                                                    email={item.email}
                                                    password={item.password}
                                                    avatar={item.avatar}
                                                />
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