import styled, { css } from "styled-components";
import { NavLink } from "react-router-dom";
import React from "react";
import { FiHome, FiBox, FiBook, FiWifi, FiClock, FiUsers, FiLogOut, FiChevronLeft, FiChevronRight, FiShare2 } from "react-icons/fi";

type Item = {
  label: string;
  to: string;
  icon: React.ReactNode;
};

const items: Item[] = [
  { label: "Inicio", to: "/dashboard", icon: <FiHome /> },
  { label: "Inventario", to: "/inventario", icon: <FiBox /> },
  { label: "Bitácora", to: "/bitacora", icon: <FiBook /> },
  { label: "Ancho de banda", to: "/ancho-de-banda", icon: <FiWifi /> },
  { label: "Historial", to: "/historial", icon: <FiClock /> },
  { label: "Usuarios", to: "/usuarios", icon: <FiUsers /> },
];

export default function Navbar() {
  const [collapsed, setCollapsed] = React.useState(true);
  const [animating, setAnimating] = React.useState(false);

  const handleToggle = () => {
    setCollapsed((c) => !c);
    setAnimating(true);
  };

  const handleTransitionEnd: React.TransitionEventHandler<HTMLDivElement> = (e) => {
    if (e.propertyName === 'width') {
      setAnimating(false);
    }
  };

  const showLabels = !collapsed && !animating;

  return (
    <Sidebar collapsed={collapsed} onTransitionEnd={handleTransitionEnd}>
      <Brand collapsed={collapsed}>
        <BrandIcon collapsed={collapsed}><FiShare2 /></BrandIcon>
        <BrandText show={showLabels}>ABEL++</BrandText>
        <ToggleButton
          type="button"
          onClick={handleToggle}
          aria-label={collapsed ? "Expandir barra lateral" : "Colapsar barra lateral"}
          title={collapsed ? "Expandir" : "Colapsar"}
          collapsed={collapsed}
        >
          {collapsed ? <FiChevronRight /> : <FiChevronLeft />}
        </ToggleButton>
      </Brand>
      <NavList>
        {items.map((item) => (
          <NavItem
            key={item.to}
            to={item.to}
            end={item.to === "/"}
            collapsed={collapsed}
            title={collapsed ? item.label : undefined}
          >
            <IconWrap>{item.icon}</IconWrap>
            <Label show={showLabels}>{item.label}</Label>
          </NavItem>
        ))}
      </NavList>
      <Bottom>
        <NavItem to="/logout" collapsed={collapsed} title={collapsed ? "Cerrar sesión" : undefined}>
          <IconWrap><FiLogOut /></IconWrap>
          <Label show={showLabels}>Cerrar sesión</Label>
        </NavItem>
      </Bottom>
    </Sidebar>
  );
}

const Sidebar = styled.aside<{ collapsed: boolean }>`
  width: ${(p) => (p.collapsed ? '4rem' : '15rem')};
  height: 100%;
  display: flex;
  flex-direction: column;
  background: ${(p) => p.theme.colors.secondary};
  border-right: 0.0625rem solid ${(p) => p.theme.colors.border};
  color: ${(p) => p.theme.colors.text};
  transition: width 0.2s ease;
  overflow-x: hidden;
`;

const Brand = styled.div<{ collapsed: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(p) => p.theme.spacing.sm};
  padding: ${(p) => (p.collapsed ? p.theme.spacing.sm : p.theme.spacing.md)};
  border-bottom: 0.0625rem solid ${(p) => p.theme.colors.border};
  justify-content: ${(p) => (p.collapsed ? 'center' : 'flex-start')};
`;

const BrandIcon = styled.div<{ collapsed: boolean }>`
  color: ${(p) => p.theme.colors.tertiary};
  font-size: 1.25rem; /* 20px */
  display: ${(p) => (p.collapsed ? 'none' : 'inline-flex')};
`;

const BrandText = styled.div<{ show: boolean }>`
  font-weight: ${(p) => p.theme.fontWeights.semibold};
  font-size: ${(p) => p.theme.fontSizes.lg};
  display: ${(p) => (p.show ? 'block' : 'none')};
  transition: none;
  white-space: nowrap;
`;

const NavList = styled.nav`
  display: flex;
  flex-direction: column;
  padding: ${(p) => p.theme.spacing.sm};
  gap: ${(p) => p.theme.spacing.xs};
  overflow-y: auto;
  overflow-x: hidden;
`;

// Define before activeStyles so it can be referenced safely
const IconWrap = styled.span`
  display: inline-flex;
  width: 1.25rem; /* 20px */
  height: 1.25rem; /* 20px */
  font-size: 1.25rem; /* 20px -> controls react-icons size via em */
  color: ${(p) => p.theme.colors.textSecondary};
  svg { width: 100%; height: 100%; display: block; }
`;

const Label = styled.span<{ show: boolean }>`
  display: ${(p) => (p.show ? 'inline' : 'none')};
  transition: none;
  white-space: nowrap;
`;

const activeStyles = css`
  background: rgba(0, 240, 255, 0.08);
  color: ${(p) => p.theme.colors.text};
  border: 0.0625rem solid ${(p) => p.theme.colors.border};
  & ${IconWrap} {
    color: ${(p) => p.theme.colors.tertiary};
  }
`;

const NavItem = styled(NavLink)<{ collapsed?: boolean }>`
  display: flex;
  align-items: center;
  gap: ${(p) => (p.collapsed ? '0' : p.theme.spacing.sm)};
  padding: 0.625rem ${(p) => (p.collapsed ? p.theme.spacing.sm : p.theme.spacing.md)};
  border-radius: ${(p) => p.theme.borderRadius.sm};
  color: ${(p) => p.theme.colors.textSecondary};
  text-decoration: none;
  transition: background 0.15s ease, color 0.15s ease, border-color 0.15s ease;

  /* Cuando está colapsado, centramos el icono y ocultamos el texto */
  justify-content: ${(p) => (p.collapsed ? 'center' : 'flex-start')};
  ${Label} {
    display: ${(p) => (p.collapsed ? 'none' : 'inline')};
  }

  &:hover {
    background: rgba(255, 255, 255, 0.04);
    color: ${(p) => p.theme.colors.text};
  }

  &[aria-current="page"] {
    ${activeStyles}
  }
`;

const ToggleButton = styled.button<{ collapsed: boolean }>`
  margin-left: ${(p) => (p.collapsed ? '0' : 'auto')};
  display: inline-flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem; /* alinea con tamaño de iconos */
  background: transparent;
  border: 0;
  color: ${(p) => p.theme.colors.textSecondary};
  padding: ${(p) => p.theme.spacing.xs};
  border-radius: ${(p) => p.theme.borderRadius.sm};
  transition: background 0.15s ease, color 0.15s ease;
  flex-shrink: 0;

  &:hover {
    background: rgba(255, 255, 255, 0.06);
    color: ${(p) => p.theme.colors.text};
  }
`;

const Bottom = styled.div`
  margin-top: auto;
  padding: ${(p) => p.theme.spacing.sm};
  border-top: 0.0625rem solid ${(p) => p.theme.colors.border};
`;