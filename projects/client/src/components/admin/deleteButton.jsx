import { Box, Button, useToast } from "@chakra-ui/react"
import Axios from "axios"

export const DeleteButton = ({id}) => {
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
                description: "Delete blog success!",
                status: 'success',
                duration: 2500,
                isClosable: true,
                position: "top"
            })
            window.location.reload()
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