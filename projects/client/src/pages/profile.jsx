import Axios from 'axios';
import * as Yup from "yup";
import { Field, Form, Formik } from 'formik';
import { Avatar, Box, Button, Flex, Heading, Input, Text, useToast } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
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
    const Formschema = Yup.object().shape({
        avatar: Yup.string()
            .required("Add image"),
    });

    const handleCreate = async (value) => {
        try {
            const data = new FormData();
            data.append("avatar", file);
            const response = await Axios.patch(`http://localhost:8000/api/users/updateprofile`, data, {
                headers: { Authorization: `Bearer ${token}` },
                "content-Type": "Multiple/form-data"
            });
            toast({
                title: "Profile Updated!",
                description: "Your Profile Updated!",
                status: 'success',
                duration: 1000,
                isClosable: true,
                position: "top"
            });
            console.log(response);
            setTimeout(() => {
                window.location.reload();
                navigate("/profile");
            }, 1000);
        } catch (err) {
            console.log(err);
            toast({
                title: "Failed to Change your Photo Profile!",
                description: "File should be less than 1MB or File is not supported",
                status: 'error',
                duration: 3000,
                isClosable: true,
                position: "top"
            });
        }
    };

    return (
        <>
            <Navbar />
            <Flex justifyContent="center">
                <Flex justifyContent="center" mt={{ base: "50px", md: "135px" }} borderRadius="10px" boxShadow="0px 0px 6px black" bgGradient="linear(yellow.500,#FFC900)" w={{ base: "90%", md: "700px" }} h="450px">
                    <Flex mt="48px" borderRadius="10px" justifyContent="center" boxShadow="0px 0px 6px black" bg="white" w="90%" h="350px">
                        <Box mr={{ base: 0, md: "45px" }}>
                            <Flex mt="20px" justifyContent="center" >
                                <Avatar src={`http://localhost:8000/avatars/${data.avatar}`} mt="25px" boxShadow="0px 0px 4px black" bg="grey" w={{ base: "100px", md: "230px" }} h={{ base: "100px", md: "230px" }} />
                            </Flex>
                            <Formik
                                initialValues={{ avatar: null }}
                                validationSchema={Formschema}
                                onSubmit={(value, action) => {
                                    handleCreate(value);
                                }}>
                                {(props) => {
                                    return (
                                        <Form>
                                            <Flex position="relative" justifyContent="center">
                                                <Field name="avatar">
                                                    {({ field }) => (
                                                        <>
                                                            <label htmlFor="customFileInput">
                                                                <Text h="25px" mt="-28px" ml="80px" position="absolute" fontSize="12px" as="span" bg="gray.500" color="white" px="7px" pb="5px" pt="2px" borderRadius="md" cursor="pointer" _hover={{ bg: 'green.600' }}>
                                                                    <AddIcon />
                                                                </Text>
                                                            </label>
                                                            <Input
                                                                {...field}
                                                                onChange={(e) => {
                                                                    field.onChange(e);
                                                                    setFile(e.target.files[0]);
                                                                }}
                                                                placeholder="Photo"
                                                                name="avatar"
                                                                type="file"
                                                                id="customFileInput"
                                                                style={{ display: 'none' }}
                                                            />
                                                        </>
                                                    )}
                                                </Field>
                                                <Flex justifyContent="center">
                                                    <Button isDisabled={!props.dirty} type="submit" w="80px" h="30px" lineHeight="30px" mt="20px" cursor="pointer" _hover={{ bg: 'green.600' }} fontSize="17px" bg="yellow.500" color="white">Save</Button>
                                                </Flex>
                                            </Flex>
                                        </Form>
                                    );
                                }}
                            </Formik>
                        </Box>
                        <Box mt={{ base: "20px", md: "93px" }}>
                            <Flex mt="15px" justifyContent="center">
                                <Heading fontSize="35px" fontWeight="extrabold">
                                    {data.username}
                                </Heading>
                            </Flex>
                            <Flex fontSize="17px" mt="5px" justifyContent="center">
                                <Text fontFamily="monospace">
                                    {data.email}
                                </Text>
                            </Flex>
                            <Flex mt="10px" justifyContent="center">
                                <Text textAlign="center" boxShadow="0px 0px 10px grey" justifyContent="center" bgColor="green.300" h="30px" w="100px" lineHeight="30px" color="white" borderRadius="5px" fontFamily="monospace">
                                    {data.isAdmin ? "Admin" : "Cashier"}
                                </Text>
                            </Flex>
                        </Box>
                    </Flex>
                </Flex>
            </Flex>
        </>
    );
};
