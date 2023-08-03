import Axios from 'axios';
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { Avatar, Box, Button, Flex, Heading, Input, Text, useToast } from "@chakra-ui/react"
import { Navbar } from "../components/navbar"
import { useSelector } from "react-redux";
import { useState } from "react";
import { useNavigate } from 'react-router';
import { AddIcon } from '@chakra-ui/icons';

export const Profile = ({ id }) => {
    const navigate = useNavigate();
    const toast = useToast();
    const token = localStorage.getItem("token");
    const data = useSelector((state) => state.user.value);
    const [file, setFile] = useState(null);
    const Formschema = Yup.object().shape(({
        avatar: Yup.string()
            .required("Add image"),
    }));
    const handleCreate = async (value) => {
        try {
            const data = new FormData();
            data.append("avatar", file);
            await Axios.patch(`http://localhost:8000/api/users/updateprofile`, data, {
                headers: { Authorization: `Bearer ${token}` },
                "content-Type": "Multiple/form-data"
            });
            toast({
                title: "Profile Updated!",
                description: "Your Profile Updated!",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top"
            });
            window.location.reload();
            navigate("/profile");
        } catch (err) {
            console.log(err);
        }
    }
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
                            <Formik
                                initialValues={{ avatar: null }}
                                validationSchema={Formschema}
                                onSubmit={(value, action) => {
                                    handleCreate(value);
                                }}>
                                {(props) => {
                                    return (
                                        <>
                                            <Flex position={"relative"} as={Form}
                                                justifyContent={"center"}>
                                                <Field name="avatar" >
                                                    {({ field }) => (
                                                        <>
                                                            <label htmlFor="customFileInput" >
                                                                <Text h={"25px"} mt={"-28px"} ml={"80px"} position={"absolute"} fontSize={"12px"} as="span" bg="gray.500" color="white" px={"7px"} pb={"5px"} pt={"2px"} borderRadius="md" cursor="pointer" _hover={{ bg: 'green.600' }}>
                                                                    <AddIcon />
                                                                </Text>
                                                            </label>
                                                            <Input
                                                                {...field}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    setFile(e.target.files[0]);
                                                                }}
                                                                placeholder='Photo' name='avatar'
                                                                type="file"
                                                                id="customFileInput"
                                                                style={{ display: 'none' }} />
                                                        </>
                                                    )}
                                                </Field>
                                                <Flex justifyContent={'center'}>
                                                    <Button isDisabled={!props.dirty} type='submit' w={"80px"} h={"30px"} lineHeight={"30px"} mt={"20px"} cursor="pointer" _hover={{ bg: 'green.600' }} fontSize={"17px"} bg="yellow.500" color="white">Save</Button>
                                                </Flex>
                                            </Flex>
                                        </>
                                    );
                                }}
                            </Formik>
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