import * as React from "react";
import styled from "styled-components";

export type CheckboxProps = Omit<React.InputHTMLAttributes<HTMLInputElement>, "type"> & {
  label?: string;
};

export const Checkbox = React.forwardRef<HTMLInputElement, CheckboxProps>(
  ({ label, ...props }, ref) => {
    return (
      <Root>
        <Box type="checkbox" ref={ref} {...props} />
        {label && <Text>{label}</Text>}
      </Root>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;

const Root = styled.label`
  display: inline-flex;
  align-items: center;
  gap: 0.5rem; /* 8px */
  font-size: ${(p) => p.theme.fontSizes.sm};
  user-select: none;
`;

const Box = styled.input.attrs({ type: "checkbox" })`
  appearance: none;
  width: 1rem; /* 16px */
  height: 1rem; /* 16px */
  border-radius: 0.25rem; /* 4px */
  border: 0.0625rem solid ${(p) => p.theme.colors.border};
  background: ${(p) => p.theme.colors.secondary};
  outline: none;
  position: relative;
  vertical-align: middle;

  transition: border-color 0.15s ease, background-color 0.15s ease, box-shadow 0.15s ease;

  &:hover {
    border-color: ${(p) => p.theme.colors.textSecondary};
  }

  &:focus-visible {
    box-shadow: 0 0 0 0.125rem ${() => "#00F0FF33"};
  }

  &:checked {
    background: ${(p) => p.theme.colors.tertiary};
    border-color: ${(p) => p.theme.colors.tertiary};
  }

  /* Checkmark */
  &::after {
    content: "";
    position: absolute;
    inset: 0;
    display: block;
    width: 0.5rem; /* 8px */
    height: 0.3rem; /* ~5px */
    border: 0.125rem solid ${(p) => p.theme.colors.primary}; /* uses background as stroke */
    border-top: 0;
    border-right: 0;
    transform: translate(0.22rem, 0.2rem) rotate(-45deg);
    opacity: 0;
    transition: opacity 0.15s ease;
    pointer-events: none;
  }

  &:checked::after {
    opacity: 1;
  }
`;

const Text = styled.span`
  color: ${(p) => p.theme.colors.textSecondary};
`;
