import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import styled, { ThemeProvider } from "styled-components";
import { darkTheme, GlobalStyle } from "./styles/theme"
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Navbar from "./components/Navbar";
import Dispositivos from "./pages/dispositivos";
import AnchoDeBanda from "./pages/anchoDeBanda";
import Historial from "./pages/historial";
import Usuarios from "./pages/usuarios";
import Mantenimiento from "./pages/mantenimiento";
import Bitacora from "./pages/bitacora";

export default function App() {
  const location = useLocation();
  const showNavbar = location.pathname !== "/"; // hide on login

  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyle />
      <DarkClassApplier />
      <Layout>
        {showNavbar && <Navbar />}
        <Content>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/inventario" element={<Dispositivos />} />
            <Route path="/bitacora" element={<Bitacora />} />
            <Route path="/ancho-de-banda" element={<AnchoDeBanda />} />
            <Route path="/historial" element={<Historial />} />
            <Route path="/usuarios" element={<Usuarios />} />
            <Route path="/mantenimiento" element={<Mantenimiento />} />
            <Route path="/logout" element={<Navigate to="/" replace />} />
          </Routes>
        </Content>
      </Layout>
    </ThemeProvider>
  );
}

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  overflow: hidden; /* oculta scroll global; el contenido maneja su propio scroll */
`;

const Content = styled.main`
  flex: 1 1 auto;
  height: 100%;
  overflow: auto;
  padding: ${(p) => p.theme.spacing.md};
`;

function DarkClassApplier() {
  useEffect(() => {
    document.documentElement.classList.add("dark");
    document.body.classList.add("dark");
  }, []);
  return null;
}
