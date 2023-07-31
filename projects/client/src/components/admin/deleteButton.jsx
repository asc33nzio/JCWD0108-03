import { Box, Button, useDisclosure, useToast } from "@chakra-ui/react"
import Axios from "axios"
import { Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, } from '@chakra-ui/react'
import { DeleteIcon } from "@chakra-ui/icons";

export const DeleteButton = ({ id }) => {
    const toast = useToast();
    const token = localStorage.getItem("token");
    const { isOpen, onOpen, onClose } = useDisclosure();
    const onDelete = async () => {
        try {
            const response = await Axios.delete(`http://localhost:8000/api/admin/deletecashier/${id}`, {
                headers: { Authorization: `Bearer ${token}` },
                "content-Type": "Multiple/form-data"
            });
            console.log(id);
            console.log(response);
            toast({
                title: "Success",
                description: "Delete Cashier success!",
                status: 'success',
                duration: 1000,
                isClosable: true,
                position: "top"
            })
            setTimeout(() => {
                window.location.reload()
            }, 1000);
        } catch (err) {
            console.log(err);
        }
    }
    return (
        <Box>
            <Button borderRadius={"70px"} onClick={onOpen} ml={"5px"} color={"white"} bg={"red"}><DeleteIcon/></Button>
            <Modal closeOnOverlayClick={false} isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader borderTopRadius={"5px"} bg={"#FFC900"}>Delete Cashier</ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        Are you sure want to delete this cashier?
                    </ModalBody>

                    <ModalFooter>
                        <Button onClick={onDelete} mr={"5px"} color={"white"} bg={"red"}>Delete</Button>
                        <Button onClick={onClose}>Cancel</Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>

    )
}