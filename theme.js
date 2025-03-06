//theme.js

import { DefaultTheme as PaperDefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';

export const LightTheme = {
  ...PaperDefaultTheme,
  dark: false,
  colors: {
    ...PaperDefaultTheme.colors,
    primary: '#007AFF', // Blue
    accent: '#34C759',  // Green
    background: '#F2F2F7', // Light Grey
    surface: '#FFFFFF',
    text: '#1C1C1E',
    placeholder: '#8E8E93',
  },
};

export const CustomDarkTheme = {
  ...PaperDarkTheme,
  dark: true,
  colors: {
    ...PaperDarkTheme.colors,
    primary: '#0A84FF', // Bright Blue
    accent: '#30D158',  // Bright Green
    background: '#1C1C1E', // Dark Grey
    surface: '#2C2C2E',
    text: '#FFFFFF',
    placeholder: '#A1A1A1',
  },
};


const theme = {
  colors: {
    background: '#f8f9fa', // Light mode background
    primary: '#007bff', // Primary blue color
    text: '#333', // Dark text color
  },
};

export default theme;
