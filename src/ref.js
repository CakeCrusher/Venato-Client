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

const App = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    props.setUser({ id: 1 });
  }, []);
  return <VStack></VStack>;
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
