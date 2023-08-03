import { Avatar, Box, Flex, IconButton, Img, Input, Text, useToast } from "@chakra-ui/react";
import { HamburgerIcon, SearchIcon } from "@chakra-ui/icons";
import { Menu, MenuButton, MenuList, MenuItem, Portal } from '@chakra-ui/react'
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import AAA_Logo from '../public/aaa_studio_transparent.png';

export const Navbar = () => {
    const navigate = useNavigate();
    const toast = useToast();
    const data = useSelector((state) => state.user.value);

    const onLogout = () => {
        localStorage.removeItem("token")
        toast({
            title: "Good Bye!",
            description: "You Have Logged Out!",
            colorScheme: "red",
            status: 'success',
            duration: 1500,
            isClosable: true,
            position: "top"
        });
        setTimeout(() => {
            navigate("/");
        }, 1500);
    }
    return (
        <Box zIndex={"100"} position={"fixed"}>
            <Flex boxShadow={"0px 0px 10px grey"} p={{ base: '25px', sm: '40px' }} alignItems={"center"} w={{ base: '100vw', md: '100vw', sm: '100vw', lg: '100vw' }} h={{ base: "10px", sm: '30px' }} bgColor={"#FFC900"} >
                <Box w={"20%"}>
                    <Box as={Link} to={"/"} color={"white"} fontSize={"30px"} fontWeight={"thin"} textShadow={"0px 0px 5px white"}>
                        <Img src={AAA_Logo} mt={"12px"} w={"90px"} />
                    </Box>
                </Box>
                <Flex justifyContent={"center"} w={"60%"} _focus={{ borderColor: '#D5AD18', boxShadow: 'none', transform: 'scale(1.01)' }}>
                </Flex>
                <Flex justifyContent={"end"} align={"center"} w={"20%"}>
                    <Flex cursor={"pointer"} onClick={() => navigate("/search")} _active={{ transition: "0.1s", transform: "scale(0.95)" }} alignItems={"center"} p={"10px"} borderRadius={"5px"} color={"white"} h={{ base: '30px', sm: '40px', md: '40px' }}>
                        <SearchIcon boxSize={{base:"25px"}} />
                    </Flex>
                    <Avatar as={Link} to={"/profile"} left={"20px"} boxShadow={"0px 0px 10px grey"} src={`http://localhost:8000/avatars/${data.avatar}`} bgColor={"gray.400"} colorScheme={"#FFC900"} />
                    <Menu>
                        <MenuButton as={IconButton} left={"28px"}
                            mt={"3px"}
                            color={"white"}
                            aria-label='Options'
                            icon={<HamburgerIcon />}
                            variant="unstyled">
                        </MenuButton>
                        <Portal>
                            <MenuList boxShadow={"0px 0px 5px grey"} zIndex={100}>
                                <MenuItem>
                                    <Box mt={"2px"}>
                                        <Text fontWeight={"bold"}>{data.username}</Text>
                                        <Text fontSize={"12px"}>{data.email}</Text>
                                    </Box>
                                </MenuItem>
                                <MenuItem as={Link} to="/cashier">Home</MenuItem>
                                <MenuItem as={Link} to="/profile">Profile</MenuItem>
                                {data.isAdmin ? (
                                    <Box>
                                        <MenuItem x as={Link} to="/cashierlist">Cashier List</MenuItem>
                                        <MenuItem>Sales Report</MenuItem>
                                    </Box>
                                ) : (null)}
                                <MenuItem fontWeight={"bold"} color={"red"} onClick={onLogout}>Log Out</MenuItem>
                            </MenuList>
                        </Portal>
                    </Menu>
                </Flex>
            </Flex>
        </Box>
    )
}