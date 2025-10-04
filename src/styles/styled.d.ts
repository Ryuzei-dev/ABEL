import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      secondary: string;
      tertiary: string;
      text: string;
      textSecondary: string;
      placeholder: string;
      border: string;
    };
    fonts: {
      body: string;
    };
    fontSizes: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
      xxl: string;
    };
    spacing: {
      xs: string;
      sm: string;
      md: string;
      lg: string;
      xl: string;
    };
    borderRadius: {
      sm: string;
      md: string;
      lg: string;
    };
    fontWeights: {
      regular: number;
      medium: number;
      semibold: number;
      bold: number;
    };
  }
}
