import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Select,
  Option,
  Button,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

export default function AiPrediction() {
  const [date, setDate] = useState("");
  const [option, setOption] = useState("day");
  const [number, setNumber] = useState("");

  const handleDateChange = (e) => setDate(e.target.value);
  const handleOptionChange = (e) => setOption(e.target.value);
  const handleNumberChange = (e) => setNumber(e.target.value);

  const handleAddData = () => {
    // Add your logic here to handle adding data to the chart
    console.log(`Date: ${date}, Option: ${option}, Number: ${number}`);
    // Example: Update chart data and categories here
  };

  const chartConfig = {
    type: "line",
    height: 240,
    series: [
      {
        name: "Sales",
        data: [
          128, 127, 121, 102, 101, 101, 98, 94, 85, 83, 75, 71, 69, 61, 52, 43,
          41, 37, 35, 31, 24, 22, 20, 17, 16, 15, 8, 8, 5, 4,
        ],
      },
    ],
    options: {
      chart: {
        toolbar: {
          show: false,
        },
      },
      title: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#020617"],
      stroke: {
        lineCap: "round",
        curve: "smooth",
      },
      markers: {
        size: 0,
      },
      xaxis: {
        axisTicks: {
          show: false,
        },
        axisBorder: {
          show: false,
        },
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
        categories: [
          "2017-12-03",
          "2017-12-04",
          "2017-12-19",
          "2017-12-02",
          "2017-12-10",
          "2017-12-12",
          "2017-12-31",
          "2017-12-24",
          "2017-12-17",
          "2017-12-05",
          "2017-12-27",
          "2017-12-06",
          "2017-12-26",
          "2017-12-25",
          "2017-12-13",
          "2017-12-11",
          "2017-12-28",
          "2017-12-20",
          "2017-12-21",
          "2017-12-30",
          "2017-12-23",
          "2017-12-29",
          "2017-12-18",
          "2017-12-09",
          "2017-12-22",
          "2017-12-16",
          "2017-12-15",
          "2017-12-07",
          "2017-12-14",
          "2017-12-01",
        ],
      },
      yaxis: {
        labels: {
          style: {
            colors: "#616161",
            fontSize: "12px",
            fontFamily: "inherit",
            fontWeight: 400,
          },
        },
      },
      grid: {
        show: true,
        borderColor: "#dddddd",
        strokeDashArray: 5,
        xaxis: {
          lines: {
            show: true,
          },
        },
        padding: {
          top: 5,
          right: 20,
        },
      },
      fill: {
        opacity: 0.8,
      },
      tooltip: {
        theme: "dark",
      },
    },
  };

  return (
    <div className="p-4 border rounded bg-white">
      <Card>
        <CardHeader
          floated={false}
          shadow={false}
          color="transparent"
          className="flex flex-col gap-4 rounded-none md:flex-row md:items-center bg-gray-100"
        >
          <div className="w-max rounded-lg bg-gray-900 p-5 text-white">
            <Square3Stack3DIcon className="h-6 w-6" />
          </div>
          <div>
            <Typography variant="h6" color="blue-gray">
              AI Prediction Chart
            </Typography>
            <Typography
              variant="small"
              color="gray"
              className="max-w-sm font-normal"
            >
              This chart represents AI-based sales predictions.
            </Typography>
          </div>
        </CardHeader>
        <CardBody className="px-2 pb-0">
          <div className="flex flex-col gap-4 md:flex-row md:items-center mb-4">
            <Input
              type="date"
              value={date}
              onChange={handleDateChange}
              label="Date"
            />
            <Select value={option} onChange={handleOptionChange} label="Option">
              <Option value="day">Day</Option>
              <Option value="month">Month</Option>
              <Option value="year">Year</Option>
            </Select>
            <Input
              type="number"
              value={number}
              onChange={handleNumberChange}
              label="Number"
            />
            <Button onClick={handleAddData}>Add Data</Button>
          </div>
          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    </div>
  );
}
