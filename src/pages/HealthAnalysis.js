import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";
// import BarChart from "react-bar-chart";
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

import DailyConsumption from "../components/healthAnalysis/DailyConsumption";
import Meal from "../components/healthAnalysis/Meal";

const HealthAnalysis = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getMeals(props.userId).then((res) => {
      if (res.data) {
        setMealData(res.data.msg);
        setLoading(false);
      }
    });
  }, []);

  let data = [
    { name: "a", pv: 10, uv: 5 },
    { name: "b", pv: 10 },
  ];

  return (
    <Container>
      <Heading>Health Analysis</Heading>
      <Meal />
      <DailyConsumption />
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
