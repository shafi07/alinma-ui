export function panelSx(theme) {
  const dark = theme.palette.mode === 'dark';
  return {
    bgcolor: theme.palette.background.paper,
    borderRadius: '16px',
    overflow: 'hidden',
    boxShadow: dark
      ? 'inset 0 0 0 1px rgba(238, 243, 241, 0.08)'
      : '0 1px 2px rgba(16, 24, 40, 0.04), 0 8px 24px rgba(16, 24, 40, 0.05)',
  };
}
