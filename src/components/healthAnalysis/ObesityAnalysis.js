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
import { PieChart, Pie } from "recharts";
import { getPrediction } from "../../utils/api";

const App = (props) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getPrediction(
      '[{"id":5,"amount_g":11000.0,"category":"BagelsandEnglishmuffins"},{"id":10,"amount_g":30.0,"category":"Candycontainingchocolate"},{"id":46,"amount_g":102.600003,"category":"Chickenwholepieces"},{"id":4,"amount_g":4.0,"category":"Coffee"},{"id":50,"amount_g":525.599976,"category":"Coldcutsandcuredmeats"},{"id":42,"amount_g":100.0,"category":"Creamandcreamsubstitutes"},{"id":52,"amount_g":262.799988,"category":"Notincludedinafoodcategory"},{"id":44,"amount_g":78.780003,"category":"Otherstarchyvegetables"},{"id":48,"amount_g":929.599976,"category":"Ricemixeddishes"}]'
    ).then((res) => {
      console.log("prediction", res.data);
    });
  }, []);
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <VStack>
      <Heading>Obesity Analysis</Heading>
      {/* <PieChart width={730} height={250}>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={50}
          fill="#8884d8"
        />
        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={60}
          outerRadius={80}
          fill="#82ca9d"
          label
        />
      </PieChart> */}
    </VStack>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
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
