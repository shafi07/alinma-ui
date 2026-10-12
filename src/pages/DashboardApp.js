import { useTheme } from '@mui/material/styles';
import { Box, Grid } from '@mui/material';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import { AppCurrentVisits, AppWebsiteVisits, AppWidgetSummary } from '../sections/@dashboard/app';
import { panelSx } from '../theme/panel';

const stats = [
  { title: 'Javasath', total: 700, icon: 'mdi:passport', color: 'primary' },
  { title: 'Insurance', total: 500, icon: 'mdi:shield-check-outline', color: 'info' },
  { title: 'Work', total: 200, icon: 'mdi:briefcase-outline', color: 'warning' },
  { title: 'Visa', total: 100, icon: 'mdi:airplane', color: 'secondary' },
];

export default function DashboardApp() {
  const theme = useTheme();

  return (
    <Page title="Dashboard">
      <PageHeader group="Overview" title="Dashboard" description="Files and income across Alinma Travels." />

      <Box
        sx={(theme) => ({
          ...panelSx(theme),
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', lg: 'repeat(4, 1fr)' },
          mb: 3,
        })}
      >
        {stats.map((item, index) => (
          <AppWidgetSummary
            key={item.title}
            title={item.title}
            total={item.total}
            icon={item.icon}
            color={item.color}
            sx={{
              boxShadow: 'none',
              borderRadius: 0,
              bgcolor: 'transparent',
              borderRight: { lg: index < stats.length - 1 ? '1px solid' : 'none' },
              borderBottom: {
                xs: index < stats.length - 1 ? '1px solid' : 'none',
                lg: 'none',
              },
              borderColor: 'divider',
            }}
          />
        ))}
      </Box>

      <Grid container spacing={3}>
        <Grid item xs={12} lg={8}>
          <AppWebsiteVisits
            title="Income"
            subheader="(+43%) than last year"
            chartLabels={[
              '01/01/2023',
              '02/01/2023',
              '03/01/2023',
              '04/01/2023',
              '05/01/2023',
              '06/01/2023',
              '07/01/2023',
              '08/01/2023',
              '09/01/2023',
              '10/01/2023',
              '11/01/2023',
            ]}
            chartData={[
              { name: 'Jvazath', type: 'column', fill: 'solid', data: [23, 11, 22, 27, 13, 22, 37, 21, 44, 22, 30] },
              { name: 'Insurance', type: 'area', fill: 'gradient', data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43] },
              { name: 'Visa', type: 'line', fill: 'solid', data: [30, 25, 36, 30, 45, 35, 64, 52, 59, 36, 39] },
              { name: 'Work', type: 'line', fill: 'solid', data: [35, 30, 36, 35, 45, 30, 60, 52, 50, 30, 39] },
            ]}
          />
        </Grid>
        <Grid item xs={12} lg={4}>
          <AppCurrentVisits
            title="Current status"
            chartData={[
              { label: 'Jvazath', value: 4344 },
              { label: 'Insurance', value: 5435 },
              { label: 'Visa', value: 1443 },
              { label: 'Work', value: 2443 },
            ]}
            chartColors={[
              theme.palette.primary.main,
              theme.palette.chart.blue[0],
              theme.palette.chart.violet[0],
              theme.palette.chart.yellow[0],
            ]}
          />
        </Grid>
      </Grid>
    </Page>
  );
}
