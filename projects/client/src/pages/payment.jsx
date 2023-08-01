import Axios from "axios";
import { Navbar } from "../components/navbar";
import { Back } from "../components/back";
import { Box, Flex, Text, Input, Button, useToast } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";

export const Payment = () => {
    const transactionData = useSelector((state) => state.transaction.transactionData);
    const [customerMoney, setCustomerMoney] = useState("");
    const navigate = useNavigate();
    const toast = useToast();
    const txId = transactionData.transaction.id;

    const totalAmount = transactionData?.transaction?.totalAmount || 0;
    const amountPaid = parseInt(customerMoney) || 0;
    const changeAmount = Math.max(amountPaid - totalAmount, 0);

    const handleCheckout = async () => {
        try {
            const token = localStorage.getItem("token");
            if (customerMoney < totalAmount) {
                toast({
                    title: "Payment Error",
                    description: "Payment is not sufficient.",
                    status: "error",
                    duration: 2000,
                    isClosable: true,
                    position: "top"
                });
                return;
            };

            await Axios.post(`http://localhost:8000/api/transactions/checkout/${txId}`,
                { "amountPaid": amountPaid },
                { headers: { Authorization: `Bearer ${token}` } }
            );
            toast({
                title: "Payment Successful",
                description: "Your payment is confirmed.",
                colorScheme: 'green',
                status: "success",
                duration: 2000,
                isClosable: true,
                position: "top"
            });
            navigate('/checkout');
        } catch (error) {
            console.error(error);
        };
    };

    return (
        <Box height='130vh' width='100vw'>
            <Navbar />
            <Flex height="100%" width='100%' align="center" justify="center">
                <Back nav={"/cashier"} />
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    pt={"20px"}
                    pb="40px"
                    border="10px inset black"
                    borderRadius="20px"
                    mt={'100px'}
                    mx="10px"
                >
                    <Text fontWeight="bold" fontSize="45px" mb="40px" ml='20px' mr='20px'>
                        Review Order
                    </Text>
                    {transactionData?.breakdown?.map((item, index) => (
                        <Flex key={index} justifyContent="space-between" mb="10px" width="300px">
                            <Text>{`${item.productName}`}</Text>
                            <Text fontStyle={'italic'}>x</Text>
                            <Text fontWeight={'bold'} marginRight={'40px'}>{`${item.quantitySold} pc(s)`}</Text>
                            <Text>{`Rp. ${item.totalAmount.toLocaleString("id-ID")},00`}</Text>
                        </Flex>
                    ))}
                    <Text fontWeight="bold" fontSize="18px" mt="20px">
                        Total Amount: Rp. {totalAmount.toLocaleString("id-ID")},00
                    </Text>
                    <Text fontWeight="bold" fontSize="18px" mt="20px" mb="20px">
                        Amount Paid by Consumer:
                    </Text>
                    <Input
                        variant="outline"
                        colorScheme="yellow"
                        focusBorderColor="yellow"
                        placeholder="Enter the amount paid"
                        width="300px"
                        mt="10px"
                        mb="20px"
                        ml="20px"
                        mr="20px"
                        value={customerMoney}
                        onChange={(e) => setCustomerMoney(e.target.value)}
                    />
                    <Text fontWeight="bold" fontSize="18px" mt="20px">
                        Change Amount: Rp. {changeAmount.toLocaleString("id-ID")},00
                    </Text>
                    <Button colorScheme="yellow" mt="20px" onClick={() => handleCheckout(customerMoney)}>
                        Confirm Payment
                    </Button>
                </Flex>
            </Flex>
        </Box>
    )
};
