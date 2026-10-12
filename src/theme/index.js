import PropTypes from 'prop-types';
import { createContext, useEffect, useMemo, useState } from 'react';
import { CssBaseline } from '@mui/material';
import { ThemeProvider as MUIThemeProvider, createTheme, StyledEngineProvider } from '@mui/material/styles';
import { createPalette } from './palette';
import typography from './typography';
import componentsOverride from './overrides';
import { buildShadows } from './shadows';

export const ColorModeContext = createContext({
  mode: 'light',
  toggleColorMode: () => {},
});

const STORAGE_KEY = 'alinma-color-mode';

ThemeProvider.propTypes = {
  children: PropTypes.node,
};

export default function ThemeProvider({ children }) {
  const [mode, setMode] = useState(() => (localStorage.getItem(STORAGE_KEY) === 'dark' ? 'dark' : 'light'));

  const toggleColorMode = () => {
    setMode((prev) => {
      const next = prev === 'light' ? 'dark' : 'light';
      localStorage.setItem(STORAGE_KEY, next);
      return next;
    });
  };

  useEffect(() => {
    document.documentElement.style.colorScheme = mode;
  }, [mode]);

  const theme = useMemo(() => {
    const palette = createPalette(mode);
    const { shadows, customShadows } = buildShadows(palette);
    const nextTheme = createTheme({
      palette,
      shape: { borderRadius: 12 },
      typography,
      shadows,
      customShadows,
      breakpoints: {
        values: {
          xs: 0,
          sm: 600,
          md: 900,
          lg: 1200,
          xl: 1536,
          xxl: 1920,
        },
      },
    });
    nextTheme.components = componentsOverride(nextTheme);
    return nextTheme;
  }, [mode]);

  const contextValue = useMemo(() => ({ mode, toggleColorMode }), [mode]);

  return (
    <ColorModeContext.Provider value={contextValue}>
      <StyledEngineProvider injectFirst>
        <MUIThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </MUIThemeProvider>
      </StyledEngineProvider>
    </ColorModeContext.Provider>
  );
}
