import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { useState } from "react";
import { FaBars, FaHome, FaBox, FaCog } from "react-icons/fa"; 
import logo from '../../assets/react.svg'; 

const SidebarContainer = styled.div<{ collapsed: boolean }>`
  width: ${({ collapsed }) => (collapsed ? "80px" : "250px")};
  transition: width 0.3s;
  min-height: 100vh;
  background-color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const LogoContainer = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
  
  img {
    width: ${({ collapsed }) => (collapsed ? "0" : "50px")};
    height: auto;
    transition: width 0.3s; // Smooth transition for hiding logo
    overflow: hidden; // Prevents any overflow from the image
  }
`;

const CollapseIcon = styled.div`
  cursor: pointer;
  color: #333; // Adjust icon color if needed
`;

const SidebarLink = styled(NavLink)`
  display: flex;
  align-items: center;
  padding: 10px;
  text-decoration: none;
  color: #333;
  margin-bottom: 10px;

  &.active {
    background-color: #f0f0f0; // Example active background
  }
`;

const Icon = styled.div`
  margin-right: 10px; // Space between icon and text
`;

const Sidebar = () => {
  const [collapsed, setCollapsed] = useState(false);

  const toggleCollapse = () => {
    setCollapsed(!collapsed);
  };

  return (
    <SidebarContainer collapsed={collapsed}>
      <LogoContainer collapsed={collapsed}>
        <img src={logo} alt="Logo" />
        <CollapseIcon onClick={toggleCollapse}>
          <FaBars />
        </CollapseIcon>
      </LogoContainer>
      <SidebarLink to="/" >
        <Icon><FaHome /></Icon>
        {!collapsed && <span>Dashboard</span>}
      </SidebarLink>
      <SidebarLink to="/order-management" >
        <Icon><FaBox /></Icon>
        {!collapsed && <span>Order Management</span>}
      </SidebarLink>
      <SidebarLink to="/settings" >
        <Icon><FaCog /></Icon>
        {!collapsed && <span>Settings</span>}
      </SidebarLink>
    </SidebarContainer>
  );
};

export default Sidebar;
