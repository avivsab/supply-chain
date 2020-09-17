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
import './Navbar.css'
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


const CompanyNavbarBrand = (props) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
  
  return (
      
    <MainBlueNav>

      <Navbar light expand="md">
        <NavbarBrand href="/">
         <Logo/>

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
                <DropdownItem>
              <Upper>
                  warehouse north
              </Upper>
                </DropdownItem>
                <DropdownItem>
                <Upper>
                  warehouse west
              </Upper>
                </DropdownItem>
                <DropdownItem divider />
                <DropdownItem>
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


export default CompanyNavbarBrand;