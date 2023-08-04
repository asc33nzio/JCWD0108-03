import Axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button, Stack, Text } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Link, useParams } from "react-router-dom";

export const SalesDate = () => {
    const { dateQuery } = useParams();
    const [nonUniqueTransactionData, setNonUniqueTransactionData] = useState([]);
    const [transactionData, setTransactionData] = useState([]);

    const formatDate = (dateStr) => {
        const [month, day, year] = dateStr.split("-");
        const formattedDate = `${month}-${day.padStart(2, "0")}-${year}`;
        return formattedDate;
    };

    const formattedDateQuery = formatDate(dateQuery);

    const removeDuplicateTransactions = (salesRecords) => {
        const uniqueTransactions = [];
        const seenTransactionIds = new Set();

        salesRecords.forEach((transaction) => {
            if (!seenTransactionIds.has(transaction.transactionId)) {
                uniqueTransactions.push(transaction);
                seenTransactionIds.add(transaction.transactionId);
            }
        });

        return uniqueTransactions;
    };

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/transactions/sales/date/${formattedDateQuery}`)
            .then((response) => {
                const { status, salesRecords } = response.data;
                if (status === 200 && salesRecords.length > 0) {
                    setNonUniqueTransactionData(salesRecords);
                    const uniqueSalesRecords = removeDuplicateTransactions(salesRecords);
                    setTransactionData(uniqueSalesRecords);
                } else {
                    console.error("Error fetching transactions by date");
                }
            })
            .catch((error) => {
                console.error("Error fetching transactions by date:", error);
            });
    }, [formattedDateQuery]);

    const totalTransactions = transactionData.length;

    const formatDate2 = (dateStr) => {
        const dateObj = new Date(dateStr);
        const day = String(dateObj.getDate()).padStart(2, "0");
        const month = String(dateObj.getMonth() + 1).padStart(2, "0");
        const year = dateObj.getFullYear();
        const hours = String(dateObj.getHours()).padStart(2, "0");
        const minutes = String(dateObj.getMinutes()).padStart(2, "0");
        const seconds = String(dateObj.getSeconds()).padStart(2, "0");
        return `${day}-${month}-${year} at ${hours}:${minutes}:${seconds}`;
    };

    const totalDailySales = transactionData.reduce((total, transaction) => {
        return total + transaction.Product.totalAmount;
    }, 0);

    const calculateTotalAmount = (transactionId) => {
        let total = 0;
        nonUniqueTransactionData.forEach((transaction) => {
            if (transaction.transactionId === transactionId) {
                total += transaction.Product.totalAmount;
            }
        });
        return total;
    };

    return (
        <Box w="100%" h="100vh">
            <Navbar />
            <Stack direction={"column"} h={"20vh"} position="sticky" top="0" zIndex="1">
                <Text color={"black"} align={"center"} fontFamily={"monospace"} fontSize={"35px"} fontWeight={"bold"} mt={'85px'}>
                    All Sales on {formattedDateQuery}
                </Text>
                <Text color={"black"} align={"center"} mt={"auto"} fontFamily={"monospace"} fontSize={"20px"} fontWeight={"bold"}>
                    Total Unique Transactions: {totalTransactions}
                </Text>
                <Text color={"black"} align={"center"} mt={"auto"} fontFamily={"monospace"} fontSize={"20px"} fontWeight={"bold"}>
                    Revenue: Rp. {totalDailySales.toLocaleString("id-ID")},00
                </Text>
            </Stack>
            {transactionData.length > 0 ? (
                <Stack direction="column" spacing={4} overflowX="auto" padding="20px" mt={'80px'}>
                    {transactionData.map((transaction, index) => {
                        const billedAmount = calculateTotalAmount(transaction.transactionId);
                        return (
                            <Box key={transaction.transactionId} p={4} border="1px solid #ccc">
                                <p>Transaction ID: {transaction.transactionId}</p>
                                <p>Transaction Time: {formatDate2(transaction.Transaction.txTime)}</p>
                                <p>Billed: Rp. {billedAmount.toLocaleString("id-ID")},00</p>
                                <Button as={Link} to={`/sales/${transaction.transactionId}`} boxShadow={"0px 0px 10px gray"} _hover={{ bgGradient: "linear(to-t, yellow.700, yellow.400)", transform: 'scale(0.95)' }} color={"white"} bgGradient={"linear(to-t, yellow.400, yellow.700)"} mt={'10px'}>
                                    See Detail
                                </Button>
                            </Box>
                        );
                    })}
                </Stack>
            ) : (
                <p>No transactions found on {formattedDateQuery}</p>
            )}
        </Box>
    );
};