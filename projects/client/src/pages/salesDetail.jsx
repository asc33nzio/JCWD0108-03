import Axios from "axios";
import { useEffect, useState } from "react";
import { Box, Flex, Stack, Text } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { useParams } from "react-router-dom";

export const SalesDetail = () => {
    const { txId } = useParams();
    const [transactionData, setTransactionData] = useState(null);

    useEffect(() => {
        Axios.get(`http://localhost:8000/api/transactions/sales/${txId}`)
            .then((response) => {
                const { status, salesRecords } = response.data;
                if (status === 200 && salesRecords.length > 0) {
                    setTransactionData(salesRecords);
                } else {
                    console.error("Error fetching transaction data");
                }
            })
            .catch((error) => {
                console.error("Error fetching transaction data:", error);
            });
    }, [txId]);


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

    const transactionTime = transactionData ? formatDate(transactionData[0].Transaction.txTime) : "";

    const calculateTotalSale = (data) => {
        let total = 0;
        data.forEach((transaction) => {
            total += transaction.Product.totalAmount;
        });
        return total;
    };

    const totalSaleAmount = transactionData ? calculateTotalSale(transactionData).toLocaleString('id-ID') : 0;

    return (
        <Box w="100%" h="100vh">
            <Navbar />
            <Stack direction={"column"} h={"20vh"} position="sticky" top="0" zIndex="1">
                <Text color={"black"} align={"center"} fontFamily={"monospace"} fontSize={"35px"} fontWeight={"bold"} mt={'85px'}>
                    Sale Detail AAA_tx#{txId}
                </Text>
                <Text color={"black"} align={"center"} mt={"auto"} fontFamily={"monospace"} fontSize={"20px"} fontWeight={"bold"}>
                    Transaction Time: {transactionTime}
                </Text>
                <Text color={"black"} align={"center"} mt={"auto"} fontFamily={"monospace"} fontSize={"20px"} fontWeight={"bold"}>
                    Total Billed: Rp. {totalSaleAmount},00
                </Text>
            </Stack>
            {transactionData ? (
                <Stack direction="row" align="center" spacing={4} overflowX="auto" padding="20px" mt={'80px'}
                >
                    {transactionData.map((transaction) => (
                        <Box key={transaction.transactionId} p={4} border="1px solid #ccc">
                            <p>Product ID: {transaction.Product.id}</p>
                            <p>Product Name: {transaction.Product.productName}</p>
                            <p>Category: {transaction.Product.Category.category}</p>
                            <p>Quantity Sold: {transaction.Product.quantitySold}</p>
                            <p>Product Price: Rp. {(transaction.Product.price).toLocaleString("id-ID")},00</p>
                            <p>Total Amount: Rp. {(transaction.Product.totalAmount).toLocaleString("id-ID")},00</p>
                            <Flex justifyContent="center" alignItems="center">
                                <img
                                    src={`http://localhost:8000/products/${transaction.Product.imgURL}`}
                                    alt={transaction.Product.productName}
                                    style={{ maxWidth: "300px", maxHeight: "150px" }}
                                />
                            </Flex>
                        </Box>
                    ))}
                </Stack>
            ) : (
                <p>Loading transaction details...</p>
            )}
        </Box>
    );
};
