import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Heading,
  Input,
  InputGroup,
  InputLeftAddon,
  Table,
  Tbody,
  Tr,
  Td,
  VStack,
  HStack,
} from "@chakra-ui/react";
import { connect } from "react-redux";
import GrocerySelect from "../components/GrocerySelect";
import { createMeal, getGroceries, getMeals } from "../utils/api";

const GroceryItem = (props) => {
  const [mealName, setMealName] = useState("");
  // Filter should not exclude selected items
  const [filter, setFilter] = useState("");

  useEffect(() => {
    getGroceries(props.userId)
      .then((res) => {
        if (res.data) {
          props.setGroceryItems(res.data.msg);
        }
      })
      .catch((err) => console.error(err));
  }, [props.itemSelecting]);

  const handleCreateDailyMeal = async () => {
    const selected = props.itemSelecting.map((item) => {
      console.log(item);
      return {
        nutrition_id: item.nutrition_id,
        amount_g: item.amt_used_g,
      };
    });

    try {
      const mealStub = await createMeal(props.userId, mealName, selected);
      const newMeal = await getMeals(props.userId);
      console.log(newMeal);

      //props.addMean(newMeal)
    } catch (err) {
      console.log(err);
    }
  };

  const handleInput = (evt) => {
    const { value } = evt.target;
    setFilter(value);
  };

  const filteredItems = useMemo(() => {
    if (filter !== "") {
      return props.groceryItems.filter((item) => {
        const inSelected = props.itemSelecting.some(
          (e) => e.name === item.name,
        );
        const inFilter = item.name.includes(filter);
        return inSelected || inFilter;
      });
    }
    return props.groceryItems;
  }, [props.groceryItems, props.itemSelecting, filter]);

  return (
    <Container>
      <VStack mt="8">
        <HStack>
          <Heading size="lg">Your Groceries</Heading>
        </HStack>

        <HStack>
          <InputGroup>
            <InputLeftAddon children="Filter" />
            <Input id="filter-input" onChange={handleInput} />
          </InputGroup>
        </HStack>

        <HStack minW="80%">
          <Table>
            <Tbody>
              {filteredItems.map((item) => {
                return (
                  <Tr key={item.id}>
                    <Td>
                      <GrocerySelect item={item} />
                    </Td>
                  </Tr>
                );
              })}
            </Tbody>
          </Table>
        </HStack>
        <HStack>
          <input
            type="text"
            placeholder={"Meal name"}
            value={mealName}
            onChange={(e) => setMealName(e.target.value)}
          />
          <button onClick={handleCreateDailyMeal}>Make daily meal</button>
        </HStack>
      </VStack>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    groceryItems: state.groceryItems,
    itemSelecting: state.itemSelecting,
    userId: state.currentUser.id,
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
