import { createGlobalStyle } from "styled-components";

export const darkTheme = {
  colors: {
    primary: "#031022",
    secondary: "#0B1A33",
    tertiary: "#00F0FF",
    text: "#E9EAEB",
    textSecondary: "#969696",
    placeholder: "#4F586C",
    border: "#1E2A44"
  },
  fonts: {
    body: "'Segoe UI', system-ui, -apple-system, sans-serif"
  },
  fontSizes: {
    xs: '0.75rem',  // 12px
    sm: '0.875rem', // 14px
    md: '1rem',     // 16px
    lg: '1.25rem',  // 20px
    xl: '1.5rem',   // 24px
    xxl: '2rem'     // 32px
  },
  spacing: {
    xs: '0.25rem',  // 4px
    sm: '0.5rem',   // 8px
    md: '1rem',     // 16px
    lg: '1.5rem',   // 24px
    xl: '2rem'      // 32px
  },
  borderRadius: {
    sm: '0.25rem',  // 4px
    md: '0.5rem',   // 8px
    lg: '0.75rem'   // 12px
  },
  fontWeights: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700
  }
}

export const GlobalStyle = createGlobalStyle`
  *, *::before, *::after {
    box-sizing: border-box;
  }

  html, body, #root {
    height: 100%;
  }

  body {
    margin: 0;
    padding: 0;
    font-family: ${(props) => props.theme.fonts.body};
    font-size: ${(props) => props.theme.fontSizes.md};
    /* Use Shadcn/Tailwind CSS variables to avoid conflicts */
    color: var(--foreground);
    background-color: var(--background);
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  ::selection {
    background: color-mix(in oklab, var(--ring) 30%, transparent);
    color: var(--foreground);
  }

  a {
    color: var(--primary);
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }

  /* Avoid setting color/background/border so Tailwind utilities win */
  input, textarea, select, button {
    font-family: inherit;
    font-size: inherit;
    outline: none;
  }

  input::placeholder, textarea::placeholder {
    color: var(--muted-foreground);
  }

  button {
    cursor: pointer;
  }

  *::-webkit-scrollbar {
    width: 0.625rem; /* 10px */
    height: 0.625rem; /* 10px */
  }
  *::-webkit-scrollbar-track {
    background: var(--background);
  }
  *::-webkit-scrollbar-thumb {
    background-color: var(--border);
    border-radius: 0.5rem; /* 8px */
    border: 0.125rem solid var(--background); /* 2px */

  :focus-visible {
    outline: 0.125rem solid var(--ring); /* 2px */
    outline-offset: 0.125rem; /* 2px */
  }
`;