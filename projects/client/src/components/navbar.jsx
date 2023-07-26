import { Box, Button, Flex, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const Navbar = () => {
    return (
        <Box position={"fixed"}>
            <Flex p={{base:'25px', sm:'40px'}} alignItems={"center"} w={{base:'100vw', md:'100vw', sm:'100vw', lg:'100vw'}} h={{base:"10px", sm:'30px'}} bgColor={"#FFC900"} boxShadow={"0px 2px 7px #ACACAC"} >
                <Box w={"20%"}>
                    {/* <Box color={"white"} fontSize={"30px"}>CASHIERKEUN</Box> */}
                </Box>
                <Flex justifyContent={"center"} w={"60%"} mx={{base:'10px', sm:'10px', }}>
                    <Input bgColor={"white"} w={{base:'200px',  sm:'400px', md:'500px', lg:'600px'}} borderRightRadius={"0px"} h={{sm:'40px', md:'40px', lg:'40px', base:'30px'}}/>
                    <Flex _active={{transition:"0.1s", transform:"scale(0.95)"}} cursor={"pointer"} bgColor={"#D5AD18"} alignItems={"center"} p={"10px"} borderRightRadius={"5px"} color={"white"} h={{base:'30px', sm:'40px', md:'40px'}}>
                        <SearchIcon />
                    </Flex>
                </Flex>
                <Flex justifyContent={"end"} w={"20%"}>
                    <Button bgColor={"#D5AD18"} color={"white"} fontSize={{base:'15px'}} _hover={{bgColor:"#D5AD40"}} _active={{transition:"0.1s", transform:"scale(0.95)"}} cursor={"pointer"} h={{base:'30px',sm:'40px', md:'40px'}}>Login</Button>
                </Flex>
            </Flex>
        </Box>
    )
}