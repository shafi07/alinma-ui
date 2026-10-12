export const TABLE_HEIGHT = 'clamp(440px, calc(100dvh - 280px), 1280px)';
export const BULK_TABLE_HEIGHT = 'clamp(420px, calc(100dvh - 240px), 1100px)';

export const pageGutter = (theme) => ({
  paddingLeft: theme.spacing(2),
  paddingRight: theme.spacing(2),
  [theme.breakpoints.up('md')]: {
    paddingLeft: theme.spacing(3),
    paddingRight: theme.spacing(3),
  },
  [theme.breakpoints.up('lg')]: {
    paddingLeft: theme.spacing(4),
    paddingRight: theme.spacing(4),
  },
  [theme.breakpoints.up('xl')]: {
    paddingLeft: theme.spacing(5),
    paddingRight: theme.spacing(5),
  },
  [theme.breakpoints.up('xxl')]: {
    paddingLeft: theme.spacing(6),
    paddingRight: theme.spacing(6),
  },
});
