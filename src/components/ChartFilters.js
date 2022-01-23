import {
  Button,
  Checkbox,
  Container,
  Heading,
  HStack,
  Input,
  Spacer,
  VStack,
} from "@chakra-ui/react";

const ChartFilters = (props) => {
  return (
    <Checkbox
      pr={4}
      pl={4}
      isChecked={props._state.includes(props.name)}
      onChange={() => {
        if (props._state.includes(props.name)) {
          props._setState(props._state.filter((f) => f !== props.name));
        } else {
          props._setState([...props._state, props.name]);
        }
      }}
    >
      {props.name}
    </Checkbox>
  );
};

export default ChartFilters;
