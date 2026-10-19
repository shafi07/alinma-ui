import { useState } from 'react';
import {
  Box,
  Button,
  Grid,
  MenuItem,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { alpha } from '@mui/material/styles';
import axios from 'axios';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import { panelSx } from '../theme/panel';
import Iconify from '../components/Iconify';
import { URL } from '../_mock/constant';
import Toast from '../components/toast';
import {
  ENDPOINTS,
  SUB_CATEGORIES,
  buildPayload,
  carryToCategory,
  createRow,
  entryFields,
  validateRows,
  writeTotals,
} from './bulkAddModel';

const services = Object.keys(ENDPOINTS);

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: '6px',
  },
  '& .MuiInputBase-input, & .MuiSelect-select': {
    paddingTop: '7px',
    paddingBottom: '7px',
    fontSize: 13,
    lineHeight: '18px',
    height: 'auto',
  },
  '& .MuiSelect-select': {
    minHeight: '18px !important',
  },
  '& .MuiInputLabel-root': {
    fontSize: 13,
    lineHeight: '18px',
  },
  '& .MuiInputLabel-outlined.MuiInputLabel-sizeSmall:not(.MuiInputLabel-shrink)': {
    transform: 'translate(12px, 6px) scale(1)',
  },
  '& .MuiInputLabel-root.MuiInputLabel-shrink': {
    fontSize: 13,
  },
};

const moneyValue = (value) => (value === 0 || value === '0' || value == null ? '' : value);

const summaryValue = (value) => (Number.isFinite(Number(value)) ? Number(value) : 0);

function FieldInput({ field, row, onChange }) {
  const isMoney = ['agent_amount', 'service', 'iqama', 'insurance', 'other', 'mol', 'absheer_amount', 'qiwa_amount', 'government_fee', 'chamber_amount', 'paid_amount'].includes(field.field);
  const common = {
    label: field.label,
    size: 'small',
    fullWidth: true,
    sx: fieldSx,
    value: isMoney ? moneyValue(row[field.field]) : row[field.field] ?? '',
    onChange: (event) => onChange(field.field, event.target.value),
  };

  if (field.options) {
    return (
      <TextField {...common} select>
        <MenuItem value="">Select</MenuItem>
        {field.options.map((option) => (
          <MenuItem key={option} value={option}>
            {option}
          </MenuItem>
        ))}
      </TextField>
    );
  }

  return <TextField {...common} type={isMoney ? 'number' : 'text'} />;
}

