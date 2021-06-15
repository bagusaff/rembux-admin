import React from "react";
import styled from "styled-components";
import SidebarSection from "./SidebarSection";

const Layout = ({ children }) => {
  return (
    <Container>
      <Wrapper>
        <SidebarSection />
        <ContentWrapper>{children}</ContentWrapper>
      </Wrapper>
    </Container>
  );
};

export default Layout;

const Container = styled.div`
  box-sizing: border-box;
  padding: 0;
  width: 100%;
  position: relative;
`;

const Wrapper = styled.div`
  display: flex;
  background-color: #edf2f7;
  background-color: rgba(237, 242, 247, 1);
  height: 100vh;
  overflow-y: scroll;
`;

const ContentWrapper = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  overflow: hidden;
  padding: 1rem;
`;
