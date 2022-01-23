import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
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
} from "recharts";

const App = (props) => {
  const [dailyMealData, setDailyMealData] = useState(null);

  console.log("props.dailyConsumption", props.dailyConsumption);

  const data = [{ name: "a", pv: 10, uv: 5 }];
  return (
    <VStack>
      <Heading>Daily Consumption</Heading>
      {props.dailyConsumption.map((dc) => (
        <div key={dc.id}>
          <button
            onClick={() => {
              setDailyMealData(
                dailyMealData && dailyMealData.id === dc.id ? null : dc
              );
            }}
          >
            {dc.name}
          </button>
        </div>
      ))}
      {dailyMealData && (
        <div>
          <h3>calories: {dailyMealData.calories}</h3>
        </div>
      )}
      <BarChart width={300} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
