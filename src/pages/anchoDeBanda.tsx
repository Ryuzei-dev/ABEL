import styled from "styled-components";
import { DataTable } from "@/components/Tabla/data-table";
import { anchoBandaColumns, type AnchoBanda } from "@/components/Tabla/Columns/anchoBanda";

export default function AnchoDeBanda() {
  const datosAnchoBanda: AnchoBanda[] = [
    {
      id: "1",
      nombre: "Conexión Principal",
      velocidad: "100 Mbps",
      consumo: "45%",
      fechaRegistro: "2025-09-21 10:00"
    },
    {
      id: "2",
      nombre: "Backup",
      velocidad: "50 Mbps",
      consumo: "15%",
      fechaRegistro: "2025-09-21 10:00"
    },
  ];

  return (
    <Wrapper>
      <WrapperTable>
        <DataTable
          title="Ancho de Banda"
          filterLabel="Filtrar por nombre"
          onAdd={() => {
            console.log("Agregar elemento");
          }}
          columns={anchoBandaColumns}
          data={datosAnchoBanda}
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
