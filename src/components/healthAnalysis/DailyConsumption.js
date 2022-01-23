import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Checkbox,
  Container,
  Heading,
  HStack,
  Input,
  Spacer,
  VStack,
} from "@chakra-ui/react";
import {
  BarChart,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  Bar,
  AreaChart,
  Area,
} from "recharts";
import ChartFilters from "../ChartFilters";

const DailyConsumption = (props) => {
  const [dailyMealData, setDailyMealData] = useState(null);
  const [chartFilters, setChartFilters] = useState([]);

  const colors = ["#155263", "#ffad5a", "#4f9da6", "#1a0841", "#17b978"];

  console.log("props.dailyConsumption", props.dailyConsumption);

  const ids = props.dailyConsumption.map((dc) => dc.id);
  const uniqueIds = ids.filter((x, i, a) => a.indexOf(x) === i);
  const groupedDailyConsumption = uniqueIds.map((id) =>
    props.dailyConsumption.filter((dc) => dc.id === id)
  );
  // dailyMealData.reduce function that adds up the total calories for each meal
  console.log("chartFilters", chartFilters);
  console.log("groupedDailyConsumption", groupedDailyConsumption);

  const data = [
    { name: "a", pv: 10, uv: 5 },
    { name: "b", pv: 5, uv: 10 },
    { name: "c", pv: 5, uv: 10 },
  ];

  return (
    <VStack>
      <Heading>Daily Consumption</Heading>
      {groupedDailyConsumption.map((dc) => (
        <div key={dc[0].id}>
          <button
            onClick={() => {
              setDailyMealData(
                dailyMealData && dailyMealData[0].id === dc[0].id ? null : dc
              );
            }}
          >
            {dc[0].name || "Untitled"}
          </button>
        </div>
      ))}
      {dailyMealData && (
        <div>
          <h3>
            calories:
            {dailyMealData.reduce((acc, cur) => {
              return acc + cur.calories;
            }, 0)}
          </h3>
        </div>
      )}
      <HStack>
        <ChartFilters
          name="calories"
          _state={chartFilters}
          _setState={setChartFilters}
        />
        <ChartFilters
          name="cholesterol"
          _state={chartFilters}
          _setState={setChartFilters}
        />
        <ChartFilters
          name="protein"
          _state={chartFilters}
          _setState={setChartFilters}
        />
      </HStack>
      <AreaChart
        width={730}
        height={250}
        data={data}
        margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
      >
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="colorPv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
          </linearGradient>
        </defs>
        <XAxis dataKey="name" />
        <YAxis />
        <CartesianGrid strokeDasharray="3 3" />
        <Tooltip />
        {chartFilters.map((filter, idx) => (
          <Area
            type="monotone"
            dataKey={filter}
            stroke={colors[idx]}
            fillOpacity={1}
            fill="url(#colorUv)"
          />
        ))}

        <Area
          type="monotone"
          dataKey="pv"
          stroke="#82ca9d"
          fillOpacity={1}
          fill="url(#colorPv)"
        />
      </AreaChart>
      <h2>Historical health</h2>

      <div>Show line graph based on daily consumption</div>
    </VStack>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    dailyConsumption: state.dailyConsumption,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(DailyConsumption);