function RecordCard({ index, row, fields, canRemove, onChange, onService, onType, onCopy, onRemove }) {
  return (
    <Box
      sx={(theme) => ({
        p: 1.25,
        borderRadius: '12px',
        bgcolor: theme.palette.mode === 'dark' ? alpha('#fff', 0.03) : alpha('#0F6E6A', 0.03),
        boxShadow: `inset 0 0 0 1px ${alpha(theme.palette.divider, 0.9)}`,
      })}
    >
      <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }} justifyContent="space-between" sx={{ mb: 1 }}>
        <Typography variant="subtitle2" sx={{ whiteSpace: 'nowrap' }}>
          Record {index + 1}
        </Typography>
        <Grid container spacing={1} sx={{ flex: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              size="small"
              sx={fieldSx}
              label="Service"
              value={row.mainCategory || ''}
              onChange={(event) => onService(event.target.value)}
            >
              {services.map((service) => (
                <MenuItem key={service} value={service}>
                  {service}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item xs={12} sm={6} md={4}>
            <TextField
              select
              fullWidth
              size="small"
              sx={fieldSx}
              label="Type"
              value={row.sub_category || ''}
              disabled={!row.mainCategory}
              onChange={(event) => onType(event.target.value)}
            >
              {(SUB_CATEGORIES[row.mainCategory] || []).map((type) => (
                <MenuItem key={type} value={type}>
                  {type}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
        </Grid>
        <Stack direction="row" spacing={0.5} sx={{ flexShrink: 0 }}>
          <Button size="small" color="inherit" onClick={onCopy} startIcon={<Iconify icon="eva:copy-fill" />} sx={{ whiteSpace: 'nowrap' }}>
            Copy
          </Button>
          <Button
            size="small"
            color="inherit"
            disabled={!canRemove}
            onClick={onRemove}
            startIcon={<Iconify icon="eva:trash-2-outline" />}
          >
            Remove
          </Button>
        </Stack>
      </Stack>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 0.5, fontWeight: 700, lineHeight: 1.2 }}>
        Person
      </Typography>
      <Grid container spacing={1}>
        {fields.person.map((field) => (
          <Grid item xs={12} sm={6} md={3} key={field.field}>
            <FieldInput field={field} row={row} onChange={onChange} />
          </Grid>
        ))}
      </Grid>

      <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mt: 1, mb: 0.5, fontWeight: 700, lineHeight: 1.2 }}>
        Amounts
      </Typography>
      <Grid container spacing={1} alignItems="center">
        {fields.fees.map((field) => (
          <Grid item xs={6} sm={4} md={2} key={field.field}>
            <FieldInput field={field} row={row} onChange={onChange} />
          </Grid>
        ))}
        <Grid item xs={6} sm={4} md={2}>
          <FieldInput field={{ field: 'paid_amount', label: 'Paid' }} row={row} onChange={onChange} />
        </Grid>
        <Grid item xs={12} sm={8} md={4}>
          <Stack direction="row" spacing={3} sx={{ pl: { md: 1 } }}>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Total
              </Typography>
              <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
                {summaryValue(row.total_amount)}
              </Typography>
            </Box>
            <Box>
              <Typography variant="caption" color="text.secondary">
                Balance
              </Typography>
              <Typography variant="subtitle2" sx={{ lineHeight: 1.2 }}>
                {summaryValue(row.balance)}
              </Typography>
            </Box>
          </Stack>
        </Grid>
      </Grid>
    </Box>
  );
}

export default function BulkAdd() {
  const [rows, setRows] = useState(() => [createRow()]);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState(null);

  const showMessage = (text) => {
    setMessage(text);
    setToast(true);
  };

  const retarget = (rowId, mainCategory, subCategory) => {
    setRows((current) =>
      current.map((row) => (row.rowId === rowId ? carryToCategory(row, mainCategory, subCategory, row.rowId) : row))
    );
  };

  const updateRow = (rowId, field, value) => {
    setRows((current) =>
      current.map((row) => {
        if (row.rowId !== rowId) return row;
        const next = { ...row, [field]: value };
        writeTotals(next);
        return next;
      })
    );
  };

  const addRow = () => setRows((current) => [...current, createRow()]);

  const copyRow = (rowId) => {
    setRows((current) => {
      const index = current.findIndex((row) => row.rowId === rowId);
      const source = current[index];
      if (!source) return current;
      const copy = carryToCategory(source, source.mainCategory, source.sub_category);
      const next = [...current];
      next.splice(index + 1, 0, copy);
      return next;
    });
  };

  const removeRow = (rowId) => {
    setRows((current) => {
      const next = current.filter((row) => row.rowId !== rowId);
      return next.length ? next : [createRow()];
    });
  };

  const handleSubmit = async () => {
    const problems = validateRows(rows);
    if (problems.length) {
      showMessage(problems.join(' '));
      return;
    }

    setLoading(true);
    try {
      const outcomes = await Promise.all(
        rows.map(async (row, index) => {
          try {
            const res = await axios.post(`${URL}/${ENDPOINTS[row.mainCategory]}`, buildPayload(row));
            return { ok: true, row, index, message: res?.data?.message || 'Saved' };
          } catch (err) {
            return {
              ok: false,
              row,
              index,
              message: err?.response?.data?.message || 'Could not save this row',
            };
          }
        })
      );

      const failed = outcomes.filter((item) => !item.ok);
      const saved = outcomes.length - failed.length;

      if (!failed.length) {
        setRows([createRow()]);
        showMessage(saved === 1 ? outcomes[0].message : `Saved ${saved} records.`);
        return;
      }

      setRows(failed.map((item) => item.row));
      const details = failed.map((item) => `Record ${item.index + 1}: ${item.message}`).join(' ');
      showMessage(saved ? `Saved ${saved}. ${details}` : details);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Page title="Bulk add">
      <PageHeader
        group="Tools"
        title="Bulk add"
        description="Each record can be a different service. Copy a record to carry over the details the next service uses."
        actions={
          <Button
            variant="contained"
            disabled={loading || !rows.length}
            onClick={handleSubmit}
            startIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
          >
            {rows.length ? `Save ${rows.length} ${rows.length === 1 ? 'record' : 'records'}` : 'Save records'}
          </Button>
        }
      />

      <Box sx={(theme) => ({ ...panelSx(theme), p: 1.5 })}>
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={1} alignItems={{ sm: 'center' }} justifyContent="space-between" sx={{ mb: 1.25 }}>
          <Typography variant="body2" color="text.secondary">
            Set the service on each record. Copy keeps the name, ID, mobile, agent, and any amount the new service also uses.
          </Typography>
          <Button variant="outlined" color="inherit" disabled={loading} onClick={addRow} startIcon={<Iconify icon="eva:plus-fill" />} sx={{ whiteSpace: 'nowrap' }}>
            Add record
          </Button>
        </Stack>
        <Stack spacing={1}>
          {rows.map((row, index) => (
            <RecordCard
              key={row.rowId}
              index={index}
              row={row}
              fields={entryFields(row.mainCategory, row.sub_category)}
              canRemove={rows.length > 1}
              onChange={(field, value) => updateRow(row.rowId, field, value)}
              onService={(value) => retarget(row.rowId, value, '')}
              onType={(value) => retarget(row.rowId, row.mainCategory, value)}
              onCopy={() => copyRow(row.rowId)}
              onRemove={() => removeRow(row.rowId)}
            />
          ))}
        </Stack>
      </Box>

      <Toast toast={toast} setToast={setToast} message={message} />
    </Page>
  );
}
