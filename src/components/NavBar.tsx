import React from 'react';

import styled from 'styled-components';

import { NavItem } from './NavItem';

const NavStyled = styled.nav`
  background-color: #008e73;
  padding: 50px;
  a {
    color: white;
  }
`;

export const NavBar = () => {
  return (
    <>
      <NavStyled>
        <NavItem>Home</NavItem>
        <NavItem>About</NavItem>
        <NavItem>Contact Us</NavItem>
      </NavStyled>
    </>
  );
};
