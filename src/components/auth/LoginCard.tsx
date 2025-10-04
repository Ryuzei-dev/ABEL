import * as React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/form/Input";
import { Checkbox } from "@/components/form/Checkbox";
import styled from "styled-components";
import { FiWifi } from "react-icons/fi";
import { useTheme } from "styled-components";

export type LoginCardProps = {
  title?: string;
  subtitle?: string;
  onLogin?: (values: { email: string; password: string }) => void | Promise<void>;
  className?: string;
} & Omit<React.HTMLAttributes<HTMLDivElement>, 'onSubmit'>;

export default function LoginCard({
  title = "Inicia sesión",
  subtitle,
  onLogin,
  className = "",
  ...props
}: LoginCardProps) {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [showPassword, setShowPassword] = React.useState(false);
  const [loading, setLoading] = React.useState(false);
  const theme = useTheme();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      setLoading(true);
      if (onLogin) {
        await onLogin({ email, password });
      } else {
        navigate("/dashboard");
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <Card className={className} {...props}>
      <Header>
        <IconWrap>
          <FiWifi />
        </IconWrap>
        <Title>{title}</Title>
        {subtitle ? <Subtitle>{subtitle}</Subtitle> : null}
      </Header>

      <Form noValidate onSubmit={handleSubmit}>
        <Input
          label="Correo"
          type="email"
          placeholder="correo@ejemplo.com"
          autoComplete="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <FieldGroup>
          <Input
            label="Contraseña"
            type={showPassword ? "text" : "password"}
            placeholder="********"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Checkbox
            checked={showPassword}
            onChange={(e) => setShowPassword(e.currentTarget.checked)}
            label="Mostrar/ocultar contraseña"
          />
        </FieldGroup>

        <ButtonRow>
          <Button type="submit" disabled={loading} style={{ backgroundColor: theme.colors.primary }}>
            {loading ? "Ingresando…" : "Iniciar sesión"}
          </Button>
        </ButtonRow>
      </Form>
    </Card>
  );
}

const Card = styled.div`
  width: 100%;
  max-width: 24rem; /* 448px */
  border-radius: ${(p) => p.theme.borderRadius.md};
  border: 0.0625rem solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.secondary};
  color: ${(p) => p.theme.colors.text};
  padding: 1.5rem; /* 24px */
`;

const Header = styled.div`
  margin-bottom: 1rem; /* 16px */
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
`;

const Title = styled.h1`
  font-size: ${(p) => p.theme.fontSizes.xxl};
  font-weight: ${(p) => p.theme.fontWeights.bold};
  letter-spacing: 0.01em;
  margin: 0;
`;

const Subtitle = styled.p`
  margin: 0.25rem 0 0; /* 4px top */
  font-size: ${(p) => p.theme.fontSizes.sm};
  color: ${(p) => p.theme.colors.textSecondary};
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem; /* 16px */
`;

const FieldGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem; /* 8px */
`;

const IconWrap = styled.div`
  font-size: 8rem; /* 36px */
  color: ${(p) => p.theme.colors.tertiary};
  margin-bottom: 0.5rem; /* 8px */
`;

const ButtonRow = styled.div`
  width: 100%;
    & > button {
    width: 100%;
    transition: box-shadow 0.15s ease;
  }
  & > button:hover {
    background: ${(p) => p.theme.colors.border} !important;
  }
`;
