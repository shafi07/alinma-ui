import { useMemo } from 'react';
import { CSVLink } from 'react-csv';
import { Button, Container, Stack, Typography } from '@mui/material';
import Page from '../Page';
import Iconify from '../Iconify';
import Toast from '../toast';
import View from '../view';
import EditBill from '../javasath/editBill';
import { UserListToolbar } from '../../sections/@dashboard/user';
import NewTable from '../../pages/table';
import useResourceList from '../../hooks/useResourceList';

export default function ResourceListPage({
  title,
  pageTitle,
  addLabel,
  resource,
  printPath,
  csvHeaders,
  columns,
  AddForm,
  editHandlerProp,
  buildUrl,
  filterByStatus = true,
  showToolbar = true,
  showStatusFilter = true,
  addDisabled = false,
  showAddForm = true,
  showEditBill = true,
  showView = true,
  handleCellClick: handleCellClickProp,
  extraAddFormProps = {},
  inlineEdit = 'patch',
  formEdit = 'patch',
}) {
  const list = useResourceList({ resource, printPath, buildUrl, filterByStatus });

  const colDef = useMemo(
    () =>
      columns({
        onDelete: list.handleDeleteRow,
        onPrint: list.handlePrint,
        onView: list.viewOpen,
      }),
    [columns, list.handleDeleteRow, list.handlePrint, list.viewOpen]
  );

  const formEditHandler = formEdit === 'put' ? list.update : list.patch;
  const gridEditHandler = inlineEdit === 'put' ? list.update : inlineEdit === 'patch' ? list.patch : undefined;

  const addFormProps = {
    open: list.open,
    handleClose: () => {
      list.setEditData(null);
      list.setOpen(false);
    },
    submitHandler: list.create,
    loading: list.loading,
    ...extraAddFormProps,
  };

  return (
    <>
      <Page title={pageTitle || title}>
        <Container>
          <Stack direction="row" alignItems="center" justifyContent="space-between" mb={-1}>
            <Typography variant="h4" gutterBottom>
              {title}
            </Typography>
            {showAddForm && (
              <Button
                variant="contained"
                disabled={addDisabled}
                sx={{ backgroundColor: '#F51720' }}
                onClick={() => list.setOpen(true)}
                startIcon={<Iconify icon="eva:plus-fill" />}
              >
                {addLabel}
              </Button>
            )}
            <CSVLink headers={csvHeaders} data={list.rows ? list.rows : []} filename="test">
              <Button variant="contained" startIcon={<Iconify icon="prime:file-excel" />}>
                Export CSV
              </Button>
            </CSVLink>
          </Stack>
          {showToolbar && (
            <UserListToolbar
              expense={showStatusFilter}
              handleStatusFilter={list.handleStatusFilter}
              status={list.status}
              numSelected={0}
              filterName={list.query}
              onFilterName={list.handleFilterByName}
            />
          )}
          <NewTable
            rowData={list.rows}
            colDef={colDef}
            handleCellClick={handleCellClickProp || list.handleCellClick}
            editData={gridEditHandler}
            returnHandler={inlineEdit ? list.changeStatus : undefined}
          />
        </Container>
        <Toast toast={list.toast} setToast={list.setToast} message={list.message} />
      </Page>
      {showAddForm && AddForm && <AddForm {...addFormProps} />}
      {showEditBill && list.editData ? (
        <EditBill
          open={list.editModel}
          editData={list.editData}
          handleClose={list.handleCloseEdit}
          editHandler={list.update}
          loading={list.loading}
        />
      ) : (
        ''
      )}
      {showAddForm && AddForm && list.editData ? (
        <AddForm
          {...addFormProps}
          editData={list.editData}
          {...(editHandlerProp ? { [editHandlerProp]: formEditHandler } : {})}
        />
      ) : (
        ''
      )}
      {showView && list.viewData ? (
        <View open={list.view} viewData={list.viewData} handleClose={list.handleCloseView} />
      ) : (
        ''
      )}
    </>
  );
}
