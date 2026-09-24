import { useCallback, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { URL } from '../_mock/constant';

const errorMessage = (err) => err?.response?.data?.message || 'Something went wrong';

export default function useResourceList({
  resource,
  printPath,
  buildUrl,
  filterByStatus = true,
}) {
  const navigate = useNavigate();
  const [query, setQuery] = useState('');
  const [rows, setRows] = useState([]);
  const [open, setOpen] = useState(false);
  const [editData, setEditData] = useState(null);
  const [editModel, setEditModel] = useState(false);
  const [reFetch, setReFetch] = useState(false);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState('');
  const [view, setView] = useState(false);
  const [viewData, setViewData] = useState(null);
  const [toast, setToast] = useState(false);
  const [message, setMessage] = useState(null);

  const refresh = useCallback(() => setReFetch((value) => !value), []);

  const fetchData = useCallback(
    async (nextQuery, nextStatus) => {
      let url = `${URL}/${resource}`;
      if (buildUrl) {
        url = buildUrl(nextQuery, nextStatus);
      } else if (filterByStatus) {
        url =
          nextQuery || nextStatus
            ? `${URL}/${resource}?query=${nextQuery}&status=${nextStatus}`
            : `${URL}/${resource}`;
      } else if (nextQuery) {
        url = `${URL}/${resource}?query=${nextQuery}`;
      }
      setLoading(true);
      try {
        const res = await axios.get(url);
        setRows(res.status === 200 ? res.data : []);
      } catch (err) {
        setRows([]);
      } finally {
        setLoading(false);
      }
    },
    [buildUrl, filterByStatus, resource]
  );

  useEffect(() => {
    fetchData(query, status);
  }, [fetchData, query, reFetch, status]);

  const onSuccess = useCallback(
    (res, actions) => {
      setOpen(false);
      setEditData(null);
      refresh();
      actions?.resetForm?.();
      setMessage(res.data.message);
      setToast(true);
    },
    [refresh]
  );

  const onError = useCallback((err) => {
    setMessage(errorMessage(err));
    setToast(true);
    setLoading(false);
  }, []);

  const create = useCallback(
    async (data, actions) => {
      setLoading(true);
      try {
        const res = await axios.post(`${URL}/${resource}`, data);
        onSuccess(res, actions);
      } catch (err) {
        onError(err);
      }
    },
    [onError, onSuccess, resource]
  );

  const update = useCallback(
    async (data) => {
      setLoading(true);
      try {
        const res = await axios.put(`${URL}/${resource}`, data);
        setEditModel((value) => !value);
        onSuccess(res);
      } catch (err) {
        onError(err);
      }
    },
    [onError, onSuccess, resource]
  );

  const patch = useCallback(
    async (data, actions) => {
      setLoading(true);
      try {
        const res = await axios.patch(`${URL}/${resource}`, data);
        onSuccess(res, actions);
      } catch (err) {
        onError(err);
      }
    },
    [onError, onSuccess, resource]
  );

  const changeStatus = useCallback(
    async (value, id) => {
      setLoading(true);
      try {
        const res = await axios.put(`${URL}/${resource}`, {
          status: value,
          id,
          updatedTime: new Date().toLocaleDateString(),
        });
        setEditModel((openEdit) => !openEdit);
        onSuccess(res);
      } catch (err) {
        onError(err);
      }
    },
    [onError, onSuccess, resource]
  );

  const remove = useCallback(
    async (id) => {
      setLoading(true);
      try {
        const res = await axios.delete(`${URL}/${resource}/${id}`);
        setEditModel((value) => !value);
        onSuccess(res);
      } catch (err) {
        onError(err);
      }
    },
    [onError, onSuccess, resource]
  );

  const handleDeleteRow = useCallback(
    (deletedRow) => {
      remove(deletedRow.id);
    },
    [remove]
  );

  const handlePrint = useCallback(
    (data) => {
      navigate('/print', { state: { path: printPath || resource, ...data } });
    },
    [navigate, printPath, resource]
  );

  const viewOpen = useCallback((data) => {
    setViewData(data);
    setView(true);
  }, []);

  const handleCloseView = useCallback(() => {
    setViewData(null);
    setView((value) => !value);
  }, []);

  const handleCloseEdit = useCallback(() => {
    setEditData(null);
    setEditModel((value) => !value);
  }, []);

  const editOpen = useCallback((data) => {
    setEditData(data);
    setEditModel(true);
  }, []);

  const editDataOpen = useCallback((data) => {
    setEditData(data);
    setOpen(true);
  }, []);

  const handleFilterByName = useCallback((event) => {
    setQuery(event.target.value);
  }, []);

  const handleStatusFilter = useCallback((data) => {
    setLoading(true);
    setStatus(data === 'All' ? '' : data);
  }, []);

  const handleCellClick = useCallback(
    (params) => {
      if (params.colDef.field === 'fileid') {
        editDataOpen(params.data);
      } else if (params.colDef.field === 'cash') {
        editOpen(params.data);
      } else if (params.value != null) {
        navigator.clipboard.writeText(params.value);
      }
    },
    [editDataOpen, editOpen]
  );

  return {
    query,
    rows,
    open,
    setOpen,
    editData,
    setEditData,
    editModel,
    loading,
    status,
    view,
    viewData,
    toast,
    setToast,
    message,
    create,
    update,
    patch,
    changeStatus,
    handleDeleteRow,
    handlePrint,
    viewOpen,
    handleCloseView,
    handleCloseEdit,
    handleFilterByName,
    handleStatusFilter,
    handleCellClick,
  };
}
