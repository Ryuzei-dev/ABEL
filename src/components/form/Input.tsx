import * as React from "react";
import styled, { css } from "styled-components";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label?: string;
  error?: string;
};

export const Input = React.forwardRef<HTMLInputElement, InputProps>(
  ({ label, error, ...props }, ref) => {
    return (
      <Field>
        {label && <Label>{label}</Label>}
        <StyledInput ref={ref} $hasError={!!error} {...props} />
        {error && <Error role="alert">{error}</Error>}
      </Field>
    );
  }
);

Input.displayName = "Input";

export default Input;

const Field = styled.label`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 0.25rem; /* 4px */
  font-size: ${(p) => p.theme.fontSizes.sm};
`;

const Label = styled.span`
  color: ${(p) => p.theme.colors.text};
  font-weight: ${(p) => p.theme.fontWeights.semibold};
`;

const StyledInput = styled.input<{ $hasError: boolean }>`
  height: 2.5rem; /* 40px */
  width: 100%;
  border-radius: ${(p) => p.theme.borderRadius.md};
  background: ${(p) => p.theme.colors.primary};
  padding: 0 0.75rem; /* 12px */
  font-size: ${(p) => p.theme.fontSizes.sm};
  color: ${(p) => p.theme.colors.text};
  border: 0.0625rem solid ${(p) => p.theme.colors.border};
  outline: none;
  &::placeholder {
    color: ${(p) => p.theme.colors.placeholder};
  }
  ${(p) =>
    p.$hasError &&
    css`
      border-color: #ef4444; /* rojo - puede integrarse a theme si lo deseas */
    `}
  &:focus-visible {
    box-shadow: 0 0 0 0.125rem ${() => "#00F0FF33"};
  }
`;

const Error = styled.span`
  font-size: ${(p) => p.theme.fontSizes.xs};
  color: #ef4444; /* rojo */
`;
