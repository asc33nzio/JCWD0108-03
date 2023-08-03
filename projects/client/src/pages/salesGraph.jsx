import Axios from "axios";
import { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import { Navbar } from "../components/navbar";
import { Line } from "react-chartjs-2";

export const SalesGraph = () => {
    const [salesData, setSalesData] = useState([]);
    const [chartInstance, setChartInstance] = useState(null); // Define chartInstance outside of useEffect

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

        // Cleanup function to destroy the Chart.js instance when the component unmounts
        return () => {
            if (chartInstance) {
                chartInstance.destroy();
            }
        };
    }, []); // Pass an empty dependency array to run the effect only once

    const formatSaleData = (data) => {
        // Group sales data by day and calculate total sale nominal amount for each day
        const groupedData = {};
        data.forEach((record) => {
            const date = record.Transaction.txTime.split("T")[0]; // Extract date from txTime
            if (!groupedData[date]) {
                groupedData[date] = 0;
            }
            groupedData[date] += record.Product.totalAmount;
        });

        // Convert the grouped data into arrays for chart.js
        const dates = Object.keys(groupedData);
        const saleAmounts = Object.values(groupedData);
        return { dates, saleAmounts };
    };

    const salesChartData = formatSaleData(salesData);

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
            },
            y: {
                title: {
                    display: true,
                    text: "Sales (Nominal Amount)",
                },
            },
        },
    };

    return (
        <Box w="100%" h="100vh">
            <Navbar />
            <Box p="20px">
                {salesChartData.dates.length > 0 ? (
                    <Line data={chartData} options={chartOptions} key={JSON.stringify(salesData)} />
                ) : (
                    <p>Loading chart...</p>
                )}
            </Box>
        </Box>
    );
};
