import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

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
  return (
    <div>
      {/* create  a checkbox input with an onchange that toggles marked */}
      <input type="checkbox" checked={marked} onChange={handleMarked} />
      <button className="btn btn-primary">{item.name}</button>
      <div className={marked ? "" : "hidden"}>
        <input
          type="text"
          value={amt}
          onChange={(e) => setAmt(e.target.value)}
        />
      </div>
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
