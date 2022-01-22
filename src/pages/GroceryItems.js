import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import GrocerySelect from "../components/GrocerySelect";
import Wrapper from "../components/Wrapper";

const GroceryItem = (props) => {
  const [mealName, setMealName] = useState("");
  useEffect(() => {
    console.log("props.selectedItems", props.itemSelecting);
  }, [props.itemSelecting]);

  const handleCreateDailyMeal = async () => {
    const ids = props.itemSelecting.map((item) => item.id);
    const amts = props.itemSelecting.map((item) => item.amt_used_g);
    // FETCH CREATE MEAL
    const meal = {
      name: mealName
        ? mealName
        : props.itemSelecting.map((i) => i.name).join(", "),
      calories: 100,
    };
    props.resetSelectedItems();
    props.addMeal(meal);
    // FETCH UPDATED GROCERY ITEMS
    props.setGroceryItems([
      {
        id: Math.random(),
        name: "chips",
        amt_g: 50,
      },
    ]);
  };

  console.log("props.meals", props.meals);

  return (
    <Wrapper>
      <h1>Groceries</h1>
      {props.groceryItems.map((item) => (
        <GrocerySelect item={item} key={item.id} />
      ))}
      <input
        type="text"
        placeholder={"Meal name"}
        value={mealName}
        onChange={(e) => setMealName(e.target.value)}
      />
      <button onClick={handleCreateDailyMeal}>Make daily meal</button>
    </Wrapper>
  );
};

const mapStateToProps = (state) => {
  return {
    groceryItems: state.groceryItems,
    itemSelecting: state.itemSelecting,
    meals: state.meals,
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
    addMeal: (meal) => {
      dispatch({ type: "ADD_MEAL", payload: meal });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GroceryItem);
