import { Tabs, TabList, TabPanels, Tab, TabPanel, TabIndicator } from '@chakra-ui/react';
import { Box, Flex, Heading, Text } from "@chakra-ui/react";
import { CashierLogin } from '../components/cashier/cashierLogin';
import { AdminLogin } from '../components/admin/adminLogin';
import { Link } from 'react-router-dom';

export const Login = () => {
    return (
        <>
            <Flex w={"full"} h={"100vh"} bgGradient="linear(#D5AD18, #FFEA61)" justifyContent={"center"}>
                <Box margin={"auto"} bg={"white"} w={{ base: '250px', md: '500px', lg: '600px', xl: "600px" }} h={"500px"} borderRadius={"10px"} boxShadow={"0px 0px 10px grey"} justifyContent={"center"}>
                    <Flex justifyContent={"center"}>
                        <Heading mt={{ base: '58px', md: '55px', lg: '45px' }} color={"#D5AD18"} fontSize={{ base: '30px', md: '40px', lg: '60px', xl: "60px" }} fontFamily={"Times New Roman"}>LOGIN</Heading>
                    </Flex>
                    <Flex mt={"25px"} fontSize={{ base: '10px', md: '12px', lg: '12px', xl: "12px" }} justifyContent={"center"} >
                        <Text display={"flex"}>  Forget your Password?
                            <Link to="/forgot">
                                <Text _hover={{ color: "#FFC900" }} color={"#D5AD18"}>‎ Click here.</Text>
                            </Link>
                        </Text>
                    </Flex>
                    <Flex mt={"20px"} fontSize={"25px"} color={"#D5AD18"} justifyContent={"center"} >
                        <Text display={"flex"} fontFamily={"Times New Roman"}>Login As</Text>
                    </Flex>
                    <Tabs mt={"10px"} align={"center"} variant="unstyled">
                        <TabList>
                            <Tab fontFamily={"Times New Roman"} fontSize={{ base: '11px', md: '18px', lg: '18px' }}>Cashier</Tab>
                            <Text color={"#D5AD18"} mt={{ base: '6px', md: '5px', lg: '7px' }} fontSize={{ base: '11px', md: '20px', lg: '18px' }}>or</Text>
                            <Tab fontFamily={"Times New Roman"} fontSize={{ base: '11px', md: '18px', lg: '18px' }}>Admin</Tab>
                        </TabList>
                        <TabIndicator mt="-1.5px" height="2px" bg="yellow" borderRadius="1px" />
                        <TabPanels>
                            <TabPanel>
                                <CashierLogin />
                            </TabPanel>
                            <TabPanel>
                                <AdminLogin />
                            </TabPanel>
                        </TabPanels>
                    </Tabs>
                </Box>
            </Flex>
        </>
    );
};