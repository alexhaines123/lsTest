import React from 'react';

import styled from 'styled-components';

const StyledItem = styled.span`
  margin: 0px 10px;
`;

export const NavItem: React.FC = ({ children }) => {
  return (
    <>
      <StyledItem>
        <a href="/">{children}</a>
      </StyledItem>
    </>
  );
};
