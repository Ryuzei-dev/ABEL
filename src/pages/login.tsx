import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import LoginCard from "@/components/auth/LoginCard";

export default function Login() {
  const navigate = useNavigate();

  return (
    <Wrapper>
      <LoginCard
        title="ABEL++"
        onLogin={async ({ email, password }: { email: string; password: string }) => {
            console.log("Email:", email, "Password:", password);
          navigate('/dashboard');
        }}
      />
    </Wrapper>
  );
}

const Wrapper = styled.div`
  min-height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

/* La tarjeta completa se maneja dentro de LoginCard */

