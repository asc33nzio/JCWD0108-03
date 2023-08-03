import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import { useState } from "react";

export const AddCategory = () => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const [file, setFile] = useState(null);
    const token = localStorage.getItem('token')

    const handleSubmit = async (value) => {
        try {
            const formData = new FormData();
            const { name } = value;
            formData.append('name', { name }.name);
            formData.append('categoryImage', file)
            console.log([...formData]);
            await Axios.post(`http://localhost:8000/api/products/addCategory`, formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-type": "multipart/form-data"
                });
            window.location.reload();
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <Box >
            <Box  >
                <Button h={{ base: '70px', sm: '150px', md: '180px' }} w={{ base: '70px', sm: '120px', md: '160px' }} onClick={onOpen} color={"white"} bgColor={"gray.300"} fontSize={"50px"}><AddIcon /></Button>
            </Box>
            <Formik
                initialValues={{
                    name: "",
                    categoryImage: ""
                }}
                onSubmit={(value) => {
                    handleSubmit(value)
                }}
            >
                {(props) => {
                    return (


                        <Modal
                            isOpen={isOpen}
                            onClose={onClose}
                        >
                            <Form>

                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader fontWeight={"bold"} color={"yellow.500"} >Add New Category</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl>
                                            <FormLabel>New Category</FormLabel>
                                            <Input name="name" as={Field} placeholder='Enter New Category' />
                                        </FormControl>
                                        <Field name="categoryImage">
                                            {({ field }) => (
                                                <FormControl mt={4}>
                                                    <FormLabel>Image Category</FormLabel>
                                                    <Input
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFile(e.target.files[0]);
                                                        }} name="categoryImage" as={Field} type="file" />
                                                </FormControl>
                                            )}
                                        </Field>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button type="submit" colorScheme='yellow' color={"white"} mr={3}>
                                            Create
                                        </Button>
                                        <Button onClick={onClose}>Cancel</Button>
                                    </ModalFooter>
                                </ModalContent>
                            </Form>
                        </Modal>
                    )
                }}
            </Formik>
        </Box>
    )
};