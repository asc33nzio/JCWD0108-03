import Axios from "axios";
import React, { useState } from "react";
import * as Yup from "yup";
import { Box, Button, Flex, FormControl, FormLabel, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, useToast } from "@chakra-ui/react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useParams } from "react-router-dom";

export const EditProduct = ({
    productName,
    price,
    description,
    stock,
}) => {
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const params = useParams();
    const [file, setFile] = useState(null);

    const editSchema = Yup.object().shape({
        productName: Yup.string().required("Product name is required!"),
        description: Yup.string().required("Description is required!"),
        price: Yup.string().required("Price is required!"),
        stock: Yup.string().required("Stock is required!"),
        imgURL: Yup.string().required("Product Image is required!"),
    });

    const update = async (values) => {
        try {
            const formData = new FormData();
            const { productName, price, description, stock } = values;
            formData.append("productName", productName);
            formData.append("price", price);
            formData.append("description", description);
            formData.append("stock", stock);
            formData.append("imgURL", file);
            await Axios.patch(
                `http://localhost:8000/api/products/${params.id}`,
                formData
            );
            toast({
                title: "Success!",
                description: "Edit Product Success!",
                status: 'success',
                duration: 1000,
                isClosable: true,
                position: "top"
            });
            setTimeout(() => {
                window.location.reload();
            }, 1000)
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <Box>
            <Flex
                cursor={"pointer"}
                _hover={{ transform: "scale(0.95)" }}
                boxShadow={"0px 0px 3px #FFC900"}
                bgColor={"yellow.400"}
                h={{ base: "15px", sm: "20px", md: "25px", lg: "30px" }}
                color={"white"}
                w={{ base: "40px", sm: "50px", md: "60px", lg: "70px" }}
                borderRadius={"5px"}
                align={"center"}
                justifyContent={"center"}
                transition={"0.3s"}
                onClick={onOpen}
            >
                Edit
            </Flex>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader fontWeight={"thin"}>
                        Update Product Details
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <Formik
                            initialValues={{
                                productName: productName,
                                price: price,
                                stock: stock,
                                description: description,
                            }}
                            validationSchema={editSchema}
                            onSubmit={(values) => {
                                update(values);
                            }}
                        >
                            {({ dirty }) => (
                                <Form>
                                    <FormControl>
                                        <FormLabel>Nama Produk</FormLabel>
                                        <Input
                                            as={Field}
                                            defaultValue={productName}
                                            name="productName"
                                            placeholder="Enter a new product name"
                                        />
                                        <ErrorMessage component="box" name="productName" style={{ color: "red", marginTop: "-8px" }} />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Description</FormLabel>
                                        <Input
                                            defaultValue={description}
                                            as={Field}
                                            name="description"
                                            placeholder="Enter a new product description"
                                        />
                                        <ErrorMessage component="box" name="description" style={{ color: "red", marginTop: "-8px" }} />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Price</FormLabel>
                                        <Input
                                            defaultValue={price}
                                            as={Field}
                                            name="price"
                                            placeholder="Enter a new price"
                                        />
                                        <ErrorMessage component="box" name="price" style={{ color: "red", marginTop: "-8px" }} />
                                    </FormControl>

                                    <FormControl mt={4}>
                                        <FormLabel>Stock</FormLabel>
                                        <Input
                                            defaultValue={stock}
                                            as={Field}
                                            name="stock"
                                            placeholder="Update stock quantity"
                                        />
                                        <ErrorMessage component="box" name="stock" style={{ color: "red", marginTop: "-8px" }} />
                                    </FormControl>
                                    <Field name="imgURL">
                                        {({ field }) => (
                                            <FormControl mt={4}>
                                                <FormLabel>Product image</FormLabel>
                                                <Input
                                                    {...field}
                                                    onChange={(e) => {
                                                        field.onChange(e);
                                                        setFile(e.target.files[0]);
                                                    }}
                                                    as={Field}
                                                    type="file"
                                                    name="imgURL"
                                                    placeholder="Update product's image"
                                                />
                                                <ErrorMessage component="box" name="imgURL" style={{ color: "red", marginTop: "-8px" }} />
                                            </FormControl>
                                        )}
                                    </Field>
                                    <Button
                                        type="submit"
                                        colorScheme="yellow"
                                        color="white"
                                        mr={3}
                                        mt={5}
                                        isDisabled={!dirty}
                                    >
                                        Save Changes
                                    </Button>
                                </Form>
                            )}
                        </Formik>
                    </ModalBody>
                    <ModalFooter>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    );
};
