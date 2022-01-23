import React, { useState } from "react";
import {
  Input,
  InputGroup,
  MenuItem,
  Menu,
  MenuButton,
  MenuList,
  InputLeftAddon,
} from "@chakra-ui/react";

import { units, converter } from "../utils/units";

const UnitInput = (props) => {
  const [selectedUnit, setSelectedUnit] = useState(
    props.selectedUnit || "Grams",
  );
  const options = units.filter((unit) => unit != selectedUnit);

  const onChange = ({ target }) => {
    const value = parseFloat(target.value) * converter[selectedUnit].ratio;
    if (value) {
      props.handleUnitInput(value);
    } else {
      props.handleUnitInput(0);
    }
  };

  const handleUnitSelect = (value) => {
    if (props.passUnitSelect) {
      props.passUnitSelect(value);
    }
    setSelectedUnit(value);
  };

  return (
    <InputGroup className={props.className}>
      <InputLeftAddon>
        <Menu>
          <MenuButton>{selectedUnit}</MenuButton>
          <MenuList>
            {options.map((unit) => (
              <MenuItem key={unit} onClick={() => handleUnitSelect(unit)}>
                {unit}
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      </InputLeftAddon>
      <Input type="number" onChange={onChange} />;
    </InputGroup>
  );
};

export default UnitInput;
