import React from "react";
import { Table, Tbody, Td, Th, Thead, Tr, VStack } from "@chakra-ui/react";
import CanvasJSReact from "./canvasjs/canvasjs.react";
import "./HealthChart.css";

const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

const data = [
  {
    x: 1483228800000,

    y: 8561.3,
  },

  {
    x: 1485907200000,

    y: 8879.6,
  },

  {
    x: 1488326400000,

    y: 9173.75,
  },

  {
    x: 1491004800000,

    y: 9304.05,
  },

  {
    x: 1493596800000,

    y: 9621.25,
  },

  {
    x: 1496275200000,

    y: 9520.9,
  },

  {
    x: 1498867200000,

    y: 10077.1,
  },

  {
    x: 1501545600000,

    y: 9917.9,
  },

  {
    x: 1504224000000,

    y: 9788.6,
  },

  {
    x: 1506816000000,

    y: 10335.3,
  },

  {
    x: 1509494400000,

    y: 10226.55,
  },

  {
    x: 1512086400000,

    y: 10530.7,
  },
];

const HealthChart = (props) => {
  const options = {
    theme: "light2",
    title: {
      text: "Test Chart",
    },
    axisY: {
      title: "Test Y",
    },
    data: [
      {
        type: "line",
        xValueFormatString: "MMM YYYY",
        yValueFormatString: "$#,##0.00",
        dataPoints: data,
      },
    ],
  };
  const renderChart = (ref) => {
    ref.render();
  };

  return (
    <VStack>
      <CanvasJSChart options={options} onRef={(ref) => renderChart(ref)} />

      <Table className="nutrition-table" maxW="95%">
        <Thead>
          <Tr>
            <Th fontSize="sm" flex="2">
              Date&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
            </Th>
            <Th fontSize="sm" flex="1">
              Calories
            </Th>
            <Th fontSize="sm" flex="1">
              Fat
            </Th>
            <Th fontSize="sm" flex="1">
              Carbs
            </Th>
            <Th fontSize="sm" flex="1">
              Protein
            </Th>
            <Th fontSize="sm" flex="1">
              Sugar
            </Th>
            <Th fontSize="sm" flex="1">
              Sodium
            </Th>
            <Th fontSize="sm" flex="1">
              Potassium
            </Th>
            <Th fontSize="sm" flex="1">
              Alcohol
            </Th>
            <Th fontSize="sm" flex="1">
              Water
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          <Tr>
            <Td>{"2022-01-01"}</Td>
            <Td>{2012}</Td>
            <Td>{20.5}g</Td>
            <Td>{20.5}g</Td>
            <Td>{20.5}g</Td>
            <Td>{20.5}g</Td>
            <Td>{20.5}g</Td>
            <Td>{20.5}g</Td>
            <Td>{20.5}g</Td>
            <Td>{20.5}g</Td>
          </Tr>
        </Tbody>
      </Table>
    </VStack>
  );
};

export default HealthChart;
