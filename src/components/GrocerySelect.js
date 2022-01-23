import React, { useEffect, useState } from "react";
import { VStack, Checkbox, Text } from "@chakra-ui/react";
import { connect } from "react-redux";
import UnitInput from "./UnitInput";

const GrocerySelect = (props) => {
  const [marked, setMarked] = useState(false);
  const [amt, setAmt] = useState(100);
  useEffect(() => {
    props.editSelectedItem({
      ...props.item,
      amt_used_g: amt,
    });
  }, [amt]);

  const item = {
    ...props.item,
    amt_used_g: amt,
  };
  const handleMarked = (e) => {
    const willBe = !marked;
    if (willBe) {
      props.addSelectedItem(item);
    } else {
      props.removeSelectedItem(item);
    }
    setMarked(willBe);
  };

  const handleUnitInput = (value) => {
    console.log(value);
    setAmt(value);
  };
  return (
    <VStack alignItems="flex-start">
      {/* create  a checkbox input with an onchange that toggles marked */}
      <Checkbox alignSelf="flex-start" onChange={handleMarked}>
        {item.name}
      </Checkbox>
      <Text>Total: {props.item.amount_g} grams</Text>
      <UnitInput
        className={marked ? "" : "hidden"}
        handleUnitInput={handleUnitInput}
      />
    </VStack>
  );
};

const mapStateToProps = (state) => {
  return {
    currentUser: state.currentUser,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addSelectedItem: (item) => {
      dispatch({ type: "SELECT_ITEM", payload: item });
    },
    removeSelectedItem: (item) => {
      dispatch({ type: "REMOVE_ITEM", payload: item });
    },
    editSelectedItem: (item) => {
      dispatch({ type: "EDIT_SELECTED_ITEM", payload: item });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(GrocerySelect);
