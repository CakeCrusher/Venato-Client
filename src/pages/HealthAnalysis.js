import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

const HealthAnalysis = (props) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    props.setUser({ id: 1 });
  }, []);
  return (
    <div>
      <h1>Health Analysis</h1>
    </div>
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

export default connect(mapStateToProps, mapDispatchToProps)(HealthAnalysis);
