import { Avatar, Box, Button, Flex, Text } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Table, Thead, Tbody, Tr, Th, Td, TableContainer, } from "@chakra-ui/react";
import InitialFocus from "../components/formModal";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

export const CashierList = () => {
    return (
        <>
            <Flex mt={"0px"}>
                <Navbar />
            </Flex>
            <Flex justifyContent={"center"} fontSize={"40px"} fontFamily={"Times New Roman"} mt={"110px"}>
                <Text>Cashier List</Text>
            </Flex>
            <Flex mt={"40px"} justifyContent={"center"}>
                <Box>
                    <TableContainer w={{ base: '200px', md: '600px', lg: '1000px' }}>
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
                                    <Td textAlign={"center"} ><Button color={"white"} bg={"blue"}><EditIcon /></Button>
                                        <Button ml={"5px"} color={"white"} bg={"red"}><DeleteIcon /></Button>  <Button ml={"1px"} color={"white"} bg={"teal"}>Suspend</Button></Td>
                                </Tr>
                            </Tbody>
                        </Table>
                    </TableContainer>
                </Box>
            </Flex>
            <Flex mt={"40px"} justifyContent={"center"}>   <InitialFocus />  </Flex>
        </>
    )
};
