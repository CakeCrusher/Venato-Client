import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import {
  Button,
  Container,
  Heading,
  HStack,
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
import { consume } from "../../utils/api";
import ChartFilters from "../ChartFilters";

const App = (props) => {
  const [mealData, setMealData] = useState(null);
  const [chartFilters, setChartFilters] = useState([]);

  const handleConsumption = () => {
    // FETCH CONSUME
    const dailyConsumption = { id: 1, name: "1/22", calories: 800 };
    setMealData(null);
    props.removeMeal(mealData);
    props.setDailyConsumptionInstance(dailyConsumption);
  };

  // group by meals
  const ids = props.meals.map((meal) => meal.id);
  const groupedMeals = {};
  props.meals.forEach((meal) => {
    if (groupedMeals[meal.id]) {
      groupedMeals[meal.id].calories += meal.calories;
      groupedMeals[meal.id].protein += meal.protein;
      groupedMeals[meal.id].sodium += meal.sodium;
      groupedMeals[meal.id].total_fat += meal.total_fat;
      groupedMeals[meal.id].potassium += meal.potassium;
      groupedMeals[meal.id].sugar += meal.sugar;
      groupedMeals[meal.id].caffeine += meal.caffeine;
      groupedMeals[meal.id].fiber += meal.fiber;
      groupedMeals[meal.id].alcohol += meal.alcohol;
      groupedMeals[meal.id].water += meal.water;
    } else {
      groupedMeals[meal.id] = meal;
    }
  });
  const colors = ["#155263", "#ffad5a", "#4f9da6", "#1a0841", "#17b978"];
  const data = [];
  if (mealData) {
    chartFilters.forEach((filter) => {
      data.push({ name: filter, nutrients: mealData[filter] });
    });
  }

  console.log("mealData", mealData);
  const handleMealClick = (meal_id, name) => {
    const int = parseInt(meal_id);
    setMealData(groupedMeals[int]);
  };

  return (
    <VStack>
      <Table minH="20rem">
        <Thead>
          <Tr>
            <Th fontSize="xl" textAlign="center">
              Meals
            </Th>
          </Tr>
        </Thead>
        <Tbody>
          {Object.keys(groupedMeals).map((id) => {
            const meal = groupedMeals[id];
            console.log("meal", meal);
            return (
              <Tr key={id}>
                <Td
                  textAlign="center"
                  _hover={{
                    cursor: "pointer",
                    backgroundColor: "#dfdfdf",
                  }}
                  onHover={() => {
                    setMealData(
                      mealData && mealData.id === meal.id ? null : meal
                    );
                  }}
                  onClick={() => {
                    handleMealClick(id, meal.name);
                  }}
                >
                  {meal.name}
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
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
      <BarChart width={300} height={250} data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="nutrients" fill="#8884d8" />
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
    grocery: state.groceryItems,
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
