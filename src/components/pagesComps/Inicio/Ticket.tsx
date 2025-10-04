import { useState, useRef, useEffect } from "react";
import styled from "styled-components";
import { FiMoreVertical, FiEye, FiEdit2, FiCheckCircle } from "react-icons/fi";

export type TicketProps = {
  id: string;
  titulo: string;
  descripcion?: string;
  anotaciones?: string;
  dispositivo?: string;
  severidad?: "baja" | "media" | "alta";
  estado?: "abierto" | "en_progreso" | "cerrado";
  fecha?: string; // ISO date or human text
  onAction?: (action: "ver" | "editar" | "cerrar", id: string) => void;
};

export default function Ticket({
  id,
  titulo,
  descripcion,
  anotaciones,
  dispositivo,
  severidad = "media",
  estado = "abierto",
  fecha,
  onAction,
}: TicketProps) {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    if (open) document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [open]);

  function handle(action: "ver" | "editar" | "cerrar") {
    onAction?.(action, id);
    setOpen(false);
  }

  return (
    <Item>
      <Left>
        <Header>
          <HeaderRow>
            <Title>{titulo}</Title>
            <Actions ref={menuRef}>
              <ActionButton aria-label="Acciones" onClick={() => setOpen((v) => !v)}>
                <FiMoreVertical />
              </ActionButton>
              {open && (
                <Menu role="menu">
                  <MenuItem role="menuitem" onClick={() => handle("ver")}>
                    <FiEye /> Ver
                  </MenuItem>
                  <MenuItem role="menuitem" onClick={() => handle("editar")}>
                    <FiEdit2 /> Editar
                  </MenuItem>
                  <MenuItem role="menuitem" onClick={() => handle("cerrar")}>
                    <FiCheckCircle /> Cerrar
                  </MenuItem>
                </Menu>
              )}
            </Actions>
          </HeaderRow>
          <TagsRow>
            {severidad && <Badge $level={severidad}>{severidad}</Badge>}
            {estado && <Status $state={estado}>{estado.replace("_", " ")}</Status>}
          </TagsRow>
        </Header>
        {descripcion && <Description>{descripcion}</Description>}
        {anotaciones && (
          <Annotations>
            <Label>Anotaciones:</Label>
            <AnnotationText>{anotaciones}</AnnotationText>
          </Annotations>
        )}
        <MetaRow>
          {dispositivo && <Meta>Dispositivo: {dispositivo}</Meta>}
          {fecha && <Meta>Fecha: {fecha}</Meta>}
        </MetaRow>
      </Left>
    </Item>
  );
}

const Item = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: 100%;
  padding: 1rem;
  border-radius: ${(p) => p.theme.borderRadius.md};
  background: ${(p) => p.theme.colors.primary};
  color: ${(p) => p.theme.colors.text};
  border: 1px solid rgba(255, 255, 255, 0.06);
`;

const Left = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  min-width: 0; /* allow text truncation */
`;

/* Right column removed: actions are now inside the header */

const Header = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const HeaderRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 0.5rem;
`;

const TagsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const Title = styled.h3`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
`;

const Description = styled.p`
  margin: 0;
  color: ${(p) => p.theme.colors.textSecondary};
  line-height: 1.4;
`;

const Annotations = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
`;

const Label = styled.span`
  font-size: 0.8rem;
  color: ${(p) => p.theme.colors.text};
  opacity: 0.9;
`;

const AnnotationText = styled.p`
  margin: 0;
  color: ${(p) => p.theme.colors.textSecondary};
  line-height: 1.4;
`;

const MetaRow = styled.div`
  display: flex;
  gap: 1rem;
  flex-wrap: wrap;
  color: ${(p) => p.theme.colors.textSecondary};
  font-size: 0.9rem;
`;

const Meta = styled.span``;

const Badge = styled.span<{ $level: "baja" | "media" | "alta" }>`
  text-transform: capitalize;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: ${(p) =>
    p.$level === "alta"
      ? "#7f1d1d"
      : p.$level === "media"
      ? "#1e3a8a"
      : "#14532d"};
  color: ${(p) =>
    p.$level === "alta"
      ? "#fecaca"
      : p.$level === "media"
      ? "#bfdbfe"
      : "#bbf7d0"};
`;

const Status = styled.span<{ $state: "abierto" | "en_progreso" | "cerrado" }>`
  text-transform: capitalize;
  font-size: 0.75rem;
  padding: 0.15rem 0.5rem;
  border-radius: 999px;
  background: ${(p) =>
    p.$state === "cerrado" ? "#064e3b" : p.$state === "en_progreso" ? "#3f3f46" : "#7c2d12"};
  color: ${(p) =>
    p.$state === "cerrado" ? "#d1fae5" : p.$state === "en_progreso" ? "#e4e4e7" : "#ffedd5"};
`;

const Actions = styled.div`
  position: relative;
`;

const ActionButton = styled.button`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: ${(p) => p.theme.colors.placeholder}0.06;
  border: 1px solid rgba(255, 255, 255, 0.08);
  color: ${(p) => p.theme.colors.text};
  cursor: pointer;
  transition: background 0.15s ease;
  &:hover {
    background: ${(p) => p.theme.colors.placeholder}0.12;
  }
`;

const Menu = styled.div`
  position: absolute;
  top: 2.4rem;
  right: 0;
  display: flex;
  flex-direction: column;
  min-width: 10rem;
  padding: 0.25rem;
  border-radius: 0.5rem;
  background: ${(p) => p.theme.colors.secondary};
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.35);
  z-index: 5;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem 0.6rem;
  border: 0;
  border-radius: 0.375rem;
  background: transparent;
  color: ${(p) => p.theme.colors.text};
  cursor: pointer;
  text-align: left;
  &:hover {
    background: rgba(255, 255, 255, 0.06);
  }
`;

