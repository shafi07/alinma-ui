import { Box, Button, Dialog, IconButton, Typography } from '@mui/material';
import { alpha } from '@mui/material/styles';
import Iconify from '../Iconify';

function fieldStyles(theme) {
  const dark = theme.palette.mode === 'dark';
  return {
    '& .MuiGrid-item': {
      padding: '0 !important',
      margin: 0,
      maxWidth: 'none !important',
      flexBasis: 'auto !important',
      width: 'auto !important',
    },
    '& .MuiFormControl-root, & .MuiTextField-root': {
      width: '100%',
    },
    '& .MuiInputLabel-root': {
      position: 'static',
      transform: 'none',
      display: 'block',
      fontSize: 12,
      fontWeight: 600,
      lineHeight: 1.2,
      marginBottom: '4px',
      color: theme.palette.text.secondary,
      maxWidth: '100%',
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis',
    },
    '& .MuiInputLabel-root.Mui-focused': {
      color: theme.palette.primary.main,
    },
    '& .MuiInputLabel-root.Mui-error': {
      color: theme.palette.error.main,
    },
    '& .MuiOutlinedInput-notchedOutline legend': {
      display: 'none',
      width: 0,
      maxWidth: 0,
      padding: 0,
    },
    '& .MuiOutlinedInput-root': {
      borderRadius: '6px',
      backgroundColor: dark ? alpha('#ffffff', 0.04) : '#F7F8F7',
    },
    '& .MuiOutlinedInput-input, & .MuiSelect-select': {
      paddingTop: '8px',
      paddingBottom: '8px',
      fontSize: 14,
      lineHeight: 1.4,
    },
    '& .MuiOutlinedInput-notchedOutline': {
      top: 0,
      borderColor: dark ? alpha('#ffffff', 0.12) : alpha('#14211E', 0.12),
    },
    '& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline': {
      borderColor: alpha(theme.palette.primary.main, 0.5),
    },
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: theme.palette.primary.main,
      borderWidth: 1,
    },
    '& .MuiFormHelperText-root': {
      marginLeft: 0,
      marginRight: 0,
      marginTop: '2px',
    },
    '& .MuiFormHelperText-root:empty': {
      display: 'none',
    },
  };
}

export function FormSection({ title, children }) {
  return (
    <Box component="section" sx={{ '& + &': { mt: 1.75 } }}>
      <Typography
        component="h3"
        sx={(theme) => ({
          mb: 1,
          pb: 0.5,
          fontSize: 11,
          fontWeight: 700,
          letterSpacing: '0.12em',
          textTransform: 'uppercase',
          color: theme.palette.primary.main,
          borderBottom: `1px solid ${theme.palette.primary.main}`,
        })}
      >
        {title}
      </Typography>
      <Box
        sx={(theme) => ({
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: '1fr 1fr',
            md: '1fr 1fr 1fr',
            lg: '1fr 1fr 1fr 1fr',
            xl: 'repeat(5, 1fr)',
            xxl: 'repeat(6, 1fr)',
          },
          columnGap: 1.5,
          rowGap: 1.25,
          ...fieldStyles(theme),
        })}
      >
        {children}
      </Box>
    </Box>
  );
}

export default function RecordForm({ open, title, onClose, onSubmit, loading = false, children }) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth={false}
      PaperProps={{
        elevation: 0,
        sx: (theme) => ({
          width: 'min(1760px, calc(100vw - 32px))',
          height: 'auto',
          minHeight: 'min(600px, calc(100dvh - 48px))',
          maxHeight: 'calc(100dvh - 48px)',
          m: '12px',
          borderRadius: '12px',
          bgcolor: 'background.paper',
          backgroundImage: 'none',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          boxShadow:
            theme.palette.mode === 'dark'
              ? '0 24px 64px rgba(0, 0, 0, 0.45)'
              : '0 24px 64px rgba(16, 24, 40, 0.16)',
        }),
      }}
    >
      <Box
        sx={(theme) => ({
          flex: '0 0 auto',
          display: 'flex',
          alignItems: 'center',
          gap: 2,
          px: 2,
          minHeight: 48,
          borderBottom: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Typography sx={{ fontSize: 16, fontWeight: 700, letterSpacing: '-0.02em', lineHeight: 1.2 }}>
          {title}
        </Typography>
        <Box sx={{ flex: 1 }} />
        <IconButton onClick={onClose} aria-label="close" size="small" sx={{ color: 'text.secondary' }}>
          <Iconify icon="eva:close-fill" width={18} height={18} />
        </IconButton>
      </Box>

      <Box sx={{ flex: '1 1 auto', minHeight: 0, overflow: 'auto', px: 2, py: 1.5 }}>{children}</Box>

      <Box
        sx={(theme) => ({
          flex: '0 0 auto',
          display: 'flex',
          justifyContent: 'flex-end',
          alignItems: 'center',
          gap: 1,
          px: 2,
          minHeight: 52,
          borderTop: `1px solid ${theme.palette.divider}`,
        })}
      >
        <Button
          onClick={onClose}
          color="inherit"
          sx={{ textTransform: 'none', fontWeight: 600, color: 'text.secondary', minHeight: 36 }}
        >
          Cancel
        </Button>
        <Button
          onClick={onSubmit}
          variant="contained"
          disabled={loading}
          sx={{ textTransform: 'none', fontWeight: 700, minHeight: 36, px: 2.5, minWidth: 96, boxShadow: 'none' }}
        >
          Save
        </Button>
      </Box>
    </Dialog>
  );
}
