import { Button, Flex, Input } from "@chakra-ui/react"
import { useState } from "react";
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';


export const CashierLogin = () => {
    const [show, setShow] = useState(false)
    const handleClick = () => setShow(!show)
    return (
        <>
            <Flex justifyContent={"center"} w={{ base: '180px', md: '400px', lg: '400px' }} >
                <Input w={"400px"} placeholder="Username" size={"md"} variant={"flushed"} color={"black"} borderBottom={"2px solid"} borderColor={"#D5AD18"} />
            </Flex>
            <Flex ml={{ base: '20px', md: '-2px', lg: '30px' }} mt={"10px"} justifyContent={"center"} w={{ base: '208px', md: '500px', lg: '500px' }}>
                <Input w={"400px"} placeholder="Password" size={"md"} type={show ? 'text' : 'password'} variant={"flushed"} color={"black"} borderBottom={"2px solid"} borderColor={"#D5AD18"} />
                <Button right={"30px"} variant={"unstyled"} size='sm' onClick={handleClick}>
                    {show ? <ViewIcon /> : <ViewOffIcon />}
                </Button>
            </Flex>
            <Flex mt={"30px"} justifyContent={"center"}>
                <Button fontFamily={"Times New Roman"} boxShadow='0px 0px 6px black' color={"black"} bgGradient="linear(#FFEA61, #FFC900)" w={"200px"}>
                    Login
                </Button>
            </Flex>
        </>
    );
}