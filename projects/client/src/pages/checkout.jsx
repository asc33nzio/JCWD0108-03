import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import { Navbar } from "../components/navbar";
import { Back } from "../components/back";
import { useNavigate } from "react-router";

export const Checkout = () => {
    const transactionData = useSelector((state) => state.transaction.transactionData);
    const navigate = useNavigate();

    const totalAmount = transactionData?.transaction?.totalAmount || 0;

    return (
        <Box height="100vh" width="100vw">
            <Navbar />
            <Flex height="100%" width="100%" align="center" justify="center">
                <Back nav={"/cashier"} />
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    pt={"100px"}
                    pb="40px"
                    border="10px inset black"
                    borderRadius="20px"
                    mt={'25px'}
                >
                    <Text fontWeight="bold" fontSize="24px" mb="20px">
                        Receipt
                    </Text>
                    {/* Render the breakdown items */}
                    {transactionData?.breakdown?.map((item, index) => (
                        <Flex key={index} justifyContent="space-between" mb="10px" width="300px">
                            <Text>{`${item.productName} x ${item.quantitySold}`}</Text>
                            <Text>{`Rp. ${item.totalAmount.toLocaleString("id-ID")},00`}</Text>
                        </Flex>
                    ))}
                    <Text fontWeight="bold" fontSize="18px" mt="20px">
                        Total Amount: Rp. {totalAmount.toLocaleString("id-ID")},00
                    </Text>
                    {/* Render the button to return home */}
                    <Button colorScheme="blue" mt="20px" onClick={() => navigate('/home')}>
                        Return Home
                    </Button>
                </Flex>
            </Flex>
        </Box>
    );
};
