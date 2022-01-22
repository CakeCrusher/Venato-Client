const initialState = {
  currentUser: {},
  groceryItems: [
    {
      id: Math.random(),
      name: "apple",
      amt_g: 100,
    },
    {
      id: Math.random(),
      name: "pear",
      amt_g: 100,
    },
  ],
  itemSelecting: [],
  meals: [],
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
    case "SET_G_ITEMS":
      return {
        ...state,
        groceryItems: action.payload,
      };
    case "SELECT_ITEM":
      return {
        ...state,
        itemSelecting: [...state.itemSelecting, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        itemSelecting: state.itemSelecting.filter(
          (item) => item.id !== action.payload.id
        ),
      };
    case "EDIT_SELECTED_ITEM":
      return {
        ...state,
        itemSelecting: state.itemSelecting.map((item) => {
          if (item.id === action.payload.id) {
            return action.payload;
          }
          return item;
        }),
      };
    case "RESET_SELECTED_ITEMS":
      return {
        ...state,
        itemSelecting: [],
      };

    case "SET_MEALS":
      return {
        ...state,
        meals: action.payload,
      };
    case "ADD_MEAL":
      return {
        ...state,
        meals: [...state.meals, action.payload],
      };

    default:
      return state;
  }
}

export default reducer;
