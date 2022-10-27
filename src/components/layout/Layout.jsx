import React from "react";
import styled from "styled-components";

const Layout = ({ children }) => {
  return <LayoutContainer>{children}</LayoutContainer>;
};

export default Layout;

const LayoutContainer = styled.div`
  width: 100%;
  max-width: 1150px;
  height: 100%;
  max-height: 980px;
  /* background-color: aqua; */
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-left: auto;
  margin-right: auto;
`;
