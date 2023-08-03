import Axios from "axios";
import { Box, Button, Flex, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useState } from "react";

export const Forgot = () => {
    const [email, setEmail] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const { token } = useParams();
    const header = {
        Authorization: `Bearer ${token}`
    }
    const getResetPassword = async () => {
        try {
            const response = await Axios.put("http://localhost:8000/api/users/forget", {
                email: email,
            }, { headers: header });

            setTimeout(() => {
                navigate("/");
            }, 1000)
            toast({
                title: "Check your Email to Reset your Password!",
                description: "Sent to your Email!",
                status: 'success',
                duration: 2500,
                isClosable: true,
                position: "top"
            });
            console.log(response.data);
        } catch (err) {
            console.log(err);
            toast({
                title: "Access Denied!",
                description: err.response.data.error.message,
                status: "error",
                duration: 2500,
                isClosable: true,
                position: "top"
            });
            
        }
    }
    return (
        <>
            <Flex w={"full"} h={"100vh"} bgGradient="linear(#FFC900, #FFEA61)" justifyContent={"center"}>
                <Box m={"auto"} bg={"white"} w={{ base: '250px', md: '500px', lg: '600px', xl: "600px" }} h={"350px"} border={"2px solid"} borderColor={"black"} borderRadius={"10px"} boxShadow={"0px 0px 10px black"} justifyContent={"center"}>
                    <Flex justifyContent={"center"}>
                        <Heading mt={"50px"} color={"#D5AD18"} fontSize={{ base: '20px', md: '40px', lg: '40px' }} fontFamily={"Times New Roman"}>Forgot your Password?</Heading>
                    </Flex>
                    <Flex mt={"25px"} fontSize={{ base: '8px', md: '12px', lg: '12px' }} justifyContent={"center"} >
                        <Text display={"flex"}>
                            Write your Email to reset your Password!
                        </Text>
                    </Flex>
                    <Flex mt={"20px"} justifyContent={"center"}>
                        <Input 
                          value={email}
                          onChange={(input) => setEmail(input.target.value)}
                          onKeyDown={(event) => {
                              if (event.key === "Enter") {
                                getResetPassword();
                              }
                            }}
                        w={{ base: '200px', md: '400px', lg: '400px' }} placeholder="Email" size={"md"} variant={"flushed"} color={"black"} borderBottom={"2px solid"} borderColor={"#D5AD18"} />
                    </Flex>
                    <Flex mt={"30px"} justifyContent={"center"}>
                        <Button type="submit" onClick={getResetPassword} fontFamily={"monospace"} boxShadow='0px 0px 6px black' color={"black"} bgGradient="linear(#FFEA61, #FFC900)" w={"200px"}>
                            Submit
                        </Button>
                    </Flex>
                    <Flex m={"25px"} fontSize={{ base: '10px', md: '12px', lg: '12px' }} justifyContent={"center"} >
                        <Text display={"flex"}>
                            Already have an account?
                            <Link to="/">
                                <Text _hover={{ color: "#FFEA61" }} color={"#FFC900"}>‎ Sign In.</Text>
                            </Link>
                        </Text>
                    </Flex>
                </Box>
            </Flex>
        </>
    );
}