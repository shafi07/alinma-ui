import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';
import '../styles/grid.css';
import { Box, Button } from '@mui/material';
import axios from 'axios';
import Page from '../components/Page';
import PageHeader from '../components/PageHeader';
import { panelSx } from '../theme/panel';
import Iconify from '../components/Iconify';
import { URL } from '../_mock/constant';
import Toast from '../components/toast';
import DeleteCellRenderer from '../components/Cell-renders/DeleteCell';
import GridFrame from '../components/list/GridFrame';
import { BULK_TABLE_HEIGHT } from '../theme/layout';
import {
  ENDPOINTS,
  RE_ENTRY_TYPES,
  SUB_CATEGORIES,
  WORK_TYPES,
  buildPayload,
  columnVisibilityState,
  computeTotal,
  createRow,
  fieldApplies,
  num,
  prepareCategoryChange,
  validateRows,
  writeTotals,
} from './bulkAddModel';

const initiallyHidden = new Set(
  columnVisibilityState([createRow()])
    .filter((column) => column.hide)
    .map((column) => column.colId)
);

const dataColumn = (headerName, field, extra = {}) => ({
  headerName,
  field,
  sortable: true,
  filter: true,
  editable: (params) => fieldApplies(params.data, field),
  cellClass: (params) => (fieldApplies(params.data, field) ? undefined : 'bulk-cell-na'),
  valueFormatter: (params) => (fieldApplies(params.data, field) ? params.value : ''),
  hide: initiallyHidden.has(field),
  ...extra,
});

const selectColumn = (headerName, field, values, extra = {}) =>
  dataColumn(headerName, field, {
    filter: false,
    cellEditor: 'agSelectCellEditor',
    cellEditorParams: { values },
    ...extra,
  });

const amountColumn = (headerName, field) =>
  dataColumn(headerName, field, {
    filter: false,
    width: 130,
  });

const AMOUNT_FIELDS = new Set([
  'agent_amount',
  'iqama',
  'insurance',
  'other',
  'mol',
  'absheer_amount',
  'qiwa_amount',
  'government_fee',
  'chamber_amount',
  'service',
  'paid_amount',
]);

const refreshTotals = (api, node) => {
  writeTotals(node.data);
  api.refreshCells({
    rowNodes: [node],
    columns: ['total_amount', 'balance'],
    force: true,
  });
};

