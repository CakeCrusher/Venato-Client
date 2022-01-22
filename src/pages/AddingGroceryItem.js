import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Wrapper from "../components/Wrapper";

const AddGroceryItem = (props) => {
  const [groceryItem, setGroceryItem] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const handleItemChange = async (e) => {
    setGroceryItem(e.target.value);
    // FETCH RECOMMENDATIONS
    const recoms = ["apple", "banana", "orange"];
    setRecommendations(recoms.filter((r) => r.includes(groceryItem)));
  };
  const handleSubmitItem = (e) => {
    // FETCH ADD GROCERY ITEM
    const groceryItem = {
      id: Math.random(),
      name: "apple",
      amt_g: 100,
    };
    props.addGroceryItem(groceryItem);
  };
  return (
    <Wrapper>
      <input type="text" value={groceryItem} onChange={handleItemChange} />
      <button onClick={handleSubmitItem}>add</button>
      <ul>
        {recommendations.map((item) => (
          <li key={item}>{item}</li>
        ))}
      </ul>
      <ul>
        {props.groceryItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    groceryItems: state.groceryItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addGroceryItem: (groceryItem) => {
      dispatch({ type: "ADD_G_ITEM", payload: groceryItem });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddGroceryItem);
