import { Box, Text } from "@chakra-ui/react";

export const ErrorPage = () => {
    return (
        <Box w={"full"} h={"100vh"} bgGradient="linear(#FFC900, #FFEA61)" justifyContent={"center"}>
            <Text pt={"200px"} fontFamily={"Times New Roman"} fontWeight={"extrabold"} fontSize={{ base: '62px', md: '120px', lg: '120px' }} display={"flex"} justifyContent={"center"}>
                Error 404: Page Not Found.
            </Text>
            <Text fontFamily={"Times New Roman"} fontSize={{ base: '13px', md: '20px', lg: '20px' }} display={"flex"} justifyContent={"center"}>
                Oops! Looks like this page doesn't exist.
            </Text>
        </Box>
    );
};