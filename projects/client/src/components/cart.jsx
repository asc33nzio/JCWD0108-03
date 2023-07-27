import { Box, Button, Flex } from "@chakra-ui/react"

export const Cart = () => {
    return(
        <Box>
            <Box borderBottomRadius={"0px"} borderTopRadius={"10px"} bgGradient={"linear(yellow.700,#FFC900)"} ml={{base:'10px', sm:'25px', md:'80px'}} w={{base:'155px', sm:'180px', md:'220px', lg:'300px', xl:'500px'}}>
                <Flex justifyContent={"center"} p={"20px"} fontWeight={"bold"} fontSize={{base:'20px', sm:'25px', md:'35px', lg:'40px'}} color={"white"}>List Order </Flex>
                <Box w={{base:'155px', sm:'180px', md:'220px', lg:'300px', xl:'500px'}} h={"3px"} bgColor={"white"}></Box>
                <Box p={"20px"}>
                    <Flex justifyContent={"space-between"} fontSize={{base:"10px", sm:"13px", md:"18px", lg:"25px"}} borderBottom={"1px solid white"} pb={"10px"} fontWeight={"hairline"} color={"white"}>
                        <Box>Coffee Latte</Box>
                        <Box>Rp.30.000.00</Box>
                    </Flex>
                    <Flex justifyContent={"space-between"} fontSize={{base:"10px", sm:"13px", md:"18px", lg:"25px"}} borderBottom={"1px solid white"} pb={"10px"} fontWeight={"hairline"} color={"white"}>
                        <Box>Fried Rice</Box>
                        <Box>Rp.45.000.00</Box>
                    </Flex>
                    <Flex justifyContent={"space-between"} fontSize={{base:"10px", sm:"13px", md:"18px", lg:"25px"}} borderBottom={"1px solid white"} pb={"10px"} fontWeight={"hairline"} color={"white"}>
                        <Box>Dumpling</Box>
                        <Box>Rp.20.000.00</Box>
                    </Flex>
                    <Flex justifyContent={"space-between"} fontSize={{base:"10px", sm:"13px", md:"18px", lg:"25px"}} borderBottom={"1px solid white"} pb={"10px"} fontWeight={"hairline"} color={"white"}>
                        <Box>Cappucino</Box>
                        <Box>Rp.35.000.00</Box>
                    </Flex>
                    <Flex mt={"20px"} justifyContent={"space-between"} fontWeight={"semibold"} fontSize={{base:"12px", sm:"16px", md:"20px", lg:"25px"}} color={"white"} >
                        <Box >Total</Box>
                        <Box>Rp.130.000.00</Box>
                    </Flex>
                </Box>        
            </Box>
            <Flex justifyContent={"end"} p={"20px"} borderTopRadius={"0px"} borderBottomRadius={"10px"} bgColor={"#FFC900"} ml={{base:'10px', sm:'25px', md:'80px'}} w={{base:'155px', sm:'180px', md:'220px', lg:'300px', xl:'500px'}}>
                <Button color={"#FFC900"}>Charge</Button>
            </Flex>
        </Box>
        )
}