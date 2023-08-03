import Axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Flex, Stack } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Link } from "react-router-dom";

export const SalesGeneral = () => {
    const [salesData, setSalesData] = useState([]);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/transactions/sales")
            .then((response) => {
                const { status, message, salesRecords } = response.data;
                if (status === 200) {
                    const groupedSalesData = groupSalesByTransactionId(salesRecords);
                    setSalesData(groupedSalesData);
                } else {
                    console.error(message);
                }
            })
            .catch((error) => {
                console.error("Error fetching sales data:", error);
            });
    }, []);

    const groupSalesByTransactionId = (salesRecords) => {
        const groupedSalesData = {};
        salesRecords.forEach((record) => {
            const { transactionId, Transaction } = record;
            if (!groupedSalesData[transactionId]) {
                groupedSalesData[transactionId] = {
                    transactionId,
                    txTime: Transaction.txTime,
                };
            }
        });
        return Object.values(groupedSalesData);
    };

    return (
        <Box w={"100%"} h={"100vh"}>
            <Navbar />
            <Stack spacing={'50px'} direction="row" justify="center" align="center" mb={4} bgColor="black" w="100vw" h="125px">
                <Flex direction="row" align="center" mt="auto">
                    <Button as={Link} to="/dailySales" colorScheme="yellow" mr={'150px'}>
                        Daily Sales
                    </Button>
                    <Button as={Link} to="/recapSales" colorScheme="yellow">
                        Recap Sales
                    </Button>
                </Flex>
            </Stack>
            <Flex justifyContent="center" pt="100px" w="100%" h="100%" bgColor="blue">
                <Stack
                    direction={{ base: "column", md: "row" }} // Stack direction is column on small screens and row on medium screens and above
                    alignItems="center"
                    bgColor="red"
                    w={{ base: "100%", md: "80%" }} // Adjust the width to your preference
                    mx="auto" // To center the Stack container
                    flexWrap="wrap" // Allow the Flex items to wrap to the next row when needed
                    justifyContent="center" // Center the Flex items horizontally
                >
                    {salesData.map((transaction, index) => (
                        <Box
                            key={transaction.transactionId}
                            mb={4}
                            p={4}
                            border="1px solid #ccc"
                            w={{ base: "55%", md: "55%" }} // Adjust the width to your preference
                        >
                            <p>Transaction ID: {transaction.transactionId}</p>
                            <p>Transaction Time: {transaction.txTime}</p>
                        </Box>
                    ))}
                </Stack>
            </Flex>
        </Box>
    );
};