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
            const { transactionId, Transaction, Product } = record;
            if (!groupedSalesData[transactionId]) {
                groupedSalesData[transactionId] = {
                    transactionId,
                    txTime: formatDate(Transaction.txTime),
                    billable: 0,
                    products: [],
                };
            }
            groupedSalesData[transactionId].billable += Product.totalAmount;
            groupedSalesData[transactionId].products.push(Product);
        });
        return Object.values(groupedSalesData);
    };

    const formatDate = (dateStr) => {
        const dateObj = new Date(dateStr);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const seconds = String(dateObj.getSeconds()).padStart(2, "0");
        return `${day}-${month}-${year} at ${hours}:${minutes}:${seconds}`;
    };

    return (
        <Box w="100%" h="100vh">
            <Navbar />
            <Stack spacing="50px" direction="row" justify="center" align="center" w="100vw" h="125px">
                <Flex direction="row" align="center" mt="100px">
                        <Button as={Link} to="/sales/graph" boxShadow={"0px 0px 10px gray"} _hover={{ bgGradient: "linear(to-r, yellow.400, yellow.700)", transform: 'scale(0.95)' }} color={"white"} bgGradient={"linear(to-r, yellow.400, yellow.700)"} mr="150px">
                            Sales Graph
                        </Button>
                        <Button as={Link} to="/recapSales" boxShadow={"0px 0px 10px gray"} _hover={{ bgGradient: "linear(to-l, yellow.700, yellow.400)", transform: 'scale(0.95)' }} color={"white"} bgGradient={"linear(to-l, yellow.400, yellow.700)"}>
                            Recap Sales
                        </Button>
                </Flex>
            </Stack>
            <Stack
                direction={{ base: "column", md: "row" }}
                alignItems="center"
                w={{ base: "100%", md: "100%" }}
                mt="15px"
                flexWrap="wrap"
                justifyContent="center"
            >
                {salesData.map((transaction) => (
                    <Box key={transaction.transactionId} mb={4} p={4} border="1px solid #ccc" w={{ base: "100%", md: "33%" }}>
                        <p>Transaction ID: AAA_tx#{transaction.transactionId}</p>
                        <p>Transaction Time: {transaction.txTime}</p>
                        <p>Billed: Rp. {transaction.billable.toLocaleString("id-ID")},00</p>
                        <Button as={Link} to={`/sales/${transaction.transactionId}`} boxShadow={"0px 0px 10px gray"} _hover={{ bgGradient: "linear(to-t, yellow.700, yellow.400)", transform: 'scale(0.95)' }} color={"white"} bgGradient={"linear(to-t, yellow.400, yellow.700)"} mt={'10px'}>
                            See Detail
                        </Button>
                    </Box>
                ))}
            </Stack>
        </Box>
    );
};