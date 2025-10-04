import styled from "styled-components";
import type { ReactNode } from "react";

type KPICardProps = {
  titulo: string;
  valor: number;
  subtitulo?: string;
  icono?: ReactNode;
};

export default function KPICard({ titulo, valor, subtitulo, icono }: KPICardProps) {
  return (
    <Card>
      <Header>
        <Title>{titulo}</Title>
        {icono && <IconWrapper>{icono}</IconWrapper>}
      </Header>
      <Value>{new Intl.NumberFormat().format(valor)}</Value>
      {subtitulo && <Subtitle>{subtitulo}</Subtitle>}
    </Card>
  );
}

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 0.25rem;
  padding: 1rem;
  min-width: 12rem;
  width: 100%;
  height: 100%;
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.text};
  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: ${(props) => props.theme.borderRadius.md};
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.25);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Title = styled.span`
  font-size: 0.9rem;
  color: #9ca3af; /* gray-400 */
`;

const IconWrapper = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 2rem;
  height: 2rem;
  border-radius: 0.5rem;
  background: rgba(255, 255, 255, 0.06);
`;

const Value = styled.div`
  font-size: 2rem;
  font-weight: 700;
  line-height: 1.2;
  color: ${(props) => props.theme.colors.text};
`;

const Subtitle = styled.div`
  font-size: ${(props) => props.theme.fontSizes.sm};
  color: ${(props) => props.theme.colors.textSecondary};
`;