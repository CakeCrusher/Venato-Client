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
import { getDailyConsumption, getMeals, getPrediction } from "../utils/api";
import { geolocated } from "react-geolocated";
import DailyConsumption from "../components/healthAnalysis/DailyConsumption";
import Meal from "../components/healthAnalysis/Meal";
import { lastWeek, today, tomrrow } from "../utils/tools";
import ObesityAnalysis from "../components/healthAnalysis/ObesityAnalysis";
import { useNavigate } from "react-router-dom";

const HealthAnalysis = (props) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  useEffect(() => {
    getDailyConsumption(props.userId, lastWeek, tomrrow).then((dc) => {
      console.log("dc", dc);
      if (typeof dc.data.msg === "string") {
        // navigate("/");
        props.setDc([]);
      } else {
        props.setDc(dc.data.msg);
      }
    });
    getMeals(props.userId).then((meals) => {
      if (typeof meals.data.msg === "string") {
        // navigate("/");
        props.setMeals([]);
      } else {
        props.setMeals(meals.data.msg);
      }
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
      <ObesityAnalysis />
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
    setDc: (obj) => {
      dispatch({ type: "SET_DC", payload: obj });
    },
    setMeals: (meals) => {
      dispatch({ type: "SET_MEALS", payload: meals });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(HealthAnalysis);
