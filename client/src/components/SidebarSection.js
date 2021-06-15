import React from "react";
import {
  ProSidebar,
  Menu,
  MenuItem,
  SidebarHeader,
  SidebarContent,
  SidebarFooter,
} from "react-pro-sidebar";
import { useHistory, Link } from "react-router-dom";
import {
  FaDoorOpen,
  FaGem,
  FaHeartbeat,
  FaInbox,
  FaStar,
} from "react-icons/fa";
import styled from "styled-components";

import "react-pro-sidebar/dist/css/styles.css";
import Logo from "../assets/images/rembux.svg";
import { Badge } from "react-bootstrap";

import { logout } from "../services/auth.service";

const SidebarSection = () => {
  const history = useHistory();
  const handleLogout = async () => {
    await logout();
    history.push("/login");
  };
  return (
    <ProSidebar>
      <SidebarLogo>
        <img src={Logo} alt="rembux icon" style={{ padding: "1rem" }} />
      </SidebarLogo>
      <SidebarContent>
        <Menu iconShape="circle">
          <MenuItem icon={<FaGem />}>
            <Link to="/" />
            Dashboard
          </MenuItem>
          <MenuItem icon={<FaStar />}>
            <Link to="/project" />
            Project
          </MenuItem>
          <MenuItem icon={<FaHeartbeat />}>
            <Link to="/review" />
            Testimonial
          </MenuItem>
          <MenuItem icon={<FaInbox />}>
            <Link to="/inbox" />
            Inbox <Badge variant="danger">3</Badge>
          </MenuItem>
        </Menu>
      </SidebarContent>
      <SidebarFooter>
        <LogoutWrapper>
          <BtnLogout onClick={handleLogout}>
            <FaDoorOpen size={20} />
            Logout
          </BtnLogout>
        </LogoutWrapper>
      </SidebarFooter>
    </ProSidebar>
  );
};

export default SidebarSection;

const LogoutWrapper = styled.div`
  padding: 1rem;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const SidebarLogo = styled(SidebarHeader)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const BtnLogout = styled.button`
  text-decoration: none;
  background-color: rgba(255, 255, 255, 0.3);
  padding: 10px 24px;
  border-radius: 25px;
  color: #f6f6f6;
  transition: 0.3s cubic-bezier(0.075, 0.82, 0.165, 1);
  :hover {
    color: white;
  }
`;
