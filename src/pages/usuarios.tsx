import styled from "styled-components";
import { DataTable } from "@/components/Tabla/data-table";
import { usuariosRolColumns, type UsuarioRol } from "@/components/Tabla/Columns/usuarios";

export default function Usuarios() {
  const datosUsuarios: UsuarioRol[] = [
    {
      id: "1",
      nombre: "Administrador",
      email: "admin@example.com",
      rol: "Administrador",
      estado: "activo"
    },
    {
      id: "2",
      nombre: "Usuario Prueba",
      email: "usuario@example.com",
      rol: "Operador",
      estado: "inactivo"
    },
  ];

  return (
    <Wrapper>
      <WrapperTable>
        <DataTable
          title="Gestión de Usuarios"
          filterLabel="Filtrar por nombre o email"
          filterColumn="nombre"
          onAdd={() => {
            console.log("Agregar usuario");
          }}
          columns={usuariosRolColumns}
          data={datosUsuarios}
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
