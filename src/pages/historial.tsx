import styled from "styled-components";
import { DataTable } from "@/components/Tabla/data-table";
import { historialColumns, type Historial } from "@/components/Tabla/Columns/historial";

export default function Historial() {
  const datosHistorial: Historial[] = [
    {
      id: "1",
      fecha: "2025-09-21 10:00",
      usuario: "admin",
      accion: "Actualización de configuración",
      dispositivo: "Switch Cisco 2960"
    },
    {
      id: "2",
      fecha: "2025-09-21 09:45",
      usuario: "admin",
      accion: "Usuario creado",
      dispositivo: "Sistema"
    },
    {
      id: "3",
      fecha: "2025-09-20 16:30",
      usuario: "jperez",
      accion: "Registro eliminado",
      dispositivo: "Inventario"
    },
  ];

  return (
    <Wrapper>
      <WrapperTable>
        <DataTable
          title="Historial de Actividades"
          filterLabel="Filtrar por evento o usuario"
          filterColumn="usuario"
          columns={historialColumns}
          data={datosHistorial}
        />
      </WrapperTable>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
  gap: 1.5rem;
  padding: 1.5rem;
  flex: 1;
`;

const WrapperTable = styled.div`
  width: 100%;
  flex: 1;
  flex-direction: column;
  background-color: ${props => props.theme.colors.secondary};
  color: ${props => props.theme.colors.text};
  border-radius: ${props => props.theme.borderRadius.md};
  padding: 1.5rem;
`;
