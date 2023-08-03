import * as Yup from "yup";
import Axios from "axios";
import { Box, Button, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Toast, useDisclosure, useToast } from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useState } from "react";
import { useParams } from "react-router-dom";

export const AddProduct = () => {
    const { onClose, onOpen, isOpen } = useDisclosure();
    const [file, setFile] = useState(null);
    const params = useParams()
    const token = localStorage.getItem('token')
    const toast = useToast()

    const addProductSchema = Yup.object().shape({
        productName: Yup.string().required("product name is required!"),
        description: Yup.string().required("description is required!"),
        price: Yup.string().required("price is required!"),
        stock: Yup.number().required("stock is required!"),
        productImage: Yup.string().required("image product is required!"),
    })

    const handleSubmit = async (value) => {
        try {
            const formData = new FormData();
            const { productName, price, description, stock } = value;
            formData.append('productName', { productName }.productName);
            formData.append('price', price);
            formData.append('productImage', file);
            formData.append('description', description);
            formData.append('CategoryId', params.categoryId);
            formData.append('stock', stock);

            const response = await Axios.post(`http://localhost:8000/api/products/addProduct`, formData,
                {
                    headers: { Authorization: `Bearer ${token}` },
                    "Content-type": "multipart/form-data"
                })
                toast({
                    title: "Success!",
                    description: "Add Product Success!",
                    status: 'success',
                    duration: 500,
                    isClosable: true,
                    position: "top"
                });
                setTimeout(() => {
                    window.location.reload();
                }, 500)
        } catch (error) {
            console.log(error);
        };
    };

    return (
        <Box>
            <Box >
                <Button h={{ base: '100px', sm: '150px', md: '180px' }} w={{ base: '80px', sm: '120px', md: '160px' }} onClick={onOpen} color={"white"} bgColor={"gray.300"} fontSize={"50px"}><AddIcon /></Button>
            </Box>


            <Modal
                isOpen={isOpen}
                onClose={onClose}
            >

                <Formik
                    initialValues={{
                        productName: "",
                        price: "",
                        category: "",
                        description: "",
                        CategoryId: "",
                        stock: "",
                        productImage: null
                    }}
                    validationSchema={addProductSchema}
                    onSubmit={(value) => {
                        handleSubmit(value)
                        // console.log(value);
                    }}
                >
                    {(props) => {
                        return (
                            <Form>
                                <ModalOverlay />
                                <ModalContent>
                                    <ModalHeader fontWeight={"bold"} color={"yellow.500"} >Add New Product</ModalHeader>
                                    <ModalCloseButton />
                                    <ModalBody pb={6}>
                                        <FormControl>
                                            <FormLabel>New Product</FormLabel>
                                            <Input name="productName" as={Field} placeholder='Enter New Product' />
                                            <ErrorMessage component="box" name="productName" style={{ color: "red", marginTop: "-8px" }} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Price</FormLabel>
                                            <Input name="price" as={Field} placeholder='Enter Price Product' />
                                            <ErrorMessage component="box" name="price" style={{ color: "red", marginTop: "-8px" }} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Description</FormLabel>
                                            <Input name="description" as={Field} placeholder='Enter Description Product' />
                                            <ErrorMessage component="box" name="description" style={{ color: "red", marginTop: "-8px" }} />
                                        </FormControl>
                                        <FormControl>
                                            <FormLabel>Stock</FormLabel>
                                            <Input name="stock" as={Field} placeholder='Enter Stock Product' />
                                            <ErrorMessage component="box" name="stock" style={{ color: "red", marginTop: "-8px" }} />
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
                                                    <ErrorMessage component="box" name="imgURL" style={{ color: "red", marginTop: "-8px" }} />
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
                        )
                    }}
                </Formik>
            </Modal>
        </Box>
    )
};