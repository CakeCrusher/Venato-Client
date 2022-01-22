import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const App = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    props.setUser({ id: 1 });
  }, []);
  return <div></div>;
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
