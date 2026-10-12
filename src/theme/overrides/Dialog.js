export default function Dialog(theme) {
  return {
    MuiDialog: {
      styleOverrides: {
        paper: {
          borderRadius: 16,
        },
        paperFullScreen: {
          borderRadius: 0,
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        colorPrimary: {
          backgroundImage: theme.palette.gradients.primary,
        },
      },
    },
  };
}
