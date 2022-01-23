import React, { useEffect, useState } from "react";
import {
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  IconButton,
  Container,
  Flex,
} from "@chakra-ui/react";
import { HamburgerIcon } from "@chakra-ui/icons";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Wrapper(props) {
  return (
    <Flex py="4" w="100vw" backgroundColor="#343434">
      <Container>
        <Menu>
          <MenuButton
            as={IconButton}
            aria-label="Options"
            icon={<HamburgerIcon />}
          />
          <MenuList>
            <MenuItem>
              <Link style={{ margin: "5px" }} className="px-2" to="/">
                Home
              </Link>
            </MenuItem>
            <MenuItem>
              <Link style={{ margin: "5px" }} to="/adding-groceries">
                Add Groceries
              </Link>
            </MenuItem>
            <MenuItem>
              <Link style={{ margin: "5px" }} to="/groceries">
                My Groceries
              </Link>
            </MenuItem>
            <MenuItem>
              <Link style={{ margin: "5px" }} to="/health-analysis">
                Health Analysis
              </Link>
            </MenuItem>
          </MenuList>
        </Menu>
      </Container>

      {props.children}
    </Flex>
  );
}

export default Wrapper;
