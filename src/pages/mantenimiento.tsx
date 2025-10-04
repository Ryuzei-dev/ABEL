import styled from "styled-components";
import { DataTable } from "@/components/Tabla/data-table";
import { mantenimientoColumns, type Mantenimiento } from "@/components/Tabla/Columns/mantenimiento";

export default function Mantenimiento() {
  const datosMantenimiento: Mantenimiento[] = [
    {
      id: "1",
      equipo: "Servidor Principal",
      tipo: "Preventivo",
      fechaProgramada: "2025-10-01",
      estado: "Pendiente",
      tecnico: "Juan Pérez"
    },
    {
      id: "2",
      equipo: "Switch Piso 3",
      tipo: "Correctivo",
      fechaProgramada: "2025-09-25",
      estado: "En Progreso",
      tecnico: "Ana Gómez"
    },
  ];

  return (
    <Wrapper>
      <WrapperTable>
        <DataTable
          title="Programación de Mantenimiento"
          filterLabel="Filtrar por equipo o técnico"
          onAdd={() => {
            console.log("Agregar mantenimiento");
          }}
          columns={mantenimientoColumns}
          data={datosMantenimiento}
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
