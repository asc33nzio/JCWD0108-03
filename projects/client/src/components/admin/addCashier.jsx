import Axios from 'axios';
import * as Yup from "yup";
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRef, useState } from 'react'
import { useNavigate } from "react-router-dom";
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Input, FormControl, FormLabel, useToast, Flex, Box, } from '@chakra-ui/react';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';

export default function AddCashier() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [file, setFile] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
    const [success, setSuccess] = useState();
    const [show, setShow] = useState(false);
    const handleClick = () => setShow(!show);
    const Formschema = Yup.object().shape(({
        username: Yup.string()
            .required("Write your name"),
        email: Yup.string()
            .email("Invalid email addres format")
            .required("Write your Email"),
        password: Yup.string()
            .required("Password is required")
            .min(6, "Paasowrd min 6 ")
            .matches(/^(?=.*[A-Z])/, "Password Must Contain 1 Capital")
            .matches(/^(?=.*(\W|_))/, "Password Must Contain 1 Symbol")
            .matches(/.*[0-9].*/, "Password Must Contain 1 number"),
        avatar: Yup.string()
            .required("Add image"),
    }));
    const handleCreate = async (value) => {
        try {
            const data = new FormData();
            const { username, email, password } = value;
            data.append("username", { username }.username);
            data.append("email", { email }.email);
            data.append("password", { password }.password);
            data.append("avatar", file);
            const response = await Axios.post("http://localhost:8000/api/admin", data, {
                headers: { Authorization: `Bearer ${token}` },
                "content-Type": "Multiple/form-data"
            });
            setSuccess(true);
            toast({
                title: "New Cashier!",
                description: "Your Cashier Data uploaded!",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top"
            });
            window.location.reload();
            navigate("/cashierlist");
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Button boxShadow={"0px 0px 5px grey"} bg={"#D5AD18"} color={"white"} w={{ base: '200px', md: '200px', lg: '200px' }} onClick={onOpen}>Add Cashier</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose} >
                <ModalOverlay />
                <ModalContent borderRadius={"10px"}>
                    <ModalHeader borderTopRadius={"10px"} bg={"#FFC900"}>Create a New Cashier Account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={{ username: "", email: "", password: "", avatar: null }}
                            validationSchema={Formschema}
                            onSubmit={(value, action) => {
                                console.log(value);
                                handleCreate(value);
                                if (success) action.resetForm();
                            }}>
                            {() => {
                                return (
                                    <Form>
                                        <FormControl>
                                            <FormLabel>Username</FormLabel>
                                            <Field as={Input} ref={initialRef} variant={"flushed"} placeholder='Abcde' name="username" borderBottom={"1px solid"} borderColor={"#D5AD18"} />
                                            <ErrorMessage component="Box" name="username" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Email</FormLabel>
                                            <Field as={Input} variant={"flushed"} placeholder='Abcde@gmail.com' name='email' borderBottom={"1px solid"} borderColor={"#D5AD18"} />
                                            <ErrorMessage component="Box" name="email" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Password</FormLabel>
                                            <Flex>
                                                <Box>
                                                    <Field as={Input} name="password" w={{ base: '180px', md: '400px', lg: '400px' }} placeholder="Password" size={"md"} type={show ? 'text' : 'password'} variant={"flushed"} color={"black"} borderBottom={"1px solid"} borderColor={"#D5AD18"} />
                                                    <ErrorMessage
                                                        component="box"
                                                        name="password"
                                                        style={{ color: "red", marginBottom: "-18px", marginTop: "-8px" }} />
                                                </Box>

                                                <Button right={"30px"} variant={"unstyled"} size='sm' onClick={handleClick}>
                                                    {show ? <ViewIcon /> : <ViewOffIcon />}
                                                </Button>
                                            </Flex>
                                        </FormControl>
                                        <Field name="avatar">
                                            {({ field }) => (
                                                <FormControl mt={4}>
                                                    <FormLabel>Photo</FormLabel>
                                                    <Input mb={"10px"}  {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFile(e.target.files[0]);
                                                        }} variant={"flushed"} borderBottom={"1px solid"} borderColor={"#D5AD18"} placeholder='Photo' name='avatar' as={Field} type='file' />
                                                    <ErrorMessage component="Box" name="avatar" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                                </FormControl>
                                            )}
                                        </Field>
                                        <Button onClick={handleCreate} type='submit' colorScheme='yellow' mr={3}>  Add Cashier  </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal >
        </>
    )
}