export default function BulkAdd() {
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState(null);
  const [rowData, setRowData] = useState(() => [createRow()]);
  const gridRef = useRef();
  const rowDataRef = useRef(rowData);
  rowDataRef.current = rowData;

  const showMessage = (text) => {
    setMessage(text);
    setToast(true);
  };

  const syncColumnVisibility = useCallback((api, rows) => {
    api.applyColumnState({ state: columnVisibilityState(rows) });
  }, []);

  useEffect(() => {
    if (gridRef.current?.api) syncColumnVisibility(gridRef.current.api, rowData);
  }, [rowData, syncColumnVisibility]);

  const handleDeleteRow = useCallback((deletedRow) => {
    setRowData((prev) => {
      const next = prev.filter((row) => row.rowId !== deletedRow.rowId);
      return next.length ? next : [createRow()];
    });
  }, []);

  const columnDefs = useMemo(
    () => [
      selectColumn('Main Category', 'mainCategory', Object.keys(ENDPOINTS), {
        width: 150,
        pinned: 'left',
      }),
      dataColumn('Sub Category', 'sub_category', {
        width: 180,
        pinned: 'left',
        editable: (params) => Boolean(SUB_CATEGORIES[params.data.mainCategory]),
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: (params) => ({
          values: SUB_CATEGORIES[params.data.mainCategory] || [],
        }),
      }),
      dataColumn('Name', 'name'),
      dataColumn('ID', 'id_number'),
      dataColumn('Sponser Name', 'sponser_name'),
      dataColumn('Boarder Number', 'boarder_number'),
      dataColumn('CR Number', 'cr_number'),
      dataColumn('Visa Number', 'visa_number'),
      dataColumn('Travels', 'travels'),
      dataColumn('DOB', 'dob'),
      dataColumn('Company', 'company'),
      dataColumn('Mobile', 'mobilenumber'),
      selectColumn('Work Type', 'work_type', WORK_TYPES),
      selectColumn('Re Entry Type', 're_entry_type', RE_ENTRY_TYPES),
      dataColumn('Agent', 'agent'),
      dataColumn('Profession Name', 'professionName'),
      dataColumn('New Sponser', 'newSponser'),
      amountColumn('Agent Amount', 'agent_amount'),
      amountColumn('Iqama Amount', 'iqama'),
      amountColumn('Insurance', 'insurance'),
      amountColumn('Other Amount', 'other'),
      amountColumn('Mol', 'mol'),
      amountColumn('Absheer Amount', 'absheer_amount'),
      amountColumn('Qiwa Amount', 'qiwa_amount'),
      amountColumn('Government fee', 'government_fee'),
      amountColumn('Chamber Amount', 'chamber_amount'),
      amountColumn('Service', 'service'),
      {
        headerName: 'Total Amount',
        field: 'total_amount',
        sortable: true,
        width: 130,
        valueGetter: (params) => computeTotal(params.data),
      },
      amountColumn('Paid Amount', 'paid_amount'),
      {
        headerName: 'Balance Amount',
        field: 'balance',
        sortable: true,
        width: 140,
        valueGetter: (params) => computeTotal(params.data) - num(params.data.paid_amount),
      },
      dataColumn('Agent Date', 'paid_date', { filter: false }),
      dataColumn('Application Number', 'application_number'),
      dataColumn('Remarks', 'remarks'),
      dataColumn('New Passport Number', 'new_passport_number'),
      dataColumn('Passport Expiry Date', 'expiry_date'),
      dataColumn('Due in months', 'due'),
      {
        field: '',
        pinned: 'right',
        width: 75,
        floatingFilter: false,
        filter: false,
        cellRenderer: (params) => (
          <DeleteCellRenderer
            node={params.node}
            api={params.api}
            onDelete={handleDeleteRow}
            externalState
          />
        ),
      },
    ],
    [handleDeleteRow]
  );

  const onCellEditingStarted = (params) => {
    const field = params.colDef.field;
    if (!AMOUNT_FIELDS.has(field)) return;

    const bind = () => {
      const input = document.querySelector('.ag-cell-inline-editing input');
      if (!input || input.dataset.liveTotal === '1') return;
      input.dataset.liveTotal = '1';
      const onInput = () => {
        params.data[field] = input.value;
        refreshTotals(params.api, params.node);
      };
      input.addEventListener('input', onInput);
      params.node.__stopLiveTotal = () => {
        input.removeEventListener('input', onInput);
        delete input.dataset.liveTotal;
      };
    };

    bind();
    requestAnimationFrame(bind);
  };

  const onCellEditingStopped = (params) => {
    params.node.__stopLiveTotal?.();
    delete params.node.__stopLiveTotal;
  };

  const onCellValueChanged = (params) => {
    const field = params.colDef.field;
    prepareCategoryChange(params.data, field);
    if (field === 'mainCategory' || field === 'sub_category') {
      params.api.refreshCells({ rowNodes: [params.node], force: true });
      const rows = [];
      params.api.forEachNode((node) => rows.push(node.data));
      syncColumnVisibility(params.api, rows);
      return;
    }
    if (AMOUNT_FIELDS.has(field)) refreshTotals(params.api, params.node);
  };

  const addRow = () => {
    setRowData((prev) => [...prev, createRow()]);
  };

  const copyRow = () => {
    setRowData((prev) => {
      const lastRow = prev[prev.length - 1];
      return [...prev, createRow(lastRow)];
    });
  };

  const handleSubmit = async () => {
    const rows = rowDataRef.current.map((row) => writeTotals(row));
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
        setRowData([createRow()]);
        showMessage(saved === 1 ? outcomes[0].message : `Saved ${saved} records.`);
        return;
      }

      setRowData(failed.map((item) => item.row));
      const details = failed.map((item) => `Row ${item.index + 1}: ${item.message}`).join(' ');
      showMessage(saved ? `Saved ${saved}. ${details}` : details);
    } finally {
      setLoading(false);
    }
  };

  const handleCellClick = (params) => {
    if (
      !['mainCategory', 'sub_category', 'balance', 'total_amount', 'work_type', 're_entry_type'].includes(
        params.colDef.field
      ) &&
      params.value
    ) {
      navigator.clipboard.writeText(params.value);
    }
  };

  return (
    <Page title="Bulk add">
      <PageHeader
        group="Tools"
        title="Bulk add"
        description="Add several service records in one pass."
        actions={
          <>
            <Button
              variant="text"
              color="inherit"
              disabled={loading}
              onClick={copyRow}
              startIcon={<Iconify icon="eva:copy-fill" />}
            >
              Copy last row
            </Button>
            <Button
              variant="outlined"
              color="inherit"
              disabled={loading}
              onClick={addRow}
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              Add row
            </Button>
            <Button
              disabled={loading}
              variant="contained"
              onClick={handleSubmit}
              startIcon={<Iconify icon="eva:checkmark-circle-2-fill" />}
            >
              Submit
            </Button>
          </>
        }
      />
      <Box sx={panelSx}>
        <GridFrame height={BULK_TABLE_HEIGHT}>
          <AgGridReact
            ref={gridRef}
            rowData={rowData}
            columnDefs={columnDefs}
            getRowId={(params) => params.data.rowId}
            onGridReady={(params) => syncColumnVisibility(params.api, rowDataRef.current)}
            defaultColDef={{
              resizable: true,
              sortable: true,
            }}
            onCellEditingStarted={onCellEditingStarted}
            onCellEditingStopped={onCellEditingStopped}
            onCellValueChanged={onCellValueChanged}
            onCellClicked={handleCellClick}
            animateRows
            rowHeight={50}
            singleClickEdit
          />
        </GridFrame>
      </Box>
      <Toast toast={toast} setToast={setToast} message={message} />
    </Page>
  );
}
