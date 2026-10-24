import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Divider,
  GlobalStyles,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';

export default function Print() {
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  useEffect(() => {
    const handleAfterPrint = () => navigate(`/dashboard/${data.path}`);
    window.addEventListener('afterprint', handleAfterPrint);
    window.print();

    return () => window.removeEventListener('afterprint', handleAfterPrint);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      {/* Removes the browser's header/footer (URL, date, title) when printing */}
      <GlobalStyles styles={{ '@page': { margin: 0 } }} />

      <Box sx={{ p: '15mm' }}>
        <Divider>Alinma-Invoice</Divider>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: 2 }}>
          <Box>
            <Typography variant="h4" component="h1">
              Alinma
            </Typography>
            <Box>Near Gold Market(Sulaimaniya),</Box>
            <Box>Al kharj</Box>
            <Box>Riyadh, Saudi Arabia</Box>
          </Box>

          <Box component="table">
            <Box component="tbody">
              <Box component="tr">
                <Box component="th" sx={{ textAlign: 'left', pr: 1 }}>
                  File No :
                </Box>
                <Box component="td">{`${data.fileid}`}</Box>
              </Box>
              <Box component="tr">
                <Box component="th" sx={{ textAlign: 'left', pr: 1 }}>
                  Invoice Date :
                </Box>
                <Box component="td">
                  {new Date()
                    .toLocaleDateString('en-GB', { day: '2-digit', month: '2-digit', year: '2-digit' })
                    .replaceAll('/', '-')}
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>

        <Box sx={{ mt: 6 }}>
          Bill To: <strong>Alinma-Travels Ltd</strong>
        </Box>

        <Table sx={{ mt: 1.25, width: '100%' }}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Service</TableCell>
              <TableCell>ID number</TableCell>
              <TableCell>Total</TableCell>
              <TableCell>Balance</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>{data.name}</TableCell>
              <TableCell>{data.sub_category}</TableCell>
              <TableCell>{data.id_number}</TableCell>
              <TableCell>{data.total_amount}</TableCell>
              <TableCell>{data.balance_amount}</TableCell>
            </TableRow>
          </TableBody>
        </Table>

        <Box sx={{ mt: 6, display: 'flex', justifyContent: 'flex-end' }}>
          <Box component="table">
            <Box component="tbody">
              <Box component="tr">
                <Box component="th" sx={{ textAlign: 'left', pr: 1 }}>
                  Gross Total :
                </Box>
                <Box component="td">{` SR. ${data.total_amount}`}</Box>
              </Box>
              <Box component="tr">
                <Box component="th" sx={{ textAlign: 'left', pr: 1 }}>
                  Paid Amount :
                </Box>
                <Box component="td">{` SR. ${data.paid_amount}`}</Box>
              </Box>
              <Box component="tr">
                <Box component="th" sx={{ textAlign: 'left', pr: 1 }}>
                  Balance:
                </Box>
                <Box component="td">{` SR. ${data.balance_amount}`}</Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </>
  );
}