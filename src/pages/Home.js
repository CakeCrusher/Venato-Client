import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";

import {
  createUser,
  getDailyConsumption,
  getMeals,
  getUser,
} from "../utils/api";
import {
  Button,
  Container,
  Heading,
  HStack,
  Input,
  Spacer,
  VStack,
} from "@chakra-ui/react";

function Home(props) {
  const [username, setUsername] = useState("Martin");
  const [password, setPassword] = useState("password");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Becareful not to pass in event parameter (event) => {}
  const handleLogin = async (register = false) => {
    const today = new Date();
    const lastWeek = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() - 7,
    )
      .toISOString()
      .slice(0, 10);
    const tomrrow = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + 1,
    )
      .toISOString()
      .slice(0, 10);
    console.log("lastWeek", lastWeek, lastWeek);
    console.log("tomrrow", tomrrow, lastWeek);
    try {
      if (register) {
        const { data } = await createUser(username, password);
      }

      const { data } = await getUser(username, password);
      const dc = await getDailyConsumption(data.msg.user_id, lastWeek, tomrrow);
      if (typeof dc.data.msg === "string") {
        props.setDc([]);
      } else {
        props.setDc(dc.data.msg);
      }

      const meals = await getMeals(data.msg.user_id);
      if (typeof meals.data.msg === "string") {
        props.setMeals([]);
      } else {
        props.setMeals(meals.data.msg);
      }
      const { user_id } = data.msg;
      props.login({
        id: user_id,
      });
      navigate("/adding-groceries");
    } catch (err) {
      console.error(err);
    }
  };

  const aWidth = "50%";

  return (
    <Container>
      <HStack justifyContent="center">
        <Heading>Home</Heading>
      </HStack>
      <VStack mt="8" minW="100%" justifyContent="center">
        <Input
          w={aWidth}
          type="text"
          placeholder="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <Input
          w={aWidth}
          type="password"
          placeholder="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </VStack>

      <VStack minW="100%" mt="4" justifyContent="center">
        <Button minW={aWidth} onClick={() => handleLogin()}>
          Login
        </Button>
        <Button minW={aWidth} onClick={() => handleLogin(true)}>
          Register
        </Button>
      </VStack>

      <p>user: {props.currentUser.id}</p>
    </Container>
  );
}

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
    dailyConsumption: state.dailyConsumption,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => {
      dispatch({ type: "LOGIN", payload: obj });
    },
    setDc: (obj) => {
      dispatch({ type: "SET_DC", payload: obj });
    },
    setMeals: (meals) => {
      dispatch({ type: "SET_MEALS", payload: meals });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
