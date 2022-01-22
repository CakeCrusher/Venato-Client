import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GrocerySelect from "../components/GrocerySelect";

const GroceryItem = (props) => {
  useEffect(() => {
    console.log("props.selectedItems", props.itemSelecting);
  }, [props.itemSelecting]);

  const handleCreateDailyMeal = async () => {
    const ids = props.itemSelecting.map((item) => item.id);
    const amts = props.itemSelecting.map((item) => item.amt_used_g);
    // FETCH CREATE MEAL
    props.resetSelectedItems();
    // FETCH UPDATED GROCERY ITEMS
    props.setGroceryItems([
      {
        id: Math.random(),
        name: "chips",
        amt_g: 50,
      },
    ]);
  };

  return (
    <div>
      {props.groceryItems.map((item) => (
        <GrocerySelect item={item} key={item.id} />
      ))}
      <button onClick={handleCreateDailyMeal}>Make daily meal</button>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    groceryItems: state.groceryItems,
    itemSelecting: state.itemSelecting,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    resetSelectedItems: () => {
      dispatch({ type: "RESET_SELECTED_ITEMS", payload: null });
    },
    setGroceryItems: (groceryItems) => {
      dispatch({ type: "SET_G_ITEMS", payload: groceryItems });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroceryItem);
