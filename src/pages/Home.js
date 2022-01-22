import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";

function Home(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (register = false) => {
    if (register) {
      // FETCH BACKEND REGISTER
    }
    // FETCH BACKEND LOGIN
    if (username === "user" && password === "pass") {
      const user = { id: 1 };
      props.login(user);
    } else {
      console.log("wrong login");
    }
  };
  return (
    <Wrapper>
      <input
        type="text"
        placeholder="username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>login</button>
      <button onClick={() => handleLogin(true)}>register</button>
      <h3>user: {props.currentUser.id}</h3>
    </Wrapper>
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
