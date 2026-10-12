import { Link as RouterLink } from 'react-router-dom';
import { Button, Typography, Container, Box } from '@mui/material';
import Page from '../components/Page';

export default function Page404() {
  return (
    <Page title="404 Page Not Found">
      <Container>
        <Box
          sx={{
            maxWidth: 480,
            margin: 'auto',
            minHeight: '100vh',
            display: 'flex',
            justifyContent: 'center',
            flexDirection: 'column',
            textAlign: 'center',
            alignItems: 'center',
          }}
        >
          <Typography sx={{ fontSize: 72, fontWeight: 800, letterSpacing: '-0.06em', color: 'primary.main' }}>
            404
          </Typography>
          <Typography variant="h4" sx={{ mb: 1 }}>
            This page is not on the desk
          </Typography>
          <Typography sx={{ color: 'text.secondary', mb: 4 }}>
            The address does not match a screen in Alinma Travels. Head back to the dashboard.
          </Typography>
          <Button to="/dashboard/app" size="large" variant="contained" component={RouterLink}>
            Go to dashboard
          </Button>
        </Box>
      </Container>
    </Page>
  );
}
