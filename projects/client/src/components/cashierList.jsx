import { Avatar, Box, Button, Flex } from "@chakra-ui/react";
import { Navbar } from "./navbar";
import { Table, Thead, Tbody, Tfoot, Tr, Th, Td, TableCaption, TableContainer, } from '@chakra-ui/react';
import InitialFocus from "./formModal";


export const CashierList = () => {
    return (
        <>
            <Flex mt={"0px"}>
                <Navbar />
            </Flex>
            <Flex mt={"110px"} justifyContent={"center"}>
                {/* <Button bg={"#FFC900"} w={"200px"}>
                    Add Cashier
                </Button> */}
                <InitialFocus />
            </Flex>
            <Flex mt={"40px"} justifyContent={"center"}>
                <Box>
                    <TableContainer w={"1000px"}>
                        <Table variant='simple' >
                            <Thead >
                                <Tr >
                                    <Th textAlign={"center"}>Photo</Th>
                                    <Th textAlign={"center"}>Username</Th>
                                    <Th textAlign={"center"}>Email</Th>
                                    <Th textAlign={"center"}>Password</Th>
                                    <Th textAlign={"center"}>Action</Th>
                                </Tr>
                            </Thead>
                            <Tbody >
                                <Tr  >
                                    <Td textAlign={"center"}><Avatar /></Td>
                                    <Td textAlign={"center"}>Alvian</Td>
                                    <Td textAlign={"center"}>alvian@gmail.com</Td>
                                    <Td textAlign={"center"} >Alvian1234</Td>
                                    <Td textAlign={"center"} ><Button color={"white"} bg={"blue"}>Edit</Button>
                                        <Button ml={"5px"} color={"white"} bg={"red"}>Delete</Button></Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
        </>
    )
};