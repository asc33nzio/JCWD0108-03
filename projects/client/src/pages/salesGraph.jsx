import Axios from "axios";
import Chart from "chart.js/auto"; 
import moment from "moment"; 
import { useEffect, useState, useRef } from "react";
import { Box } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import 'chartjs-adapter-moment'; 

export const SalesGraph = () => {
    const [salesData, setSalesData] = useState([]);
    const chartInstanceRef = useRef(null);

    useEffect(() => {
        Axios.get("http://localhost:8000/api/transactions/sales")
            .then((response) => {
                const { status, salesRecords } = response.data;
                if (status === 200) {
                    setSalesData(salesRecords);
                } else {
                    console.error("Error fetching sales data");
                }
            })
            .catch((error) => {
                console.error("Error fetching sales data:", error);
            });
    }, []);

    useEffect(() => {
        if (chartInstanceRef.current) {
            chartInstanceRef.current.destroy();
        }

        const formatSaleData = (data) => {
            const groupedData = {};
            data.forEach((record) => {
                const date = record.Transaction.txTime.split("T")[0]; 
                if (!groupedData[date]) {
                    groupedData[date] = 0;
                }
                groupedData[date] += record.Product.totalAmount;
            });

            const dates = Object.keys(groupedData);
            const saleAmounts = Object.values(groupedData);
            return { dates, saleAmounts };
        };

        const salesChartData = formatSaleData(salesData);

        if (salesChartData.dates.length > 0) {
            const chartData = {
                labels: salesChartData.dates,
                datasets: [
                    {
                        label: "Sales",
                        data: salesChartData.saleAmounts,
                        fill: false,
                        borderColor: "rgba(75,192,192,1)",
                        tension: 0.4,
                    },
                ],
            };

            const chartOptions = {
                scales: {
                    x: {
                        type: "time",
                        time: {
                            parser: "YYYY-MM-DD",
                            tooltipFormat: "ll",
                            unit: "day",
                            displayFormats: {
                                day: "YYYY-MM-DD",
                            },
                        },
                        title: {
                            display: true,
                            text: "Date",
                        },
                        adapters: {
                            date: moment, // Use the moment date adapter
                        },
                    },
                    y: {
                        title: {
                            display: true,
                            text: "Sales (Nominal Amount)",
                        },
                    },
                },
            };

            const ctx = document.getElementById('salesGraph').getContext('2d');
            chartInstanceRef.current = new Chart(ctx, {
                type: 'line',
                data: chartData,
                options: chartOptions,
            });
        }

        return () => {
            if (chartInstanceRef.current) {
                chartInstanceRef.current.destroy();
            }
        };
    }, [salesData]);

    return (
        <Box w="100%" h="100vh">
            <Navbar />
            <Box p="20px">
                <canvas id="salesGraph" />
            </Box>
        </Box>
    );
};
