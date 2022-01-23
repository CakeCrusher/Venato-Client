import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";

import { createUser, getUser } from "../utils/api";
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
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Becareful not to pass in event parameter (event) => {}
  const handleLogin = async (register = false) => {
    try {
      if (register) {
        const { data } = await createUser(username, password);
        const { user_id } = data.msg;

        props.login({
          id: user_id,
        });
        return;
      }

      const { data } = await getUser(username, password);
      console.log(data);
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
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    login: (obj) => {
      dispatch({ type: "LOGIN", payload: obj });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Home);
