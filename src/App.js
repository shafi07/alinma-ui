// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';
import { GlobalStyles, useTheme } from '@mui/material';

// ----------------------------------------------------------------------

function GridTheme() {
  const theme = useTheme();
  const dark = theme.palette.mode === 'dark';

  return (
    <GlobalStyles
      styles={{
        '.ag-theme-alpine.ag-theme-alpine': {
          '--ag-font-family': '"Plus Jakarta Sans", sans-serif',
          '--ag-font-size': '13px',
          '--ag-header-background-color': dark ? '#232C29' : '#f7f8fa',
          '--ag-header-foreground-color': theme.palette.text.primary,
          '--ag-odd-row-background-color': dark ? '#151C1A' : '#fcfcfd',
          '--ag-background-color': theme.palette.background.paper,
          '--ag-foreground-color': theme.palette.text.primary,
          '--ag-secondary-foreground-color': theme.palette.text.secondary,
          '--ag-row-hover-color': dark ? '#24302C' : '#f4f7f7',
          '--ag-selected-row-background-color': dark ? '#1E3A36' : '#e7f3f2',
          '--ag-border-color': theme.palette.divider,
          '--ag-alpine-active-color': theme.palette.primary.main,
          '--ag-input-focus-border-color': theme.palette.primary.main,
          '--ag-subheader-background-color': dark ? '#232C29' : '#f7f8fa',
          '--ag-control-panel-background-color': theme.palette.background.paper,
          '--ag-wrapper-border-radius': '0px',
          border: 'none',
          borderRadius: 0,
          boxShadow: 'none',
        },
        '.ag-theme-alpine.ag-theme-alpine .ag-header-cell-text, .ag-theme-alpine.ag-theme-alpine .ag-header-cell-label': {
          color: theme.palette.text.primary,
          fontWeight: 600,
        },
        '.ag-theme-alpine.ag-theme-alpine .ag-text-field-input, .ag-theme-alpine.ag-theme-alpine .ag-input-field-input': {
          color: theme.palette.text.primary,
          backgroundColor: dark ? '#101614' : '#ffffff',
        },
      }}
    />
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <ScrollToTop />
      <BaseOptionChartStyle />
      <GridTheme />
      <Router />
    </ThemeProvider>
  );
}
