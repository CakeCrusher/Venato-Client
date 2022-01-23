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
import { getGroceries, getPrediction } from "../../utils/api";

const App = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    getGroceries(props.currentUser.id)
      .then((res) => {
        if (res.data) {
          props.setGroceryItems(res.data.msg);
          const cleanedItems = res.data.msg.map((gi) => {
            return { id: gi.id, amount_g: gi.amount_g, category: gi.name };
          });
          getPrediction(JSON.stringify(cleanedItems)).then((res) => {
            if (res.data.status === 0) {
              props.setObesity(res.data.msg);
            }
            console.log("prediction", res);
          });
        }
      })
      .catch((err) => console.error(err));
  }, []);
  console.log("groceryItems", props.groceryItems);
  const data = [
    { name: "Geeksforgeeks", students: 400 },
    { name: "Technical scripter", students: 700 },
    { name: "Geek-i-knack", students: 200 },
    { name: "Geek-o-mania", students: 1000 },
  ];
  if (!props.obesityPercentage) {
    return <div>Loading...</div>;
  }
  return (
    <VStack>
      <Heading>Obesity Analysis</Heading>
      <div>
        Based on your <stromg>{props.groceryItems.length} grocery items</stromg>{" "}
        our AI has predicted youhave a{" "}
        <strong>{parseInt(props.obesityPercentage)}%</strong> of becoming obese.
      </div>
    </VStack>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    groceryItems: state.groceryItems,
    obesityPercentage: state.obesityPercentage,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    setUser: (user) => {
      dispatch({ type: "SET_USER", payload: user });
    },
    setGroceryItems: (groceryItems) => {
      dispatch({ type: "SET_G_ITEMS", payload: groceryItems });
    },
    setObesity: (perc) => {
      dispatch({ type: "SET_OBESITY_PERCENTAGE", payload: perc });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
