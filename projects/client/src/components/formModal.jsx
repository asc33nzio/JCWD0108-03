import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, useDisclosure, Button, Input, FormControl, FormLabel, useToast, } from '@chakra-ui/react';
import Axios from 'axios';
import { ErrorMessage, Field, Form, Formik } from 'formik';
import { useRef, useState } from 'react'
import * as Yup from "yup";
import { useNavigate } from "react-router-dom";


export default function InitialFocus() {
    const { isOpen, onOpen, onClose } = useDisclosure();
    const initialRef = useRef(null);
    const finalRef = useRef(null);
    const [avatar, setFile] = useState(null);
    const toast = useToast();
    const navigate = useNavigate();
    const token = localStorage.getItem("token");
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
            data.append("username", JSON.stringify({ username }));
            data.append("email", JSON.stringify({ email }));
            data.append("password", JSON.stringify({ password }));
            data.append("avatar", JSON.stringify({ avatar }));
            const response = await Axios.post("http://localhost:8000/api/admin", data, {
                // headers: {
                //     Authorization: `Bearer ${token}`
                // },
                "content-Type": "Multiple/form-data"
            });
            toast({
                title: "New Cashier!",
                description: "Your Cashier Data uploaded!",
                status: 'success',
                duration: 1500,
                isClosable: true,
                position: "top"
            });
            navigate("/cashierlist");
            console.log(response);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <>
            <Button bg={"#D5AD18"} color={"white"} w={{ base: '200px', md: '300px', lg: '500px' }} onClick={onOpen}>Add Cashier</Button>
            <Modal
                initialFocusRef={initialRef}
                finalFocusRef={finalRef}
                isOpen={isOpen}
                onClose={onClose} >
                <ModalOverlay />
                <ModalContent borderRadius={"10px"}>
                    <ModalHeader borderTopRadius={"10px"} bg={"#FFC900"}>Create your account</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={{ username: "", email: "", password: "", avatar: null }}
                            validationSchema={Formschema}
                            onSubmit={(value, action) => {
                                console.log(value);
                                handleCreate(value);
                            }}>
                            {() => {
                                return (
                                    <Form>
                                        <FormControl>
                                            <FormLabel>Username</FormLabel>
                                            <Field as={Input} ref={initialRef} placeholder='Username' name="username" />
                                            <ErrorMessage component="Box" name="username" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Email</FormLabel>
                                            <Field as={Input} placeholder='Email' name='email' />
                                            <ErrorMessage component="Box" name="email" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Password</FormLabel>
                                            <Field as={Input} placeholder='Password' name='password' />
                                            <ErrorMessage component="Box" name="password" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                        </FormControl>
                                        <FormControl mt={4}>
                                            <FormLabel>Photo</FormLabel>
                                            <Field name="avatar">
                                                {({ field }) => (
                                                    <Input   {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFile(e.target.files[0]);
                                                        }} placeholder='Photo' type='file' />
                                                )}
                                            </Field>
                                            <ErrorMessage component="Box" name="avatar" style={{ color: "red", marginBottom: "-20px", marginLeft: "3px", marginTop: "-9px" }} />
                                        </FormControl>
                                        <Button type='submit' colorScheme='yellow' mr={3}>  Add Cashier  </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </Form>
                                );
                            }}
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </>
    )
}