import React, { useState } from "react";
import { connect } from "react-redux";
import { searchGroceries, addGroceries } from "../utils/api";
import {
  Container,
  HStack,
  FormControl,
  Input,
  Button,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  InputGroup,
  InputLeftAddon,
} from "@chakra-ui/react";
import UnitInput from "../components/UnitInput";
import { SearchIcon } from "@chakra-ui/icons";

import { converter } from "../utils/units";

const debounce = (func, time = 200) => {
  let timeout;
  return (args) => {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(args), time);
  };
};

const AddGroceryItem = (props) => {
  const [groceryItem, setGroceryItem] = useState("");
  const [recommendations, setRecommendations] = useState([]);
  const [unitInput, setUnitInput] = useState(0);
  const [selectedUnit, setSelectedUnit] = useState("Grams");

  const handleSubmitItem = (id) => {
    // Set Loading
    setRecommendations((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, loading: true };
        } else {
          return item;
        }
      }),
    );
    const groceryItem = {
      nutrition_id: id,
      amount_g: unitInput,
    };

    addGroceries(props.userId, [groceryItem])
      .then((res) => {
        if (res.data) {
          props.addGroceryItem(props.userId, res.data.msg[0]);
          // Update color of added item
          setRecommendations((prev) =>
            prev.map((item) => {
              if (item.id === id) {
                return { ...item, added: true, loading: false };
              } else {
                return item;
              }
            }),
          );
        }
      })
      .catch((err) => console.error(err));
  };

  const handleSearchInput = (evt) => {
    const search = evt.target.value;
    const input = search.toLowerCase();

    if (input.length > 0) {
      searchGroceries([input])
        .then((res) => {
          console.log(res);
          setRecommendations(res.data.msg);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleUnitInput = (value) => {
    setUnitInput(value);
  };

  const passUnitSelect = (value) => {
    setSelectedUnit(value);
  };

  return (
    <Container>
      <FormControl>
        <HStack>
          <InputGroup>
            <InputLeftAddon>
              <SearchIcon />
            </InputLeftAddon>
            <Input type="text" onChange={handleSearchInput} />
          </InputGroup>
          <InputGroup>
            <UnitInput
              selectedUnit={selectedUnit}
              passUnitSelect={passUnitSelect}
              handleUnitInput={handleUnitInput}
            />
            {/*<Input type="number" value={unitInput} onChange={handleUnitInput} />*/}
          </InputGroup>
        </HStack>
      </FormControl>
      <Table bariant="simple">
        <Thead>
          <Tr>
            <Th>Name</Th>
          </Tr>
        </Thead>
        <Tbody>
          {recommendations.slice(0, 10).map((nutrition) => {
            return (
              <Tr key={nutrition.id}>
                <Td>{nutrition.name}</Td>
                <Td>
                  <Button
                    colorScheme={nutrition.added && "green"}
                    onClick={() => handleSubmitItem(nutrition.id)}
                    disabled={!(unitInput > 0)}
                    isLoading={nutrition.loading}
                  >
                    {nutrition.added ? "Added" : "Add"} {unitInput}
                    {converter[selectedUnit].short}
                  </Button>
                </Td>
              </Tr>
            );
          })}
        </Tbody>
      </Table>
    </Container>
  );
};

const mapStateToProps = (state) => {
  return {
    groceryItems: state.groceryItems,
    userId: state.currentUser.id,
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
