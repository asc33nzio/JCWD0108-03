import Axios from "axios";
import receipt_header from "../public/receipt_header.jpg";
import { Navbar } from "../components/navbar";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import { Box, Flex, Text, Button } from "@chakra-ui/react";
import { Document, Page, View, Text as PDFText, StyleSheet, PDFDownloadLink, Image } from '@react-pdf/renderer';

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Helvetica',
        fontSize: 14,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        paddingBottom: 30,
    },
    header: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 30,
        marginBottom: 15,
        textAlign: 'center',
    },
    txTime: {
        fontSize: 12,
        marginBottom: 3,
        textAlign: 'right',
    },
    longLat: {
        fontSize: 10,
        marginBottom: 12,
        textAlign: 'right',
    },
    txID: {
        fontFamily: 'Helvetica-Bold',
        fontSize: 12,
        marginBottom: 35,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    item: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    itemName: {
        flexGrow: 1,
    },
    itemQty: {
        flexGrow: 1,
        textAlign: 'left'
    },
    itemQty: {
        textAlign: 'center',
        marginLeft: 10,
        marginRight: 10,
    },
    itemTotal: {
        textAlign: 'center',
        flexGrow: 1,
    },
    firstTotalAmount: {
        textAlign: 'right',
        marginTop: 35,
        fontSize: 18,
    },
    totalAmount: {
        textAlign: 'right',
        marginTop: 20,
        fontSize: 18,
    },
    footer: {
        marginTop: 40,
        textAlign: 'center',
        fontSize: 12,
    },
    footer2: {
        fontFamily: 'Helvetica-Bold',
        marginTop: 5,
        textAlign: 'center',
        fontSize: 12,
    },
});

