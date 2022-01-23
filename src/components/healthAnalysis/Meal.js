import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Heading,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  Tr,
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

const App = (props) => {
  const [mealData, setMealData] = useState(null);

  const handleConsumption = () => {
    // FETCH CONSUME
    const dailyConsumption = { id: 1, name: "1/22", calories: 800 };
    setMealData(null);
    props.removeMeal(mealData);
    props.setDailyConsumptionInstance(dailyConsumption);
  };

  // group by meals
  const ids = props.meals.map((meal) => meal.id);
  const uniqueIds = ids.filter((x, i, a) => a.indexOf(x) === i);
  const groupedMeals = uniqueIds.map((id) =>
    props.meals.filter((meal) => meal.id === id)
  );

  const data = [{ name: "a", pv: 10, uv: 5 }];

  return (
    <VStack>
      <Table minH="20rem">
        <Thead>
          <Tr>
            <Th fontSize="xl">Meals</Th>
          </Tr>
        </Thead>
        <Tbody>
          {props.meals.map((meal) => (
            <Tr key={meal.id}>
              <Td
                _hover={{
                  cursor: "pointer",
                  backgroundColor: "#dfdfdf",
                }}
                onClick={() => {
                  setMealData(
                    mealData && mealData.id === meal.id ? null : meal
                  );
                }}
              >
                {meal.name}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <BarChart width={300} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="pv" fill="#8884d8" />
        <Bar dataKey="uv" fill="#82ca9d" />
      </BarChart>
      {mealData && (
        <div>
          <h3>calories: {mealData.calories}</h3>
          <button onClick={handleConsumption}>consume</button>
        </div>
      )}
    </VStack>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    meals: state.meals,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    removeMeal: (meal) => {
      dispatch({ type: "REMOVE_MEAL", payload: meal });
    },

    setDailyConsumptionInstance: (dc) => {
      dispatch({ type: "SET_DC_INSTANCE", payload: dc });
    },
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(App);
