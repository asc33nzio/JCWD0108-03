import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure } from "@chakra-ui/react";
import Axios from "axios";
import { AddIcon } from "@chakra-ui/icons";
import { Formik, Form, Field } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const AddProduct = () => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const params = useParams()

    const [file, setFile] = useState(null);
    const token = localStorage.getItem('token')

    const handleSubmit = async (value) => {
        try {
            const formData = new FormData();
            const { productName, price, description, stock } = value;
            formData.append('productName', {productName}.productName);
            formData.append('price', price);
            formData.append('productImage', file);
            formData.append('description', description);
            formData.append('CategoryId', params.categoryId);
            formData.append('stock', stock);

            await Axios.post(`http://localhost:8000/api/products/addProduct`, formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-type": "multipart/form-data"
                })
                window.location.reload()
        } catch (error) {
            console.log(error);
        };
    };

    return(
        <Box>
            <Box >
                <Button h={{ base: '100px', sm: '150px', md: '180px' }} w={{ base: '80px', sm: '120px', md: '160px' }} onClick={onOpen} color={"white"} bgColor={"gray.300"} fontSize={"50px"}><AddIcon /></Button>
            </Box>
            <Formik
                initialValues={{
                    productName: "",
                    price: "",
                    category : "",
                    description:"",
                    CategoryId :"",
                    productImage: null
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
                                            <FormLabel>New Product</FormLabel>
                                            <Input name="productName" as={Field} placeholder='Enter New Product' />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Price</FormLabel>
                                            <Input name="price" as={Field} placeholder='Enter Price Product' />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Description</FormLabel>
                                            <Input name="description" as={Field} placeholder='Enter Description Product' />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Stock</FormLabel>
                                            <Input name="stock" as={Field} placeholder='Enter Stock Product' />
                                        </FormControl>
                                        <Field name="categoryImage">
                                            {({ field }) => (

                                                <FormControl mt={4}>
                                                    <FormLabel>Image Product</FormLabel>
                                                    <Input
                                                        {...field}
                                                        onChange={(e) => {
                                                            field.onChange(e);
                                                            setFile(e.target.files[0]);
                                                        }} name="productImage" as={Field} type="file" />
                                                </FormControl>
                                            )}
                                        </Field>
                                    </ModalBody>

                                    <ModalFooter>
                                        <Button type="submit" onClick={handleSubmit} colorScheme='yellow' color={"white"} mr={3}>
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
} 