import React, { useState } from "react";
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  NavLink,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  NavbarText,
  UncontrolledTooltip
} from "reactstrap";

import Logo from "./Logo";
import styled from "styled-components";
// import { useHistory } from "react-router-dom";

const MainBlueNav = styled.div`
  background-color: blue;
`;

const Boldlink = styled.span`
  font-weight: bold;
`;

const Upper = styled.span`
  text-transform: uppercase;
`;

export const CompanyDashboard = ({
  warehouses,
  passActiveWarehouse,
  currentRoute,
  passVirtulRoute
}) => {
  // let history = useHistory();
  const [isOpen, setIsOpen] = useState(false);
  const exsistWarehouses = [];
  warehouses.forEach((property, i) => (exsistWarehouses[i] = property.name));

  const warehousesUseCases = [];
  warehouses.forEach(
    (property, i) => (warehousesUseCases[i] = property.useCase)
  );

  const toggle = () => setIsOpen(!isOpen);

  function activateWarehouse(warehouse) {
    const wlength = warehouses.length;
    for (let i = 0; i < wlength; ++i) {
      warehouses[i].active = false;
    }
    if (warehouse === "init") {
      passActiveWarehouse([...warehouses]);
      return;
    }
    const activeWH = warehouses.find(wHouse => wHouse.name === warehouse);
    const activeWarehouseIndex = warehouses.findIndex(
      wHouse => wHouse.name === warehouse
    );
    activeWH.active = true;
    warehouses.splice(activeWarehouseIndex, activeWH);
    passActiveWarehouse([...warehouses]);
  }

  // const whButtonSwitch = history.location.pathname;
  // const whButtonFlag = whButtonSwitch === '/' ? true : false;
  // function showWarehouseOptions() {
  //   history.push('/');
  // }

  return (
    <MainBlueNav>
      <Navbar light expand="md">
        <NavbarBrand href="/supply-chain">
          <Logo />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto text-white" navbar>
            <NavItem>
              <NavLink
                id="git"
                href="https://github.com/avivsab/supply-chain"
                className="text-white"
              >
                Repository
              </NavLink>
              <UncontrolledTooltip placement="bottom" target="git">
                view source code
              </UncontrolledTooltip>
            </NavItem>
            <NavItem
              id="alerts"
              style={{ margin: "0 35px" }}
              onClick={() => passVirtulRoute("alerts")}
            >
              <NavLink className="text-white">Alerts </NavLink>
              <UncontrolledTooltip placement="bottom" target="alerts">
                Mimic routes functionality <hr />
                Real route system can be Accessed on development mode
              </UncontrolledTooltip>
            </NavItem>
            {currentRoute === "base" ? (
              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav>
                  <Boldlink className="text-white" id="main-functionality">
                    {<span>Warehouses Managment</span>}
                  </Boldlink>
                  <UncontrolledTooltip
                    placement="right"
                    target="main-functionality"
                    style={{ width: "280px", padding: 3 }}
                  >
                    Main Functioning Warehouses
                  </UncontrolledTooltip>
                </DropdownToggle>
                <DropdownMenu right>
                  {exsistWarehouses.map((warehouse, i) => {
                    return (
                      <DropdownItem
                        key={`warehouse${i}`}
                        onClick={() => activateWarehouse(warehouse)}
                        id={"wh" + i}
                      >
                        <Upper>
                          warehouse {warehouse}
                          <UncontrolledTooltip
                            placement="right"
                            target={"wh" + i}
                          >
                            {warehousesUseCases[i]}
                          </UncontrolledTooltip>
                        </Upper>
                      </DropdownItem>
                    );
                  })}
                  <DropdownItem divider />
                  <DropdownItem onClick={() => activateWarehouse("init")}>
                    Main Page
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            ) : (
              <span onClick={() => passVirtulRoute("base")} className="m-auto">
                back to warehouses with Saved credentials
              </span>
            )}
          </Nav>
          <NavbarText className="text-white">Supply-Chain</NavbarText>
        </Collapse>
      </Navbar>
    </MainBlueNav>
  );
};

export default CompanyDashboard;
