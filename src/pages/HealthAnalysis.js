import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";
import BarChart from "react-bar-chart";

const HealthAnalysis = (props) => {
  const [mealData, setMealData] = useState(null);
  const [dailyMealData, setDailyMealData] = useState(null);

  const handleConsumption = () => {
    // FETCH CONSUME
    const dailyConsumption = { id: 1, name: "1/22", calories: 800 };
    setMealData(null);
    props.removeMeal(mealData);
    props.setDailyConsumptionInstance(dailyConsumption);
  };

  return (
    <Wrapper>
      <h1>Health Analysis</h1>
      <h2>Meals</h2>
      {props.meals.map((meal) => (
        <div key={meal.id}>
          <button
            onClick={() => {
              setMealData(mealData && mealData.id === meal.id ? null : meal);
            }}
          >
            {meal.name}
          </button>
        </div>
      ))}
      {mealData && (
        <div>
          <h3>calories: {mealData.calories}</h3>
          <button onClick={handleConsumption}>consume</button>
        </div>
      )}

      <h2>Daily Consumption</h2>
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
      <h2>Historical health</h2>
      <div>Show line graph based on daily consumption</div>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    meals: state.meals,
    dailyConsumption: state.dailyConsumption,
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
