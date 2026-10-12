import { alpha } from '@mui/material/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(135deg, ${color1} 0%, ${color2} 100%)`;
}

const GREY = {
  0: '#FFFFFF',
  100: '#F7F5F1',
  200: '#EEEAE3',
  300: '#E4DED4',
  400: '#C9C2B6',
  500: '#8F877C',
  600: '#5E574E',
  700: '#3A342C',
  800: '#1C1915',
  900: '#0E1218',
  500_8: alpha('#8F877C', 0.08),
  500_12: alpha('#8F877C', 0.12),
  500_16: alpha('#8F877C', 0.16),
  500_24: alpha('#8F877C', 0.24),
  500_32: alpha('#8F877C', 0.32),
  500_48: alpha('#8F877C', 0.48),
  500_56: alpha('#8F877C', 0.56),
  500_80: alpha('#8F877C', 0.8),
};

const PRIMARY = {
  lighter: '#E4F4F2',
  light: '#5EBFB6',
  main: '#0F6E6A',
  dark: '#0A4F4C',
  darker: '#063432',
  contrastText: '#fff',
};

const SECONDARY = {
  lighter: '#F8F1DE',
  light: '#E4C77A',
  main: '#C4A15A',
  dark: '#8E7030',
  darker: '#5C4718',
  contrastText: '#1C1915',
};

const INFO = {
  lighter: '#E6F1FA',
  light: '#7EB6E0',
  main: '#2F6F9F',
  dark: '#1C4C72',
  darker: '#102E47',
  contrastText: '#fff',
};

const SUCCESS = {
  lighter: '#E5F6EA',
  light: '#6FCB86',
  main: '#1F8A4C',
  dark: '#146636',
  darker: '#0B3D20',
  contrastText: '#fff',
};

const WARNING = {
  lighter: '#FFF4DE',
  light: '#F0C36A',
  main: '#D0891C',
  dark: '#9A6210',
  darker: '#5E3A08',
  contrastText: '#1C1915',
};

const ERROR = {
  lighter: '#FDECEC',
  light: '#F09A96',
  main: '#D14343',
  dark: '#A12B2B',
  darker: '#6B1A1A',
  contrastText: '#fff',
};

const GRADIENTS = {
  primary: createGradient(PRIMARY.dark, PRIMARY.main),
  info: createGradient(INFO.dark, INFO.main),
  success: createGradient(SUCCESS.dark, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.dark, ERROR.main),
};

const CHART_COLORS = {
  violet: ['#6B5B95', '#8E7BB5', '#B7A6D4', '#DDD4EC'],
  blue: ['#2F6F9F', '#6AA0C8', '#A7C9E0', '#D7E7F2'],
  green: ['#0F6E6A', '#3D9A90', '#8CC9C2', '#D4EBE8'],
  yellow: ['#C4A15A', '#E4C77A', '#F3E3B8', '#FBF6E8'],
  red: ['#D14343', '#E07A76', '#F0B4B1', '#F8DEDC'],
};

const DARK_GREY = {
  0: '#1A2220',
  100: '#151C1A',
  200: '#232C29',
  300: '#31403B',
  400: '#5C6B66',
  500: '#8B9893',
  600: '#C5D0CB',
  700: '#E4EBE8',
  800: '#F2F6F4',
  900: '#FFFFFF',
  500_8: alpha('#8B9893', 0.12),
  500_12: alpha('#8B9893', 0.16),
  500_16: alpha('#8B9893', 0.2),
  500_24: alpha('#8B9893', 0.28),
  500_32: alpha('#8B9893', 0.36),
  500_48: alpha('#8B9893', 0.48),
  500_56: alpha('#8B9893', 0.56),
  500_80: alpha('#8B9893', 0.8),
};

const DARK_PRIMARY = {
  lighter: '#173430',
  light: '#7DCDC6',
  main: '#3EBEB6',
  dark: '#8ED9D3',
  darker: '#D7F4F1',
  contrastText: '#06211F',
};

function buildAction(grey, primary) {
  return {
    active: grey[600],
    hover: grey[500_8],
    selected: alpha(primary.main, 0.16),
    disabled: grey[500_80],
    disabledBackground: grey[500_24],
    focus: grey[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48,
  };
}

const lightPalette = {
  mode: 'light',
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY },
  secondary: { ...SECONDARY },
  info: { ...INFO },
  success: { ...SUCCESS },
  warning: { ...WARNING },
  error: { ...ERROR },
  grey: GREY,
  gradients: GRADIENTS,
  chart: CHART_COLORS,
  divider: alpha('#1C1915', 0.08),
  text: { primary: '#1C1915', secondary: '#5E574E', disabled: '#8F877C' },
  background: { paper: '#FFFFFF', default: '#F3F4F6', neutral: '#ECEEF2' },
  action: buildAction(GREY, PRIMARY),
};

const darkPalette = {
  mode: 'dark',
  common: { black: '#000', white: '#fff' },
  primary: DARK_PRIMARY,
  secondary: { lighter: '#3A321C', light: '#E4C77A', main: '#D4B36A', dark: '#F0D7A0', darker: '#FBF6E8', contrastText: '#1C1915' },
  info: { lighter: '#1A2C3A', light: '#8EBFDF', main: '#6AA8D8', dark: '#B7D7EE', darker: '#E6F1FA', contrastText: '#07131C' },
  success: { lighter: '#173328', light: '#7DCAA0', main: '#4CAF78', dark: '#A6E0C0', darker: '#E5F6EA', contrastText: '#062114' },
  warning: { lighter: '#3A2E18', light: '#E8C27A', main: '#E0A54A', dark: '#F3D7A4', darker: '#FFF4DE', contrastText: '#2A1C08' },
  error: { lighter: '#3A1E1E', light: '#F0A0A0', main: '#E36B6B', dark: '#F6C2C2', darker: '#FDECEC', contrastText: '#2A0C0C' },
  grey: DARK_GREY,
  gradients: {
    primary: createGradient('#145E5A', '#1E8A84'),
    info: createGradient('#1A3E58', '#2F6F9F'),
    success: createGradient('#145C38', '#1F8A4C'),
    warning: createGradient('#8A5A14', '#D0891C'),
    error: createGradient('#7A2424', '#D14343'),
  },
  chart: CHART_COLORS,
  divider: alpha('#EEF3F1', 0.1),
  text: { primary: '#EEF3F1', secondary: '#A9B5B0', disabled: '#6E7874' },
  background: { paper: '#1A2220', default: '#101614', neutral: '#232C29' },
  action: buildAction(DARK_GREY, DARK_PRIMARY),
};

export function createPalette(mode = 'light') {
  return mode === 'dark' ? darkPalette : lightPalette;
}

const palette = lightPalette;

export default palette;
