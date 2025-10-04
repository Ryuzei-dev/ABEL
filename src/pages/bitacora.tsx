import styled from "styled-components";
import { DataTable } from "@/components/Tabla/data-table";
import { bitacoraColumns, type Bitacora } from "@/components/Tabla/Columns/bitacora";

export default function Bitacora() {
  const datosBitacora: Bitacora[] = [
    {
      id: "1",
      evento: "Ajuste de switch",
      usuario: "admin",
      fecha: "2025-09-21 10:00",
      detalle: "Se ajustó el switch con ID 123"
    },
    {
      id: "2",
      evento: "Actualización de dispositivo",
      usuario: "usuario1",
      fecha: "2025-09-21 09:30",
      detalle: "Se actualizó el dispositivo con ID 123"
    },
  ];

  return (
    <Wrapper>
      <WrapperTable>
        <DataTable
          title="Bitácora del Sistema"
          filterLabel="Filtrar por acción o usuario"
          filterColumn="evento"
          columns={bitacoraColumns}
          data={datosBitacora}
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
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.25);
`;
