import { Avatar, Box, Flex, Heading, Text } from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import { useSelector } from "react-redux";


export const Profile = () => {
    const data = useSelector((state) => state.user.value);
    return (
        <>
            <Flex><Navbar /></Flex>
            <Flex justifyContent={"center"}>
                <Flex justifyContent={"center"} mt={"135px"} borderRadius={"10px"}
                    boxShadow='0px 0px 6px black' bgGradient={"linear(yellow.500,#FFC900)"} w={"700px"} h={"450px"}>
                    <Flex mt={"48px"} borderRadius={"10px"} justifyContent={"center"}
                        boxShadow='0px 0px 6px black' bg={"white"} w={"590px"} h={"350px"}>
                        <Box mr={"45px"}>
                            <Flex mt={"20px"} justifyContent={"center"} >
                                <Avatar src={`http://localhost:8000/avatars/${data.avatar}`} mt={"25px"} boxShadow={"0px 0px 4px black"} bg={"grey"} w={"230px"} h={"230px"} />
                            </Flex>
                            <Flex mt={"10px"}
                                justifyContent={"center"}>
                                <label htmlFor="customFileInput">
                                    <Text fontSize={"12px"} as="span" bg="yellow.500" color="white" px={"7px"} pb={"5px"} pt={"4px"} borderRadius="md" cursor="pointer" _hover={{ bg: 'green.600' }}>
                                        Change Photo
                                    </Text>
                                </label>
                                <input zIndex={"100"}
                                    type="file"
                                    id="customFileInput"
                                    style={{ display: 'none' }} />
                            </Flex>
                        </Box>
                        <Box mt={"93px"}>
                            <Flex mt={"15px"} justifyContent={"center"}>
                                <Heading fontSize={"35px"} fontWeight={"extrabold"}>
                                    {data.username}
                                </Heading>
                            </Flex>
                            <Flex fontSize={"17px"} mt={"5px"} justifyContent={"center"}>
                                <Text fontFamily={"monospace"}>
                                    {data.email}
                                </Text>
                            </Flex>
                            {data.isAdmin ? (
                                <Flex mt={"10px"} justifyContent={"center"}>
                                    <Text textAlign={"center"} boxShadow={"0px 0px 10px grey"} justifyContent={"center"} bgColor={"green.300"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"} fontFamily={"monospace"}>
                                        Admin
                                    </Text>
                                </Flex>
                            ) : (
                                <Flex mt={"10px"} justifyContent={"center"}>
                                    <Text textAlign={"center"} boxShadow={"0px 0px 10px grey"} justifyContent={"center"} bgColor={"green.300"} h={"30px"} w={"100px"} lineHeight={"30px"} color={"white"} borderRadius={"5px"} fontFamily={"monospace"}>
                                        Cashier
                                    </Text>
                                </Flex>
                            )}
                        </Box>
                    </Flex>
                </Flex>
            </Flex>

        </>
    )
}