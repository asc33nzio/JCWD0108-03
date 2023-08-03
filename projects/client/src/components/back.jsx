import { Box } from "@chakra-ui/react";
import { useNavigate } from "react-router";
import { ChevronLeftIcon } from "@chakra-ui/icons";

export const Back = ({ nav, id = "" }) => {
    const navigate = useNavigate();
    const backPage = () => {
        navigate(`${nav}${id}`);
    };

    return (
        <Box pt={"100px"} ml={{base:"10px"}}  ><ChevronLeftIcon _hover={{ transform: 'scale(1.1)', transition: '0.3s' }} boxSize={{base:"40px"}} color={"yellow.400"} cursor={"pointer"} onClick={backPage} /></Box>
    );
};