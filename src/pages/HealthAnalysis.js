import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";
import BarChart from "react-bar-chart";
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
} from "@chakra-ui/react";
import { getMeals } from "../utils/api";

const HealthAnalysis = (props) => {
  const [mealData, setMealData] = useState(null);
  const [dailyMealData, setDailyMealData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMeals(props.userId).then((res) => {
      if (res.data) {
        setMealData(res.data.msg);
        setLoading(false);
      }
    });
  }, []);

  const handleConsumption = () => {
    // FETCH CONSUME
    const dailyConsumption = { id: 1, name: "1/22", calories: 800 };
    setMealData(null);
    props.removeMeal(mealData);
    props.setDailyConsumptionInstance(dailyConsumption);
  };

  return (
    <Container>
      <Heading>Health Analysis</Heading>
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
                    mealData && mealData.id === meal.id ? null : meal,
                  );
                }}
              >
                {meal.name}
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      {mealData && (
        <div>
          <h3>calories: {mealData.calories}</h3>
          <button onClick={handleConsumption}>consume</button>
        </div>
      )}

      <Heading>Daily Consumption</Heading>
      {props.dailyConsumption.map((dc) => (
        <div key={dc.id}>
          <button
            onClick={() => {
              setDailyMealData(
                dailyMealData && dailyMealData.id === dc.id ? null : dc,
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
      <h2>Historical health</h2>

      <div>Show line graph based on daily consumption</div>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
    dailyConsumption: state.dailyConsumption,
    userId: state.currentUser.id,
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthAnalysis);
