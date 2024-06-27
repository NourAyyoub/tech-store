import React, { useState } from "react";
import {
  Card,
  CardBody,
  CardHeader,
  Typography,
  Input,
  Button,
} from "@material-tailwind/react";
import Chart from "react-apexcharts";
import { Square3Stack3DIcon } from "@heroicons/react/24/outline";

export default function AiPrediction() {
  const [date, setDate] = useState("");
  const [option, setOption] = useState("day");
  const [number, setNumber] = useState("");
  const [showDetails, setShowDetails] = useState(false); // State for showing usage details
  const [errors, setErrors] = useState({
    date: false,
    option: false,
    number: false,
  }); // State for errors

  const handleDateChange = (e) => {
    setDate(e.target.value);
    setErrors({ ...errors, date: false }); // Clear error when date is filled
  };

  const handleOptionChange = (e) => {
    setOption(e.target.value);
    setErrors({ ...errors, option: false }); // Clear error when option is selected
  };

  const handleNumberChange = (e) => {
    setNumber(e.target.value);
    setErrors({ ...errors, number: false }); // Clear error when number is filled
  };

  const handleAddData = () => {
    let formValid = true;
    const newErrors = {
      date: !date,
      option: !option,
      number: !number || number === "0",
    };

    if (newErrors.date || newErrors.option || newErrors.number) {
      formValid = false;
    }

    setErrors(newErrors);

    if (!formValid) {
      return; // If form is not valid, do not proceed
    }

    // Add your logic here to handle adding data to the chart
    console.log(`Date: ${date}, Option: ${option}, Number: ${number}`);
    // Example: Update chart data and categories here
  };

  const toggleDetails = () => {
    setShowDetails(!showDetails); // Toggle the showDetails state
  };

  const categories = [
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
  ];

  const sortedCategories = categories.sort((a, b) => new Date(a) - new Date(b));

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
        categories: sortedCategories,
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
          <Button onClick={toggleDetails} className="ml-auto">
            {showDetails ? "Hide Instructions" : "Show Instructions"}
          </Button>
        </CardHeader>
        <CardBody className="px-2 pb-0">
          {showDetails && (
            <div className="mt-4">
              <p>Usage Instructions:</p>
              <ol className="list-decimal ml-6">
                <li>
                  <strong>Entering the Start Date:</strong>
                  <p>Use the date input field to select the start date from which you want to begin the forecasts. You can click on the date field and choose the appropriate date from the popup calendar. Example: If you want to start the forecasts from January 1, 2024, select this date from the calendar.</p>
                </li>
                <li>
                  <strong>Choosing the Time Unit:</strong>
                  <p>Use the dropdown menu to select the time unit for the forecast: day, month, or year. Click on the dropdown menu and choose the appropriate time unit. Example: If you want to forecast sales for months, select "Month" from the dropdown menu.</p>
                </li>
                <li>
                  <strong>Entering the Number of Units:</strong>
                  <p>Use the number input field to specify the number of time units for which you want to forecast sales. Enter the appropriate number in the input field. Example: If you want to forecast sales for two months, enter the number 2 in the input field.</p>
                </li>
                <li>
                  <strong>Forecast:</strong>
                  <p>After filling in all the fields, click the "Forecast" button to start the forecasts based on the entered data. The chart will update to reflect the new forecasts based on the time period you specified. Example: If you entered January 1, 2024, as the start date, selected "Month" as the time unit, and entered 2 as the number of units, sales forecasts for January and February 2024 will be generated.</p>
                </li>
              </ol>
            </div>
          )}

          <div className="flex gap-4">
            {/* Field 2 - Date */}
            <div className="relative">
              <label
                htmlFor="date"
                className="text-sm font-medium text-gray-700"
              >
                Date
              </label>
              <input
                type="date"
                id="date"
                value={date}
                onChange={handleDateChange}
                className={`block w-full px-3 py-2 border ${errors.date ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.date && (
                <p className="text-red-500 text-xs mt-1">Please select a date</p>
              )}
            </div>

            {/* Field 1 - Option */}
            <div className="relative">
              <label
                htmlFor="option"
                className="text-sm font-medium text-gray-700"
              >
                Option
              </label>
              <select
                id="option"
                value={option}
                onChange={handleOptionChange}
                className={`block w-full px-3 py-2 border ${errors.option ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              >
                <option value="">Select an option</option>
                <option value="day">Day</option>
                <option value="month">Month</option>
                <option value="year">Year</option>
              </select>
              {errors.option && (
                <p className="text-red-500 text-xs mt-1">Please select an option</p>
              )}
            </div>

            {/* Field 3 - Number */}
            <div className="relative">
              <label
                htmlFor="number"
                className="text-sm font-medium text-gray-700"
              >
                Number
              </label>
              <input
                type="number"
                id="number"
                value={number}
                onChange={handleNumberChange}
                className={`block w-full px-3 py-2 border ${errors.number ? 'border-red-500' : 'border-gray-300'} rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm`}
              />
              {errors.number && (
                <p className="text-red-500 text-xs mt-1">Please enter a valid number</p>
              )}
            </div>
          </div>

          <Button
            onClick={handleAddData}
            className="px-4 py-2 mt-4 text-sm bg-blue-500 hover:bg-blue-700 text-white rounded-md"
          >
            Forecast
          </Button>

          <Chart {...chartConfig} />
        </CardBody>
      </Card>
    </div>
  );
}