export const Checkout = () => {
    const navigate = useNavigate();
    const transactionData = useSelector((state) => state.transaction.transactionData);
    const [paid, setPaid] = useState(0);
    const [change, setChange] = useState(0);
    const txId = transactionData?.transaction?.id;

    console.log(transactionData);

    const handleReturnHome = () => {
        navigate('/');
    };

    const totalAmount = transactionData?.transaction?.totalAmount || 0;

    useEffect(() => {
        if (!transactionData) {
            navigate('/');
        }
    }, [transactionData, navigate]);

    useEffect(() => {
        const fetchPaymentRecord = async () => {
            try {
                const response = await Axios.get(`http://localhost:8000/api/transactions/${txId}`);
                setPaid(response.data.paymentRecord.amountPaid);
                setChange(response.data.paymentRecord.changeAmount);
            } catch (error) {
                console.error(error);
            }
        };

        fetchPaymentRecord();
    }, [txId]);

    const timestamp = transactionData?.transaction?.txTime;
    const date = new Date(timestamp);
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    const hour = String(date.getHours()).padStart(2, "0");
    const minute = String(date.getMinutes()).padStart(2, "0");
    const second = String(date.getSeconds()).padStart(2, "0");
    const formattedDMY = `${day}-${month}-${year}`;
    const formattedHMS = `${hour}:${minute}:${second} ZULU -7`;

    const receiptContent = (
        <Document>
            <Page size="A4" style={styles.page}>
                <View>
                    <View>
                        <Image src={receipt_header} />
                        <PDFText style={styles.header}>Your AAA Shop Purchase Receipt</PDFText>
                    </View>
                    <PDFText style={styles.txTime}>BANDUNG, INDONESIA</PDFText>
                    <PDFText style={styles.txTime}>{formattedDMY}</PDFText>
                    <PDFText style={styles.txTime}>{formattedHMS}</PDFText>
                    <PDFText style={styles.longLat}>6.9175° S, 107.6191° E</PDFText>
                    <PDFText style={styles.txID}>Transaction ID: AAA_tx#{transactionData?.transaction?.id}</PDFText>
                    {transactionData?.breakdown?.map((item, index) => (
                        <View key={index} style={styles.item}>
                            <PDFText style={styles.itemName}>{item.productName}</PDFText>
                            <PDFText style={styles.itemQty}>{(Math.round(item.totalAmount / item.quantitySold / 1000)).toLocaleString("id-ID")} K</PDFText>
                            <PDFText style={styles.itemQty}>x {item.quantitySold}</PDFText>
                            <PDFText style={styles.itemTotal}> = Rp. {item.totalAmount.toLocaleString("id-ID")},00</PDFText>
                        </View>
                    ))}
                    <PDFText style={styles.firstTotalAmount}>Total Billable: Rp. {totalAmount.toLocaleString("id-ID")},00</PDFText>
                    <PDFText style={styles.totalAmount}>Dev Tax 10%(inclusive): Rp. {(Math.round(totalAmount * 0.1)).toLocaleString("id-ID")},00</PDFText>
                    <PDFText style={styles.totalAmount}>Amount Paid: Rp. {paid.toLocaleString("id-ID")},00</PDFText>
                    <PDFText style={styles.totalAmount}>Change Given: Rp. {change.toLocaleString("id-ID")},00</PDFText>
                    <PDFText style={styles.footer}>Thank You For Your Purchase. Please Come Again.</PDFText>
                    <PDFText style={styles.footer2}>All Purchases Are Final. No Refunds.</PDFText>
                </View>
            </Page>
        </Document>
    );

    const DownloadPDF = () => (
        <PDFDownloadLink document={receiptContent} fileName="receipt.pdf">
            {({ blob, url, loading, error }) => {
                if (loading) {
                    return 'Loading your receipt PDF...';
                };

                if (error) {
                    return 'Error occurred while generating PDF.';
                };

                return (
                    <a
                        href={url}
                        download="receipt.pdf"
                        style={{
                            backgroundColor: "darkgoldenrod",
                            color: "black",
                            padding: "10px 20px",
                            borderRadius: "5px",
                            textDecoration: "none",
                            display: "inline-block",
                            textAlign: "center",
                            fontWeight: "bold",
                            fontSize: "16px"
                        }}
                    >
                        Download Receipt
                    </a>
                );
            }}
        </PDFDownloadLink>
    );

    return (
        <Box height="130vh" width="100vw">
            <Navbar />
            <Flex height="100%" width="100%" align="center" justify="center">
                <Flex
                    flexDirection="column"
                    alignItems="center"
                    pt={"20px"}
                    pb="40px"
                    border="10px inset black"
                    borderRadius="20px"
                    mt={'200px'}
                    mx="10px"
                    w={'475px'}
                >
                    <Text fontWeight="bold" fontSize="45px" mb="40px" ml='20px' mr='20px'>
                        Receipt
                    </Text>
                    {transactionData?.breakdown?.map((item, index) => (
                        <Flex key={index} justifyContent="space-between" mb="10px" width="400px">
                            <Text paddingRight={'20px'}>{`${item.productName}`}</Text>
                            <Text>{(Math.round(item.totalAmount / item.quantitySold / 1000)).toLocaleString("id-ID")}K</Text>
                            <Text fontStyle={'italic'}>x</Text>
                            <Text fontWeight={'bold'} marginRight={'40px'}>{`${item.quantitySold} pc(s)`}</Text>
                            <Text>{`Rp. ${item.totalAmount.toLocaleString("id-ID")},00`}</Text>
                        </Flex>
                    ))}
                    <Text fontWeight="bold" fontSize="18px" mt="40px">
                        Total Billable: Rp. {totalAmount.toLocaleString("id-ID")},00
                    </Text>
                    <Text fontWeight="bold" fontSize="18px" mt="40px">
                        Dev Tax 10%(inclusive): Rp. {(Math.round(totalAmount * 0.1)).toLocaleString("id-ID")},00
                    </Text>
                    <Text fontWeight="bold" fontSize="18px" mt="10px">
                        Amount Paid: Rp. {paid.toLocaleString("id-ID")},00
                    </Text>
                    <Text fontWeight="bold" fontSize="18px" mt="10px">
                        Change Given: Rp. {change.toLocaleString("id-ID")},00
                    </Text>
                    <Text fontWeight="bold" fontSize="22px" mt="15px" ml='25px' mr='25px'>
                        Thank You For Your Purchase.
                    </Text>
                    <Text fontWeight="bold" fontSize="21px" mt="1px">
                        Please Come Again.
                    </Text>
                    <Button colorScheme="yellow" mt="35px" onClick={handleReturnHome} mb={'10px'}>
                        Return Home
                    </Button>
                    <DownloadPDF />
                </Flex>
            </Flex>
        </Box>
    );
};