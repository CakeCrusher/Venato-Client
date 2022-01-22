const initialState = {
  currentUser: {},
  groceryItems: [{ name: "egg" }],
};

function reducer(state = initialState, action) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        currentUser: action.payload,
      };
    case "ADD_G_ITEM":
      return {
        ...state,
        groceryItems: [...state.groceryItems, action.payload],
      };
    default:
      return state;
  }
}

export default reducer;
