import React, { useState } from 'react';
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
  NavbarText
} from 'reactstrap';

import Logo from './Logo'
import styled from 'styled-components'

const MainBlueNav = styled.div`
    background-color: blue;
`;

const Boldlink = styled.span`
  font-weight: bold;
`;

const Upper = styled.span`
  text-transform: uppercase
`;


const CompanyDashboard = ({ warehouses, passActiveWarehouse }) => {
  const [isOpen, setIsOpen] = useState(false);
  const exsistWarehouses = [];
  warehouses.forEach((property, i) => exsistWarehouses[i] = property.name);

  const toggle = () => setIsOpen(!isOpen);

  function activateWarehouse(warehouse) {
    const wlength = warehouses.length;
    for (let i = 0; i < wlength; ++i) {
      warehouses[i].active = false;
    }
    if (warehouse === 'init') {
      passActiveWarehouse([...warehouses])
      return;
    }
    const activeWH = warehouses.find(wHouse => wHouse.name === warehouse)
    const activeWarehouseIndex = warehouses.findIndex(wHouse => wHouse.name === warehouse);
    activeWH.active = true;
    warehouses.splice(activeWarehouseIndex, activeWH);
    passActiveWarehouse([...warehouses]);
  }

  return (
    <MainBlueNav>
      <Navbar light expand="md">
        <NavbarBrand href="/">
          <Logo />
        </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mr-auto text-white" navbar>
            <NavItem >
              <NavLink href="/components/" className='text-white'>Inventory</NavLink>
            </NavItem>
            <NavItem >
              <NavLink className='text-white' href="https://github.com/reactstrap/reactstrap">Alerts</NavLink>
            </NavItem>
            <UncontrolledDropdown nav inNavbar>
              <DropdownToggle nav>
                <Boldlink className='text-white'>
                  Products Managment
              </Boldlink>
              </DropdownToggle>

              <DropdownMenu right>
                {exsistWarehouses.map((warehouse, i) => {
                  return (
                    <DropdownItem key={`warehouse${i}`} onClick={() => activateWarehouse(warehouse)}>
                      <Upper>
                        warehouse {warehouse}
                      </Upper>
                    </DropdownItem>
                  )
                })}
                <DropdownItem divider />
                <DropdownItem onClick={() => activateWarehouse('init')}>
                  Main Page
                </DropdownItem>
              </DropdownMenu>
            </UncontrolledDropdown>
          </Nav>
          <NavbarText className='text-white'>Supply-Chain</NavbarText>
        </Collapse>
      </Navbar>
    </MainBlueNav>
  );
}

export default CompanyDashboard;