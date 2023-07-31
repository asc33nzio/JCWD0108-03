import { Box, Button, useToast } from "@chakra-ui/react"
import Axios from "axios"

export const DeleteButton = ({ id }) => {
    const toast = useToast();
    const token = localStorage.getItem("token");
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
            <Button onClick={onDelete} ml={"5px"} color={"white"} bg={"red"}>Delete</Button>
        </Box>
    )
}