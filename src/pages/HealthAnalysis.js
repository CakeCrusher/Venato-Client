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
import { getMeals, getPrediction } from "../utils/api";
import { geolocated } from "react-geolocated";
import DailyConsumption from "../components/healthAnalysis/DailyConsumption";
import Meal from "../components/healthAnalysis/Meal";

const HealthAnalysis = (props) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getPrediction(
      '[{"id":5,"amount_g":11000.0,"category":"BagelsandEnglishmuffins"},{"id":10,"amount_g":30.0,"category":"Candycontainingchocolate"},{"id":46,"amount_g":102.600003,"category":"Chickenwholepieces"},{"id":4,"amount_g":4.0,"category":"Coffee"},{"id":50,"amount_g":525.599976,"category":"Coldcutsandcuredmeats"},{"id":42,"amount_g":100.0,"category":"Creamandcreamsubstitutes"},{"id":52,"amount_g":262.799988,"category":"Notincludedinafoodcategory"},{"id":44,"amount_g":78.780003,"category":"Otherstarchyvegetables"},{"id":48,"amount_g":929.599976,"category":"Ricemixeddishes"}]'
    ).then((res) => {
      console.log("prediction", res.data);
    });
    getMeals(props.userId).then((res) => {
      if (res.data) {
        // setMealData(res.data.msg);
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
