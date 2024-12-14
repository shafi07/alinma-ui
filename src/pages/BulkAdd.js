import { useState,useEffect,useRef, useCallback } from 'react';
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
// material
import {
  Stack,
  Button,
  Container,
  Typography,
} from '@mui/material';
// components
import Page from '../components/Page';
import Iconify from '../components/Iconify';
import axios from 'axios';
import { bulkEditDefault, URL } from '../_mock/constant'
import Toast from '../components/toast';
import DeleteCellRenderer from '../components/Cell-renders/DeleteCell';

export default function BulkAdd() {
  const [open,setOpen] = useState(false)
  const [editModel,setEditModel]= useState(false)
  const [reFetch,setReFetch]=useState(false)
  const [loading,setLoading]=useState(false)
  const [toast,setToast]=useState(false)
  const [message,setMessage]=useState(null)
  const [rowData, setRowData] = useState([
    bulkEditDefault 
  ]);

  const gridRef = useRef();
  // const handleValueChange = (data) => {
  //   console.log('>>>???',data)
  // }
  const [columnDefs, setColumnDefs] = useState([
    {
        headerName: "Main Category",
        field: "mainCategory",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Javasath", "Insurance", "Work", "Visa", "Passport", "Other"], // Dropdown values
        },
        width: 150,
        pinned: "left" ,
      },
    {
        headerName: "Sub Category",
        field: "sub_category",
        editable: true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: (params) => {
          const mainCategory = params.data.mainCategory;
          switch (mainCategory) {
            case "Javasath":
                return { values: ["New Iqama", "Renew", "Visa Change", "Visit Visa Renew", "Re Entry", "Print","Driving Licence", "Vehicle Registration Renew","Final Exit", "Sponser Change","Profession Change"] };
            case "Insurance":
                return { values: ["Add", "New"] };
            case "Work":
                return { values: ["Sijil", "Ruksa"] };
            case "Visa":
                return { values: ["Work Visa", "Visit Visa", "Visit Chamber","Wakala","Visa Chamber","Mofa"] };
            case "Passport":
                return { values: ["Renew Pasport", "Translation"] };
            case "Other":
                return { values: ["Baladiya Card", "Vaccine","Salary Transfer", "Qiwa","Gosi","Certificate","Rent agreement"] };
            default:
              return { values: [] }; 
          }
        },
        width: 150,
        pinned: "left"  
    },
    { headerName: 'Name', field: 'name', sortable: true, editable:true, filter: true },
    { headerName: 'ID', field: 'id_number', sortable: true, editable:true, filter: true },
    { headerName: 'Sponser Name', field: 'sponser_name', sortable: true,filter: true, editable:true },
    { headerName: 'CR Number', field: 'cr_number', sortable: true,filter: true, editable:true },
    { headerName: 'Visa Number', field: 'visa_number', sortable: true,filter: true, editable:true },
    { headerName: 'Travels', field: 'travels', sortable: true,filter: true, editable:true },
    { headerName: 'DOB', field: 'dob', sortable: true,filter: true, editable:true },
    { headerName: 'Company', field: 'company', sortable: true,filter: true, editable:true },
    { headerName: 'Boarder Number', field: 'boarder_number', sortable: true,filter: true, editable:true },
    { headerName: 'Mobile', field: 'mobilenumber', sortable: true, editable:true, filter: true },
    { 
        headerName: 'Work Type', 
        field: 'work_type',  
        editable:true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["New", "Renew", "Update","Cancel","Transfer","QR-Code","Difa Madani"], // Dropdown values
        },
    },
    { 
        headerName: 'Re Entry Type', 
        field: 're_entry_type',  
        editable:true,
        cellEditor: "agSelectCellEditor",
        cellEditorParams: {
          values: ["Leave", "Extend"],
        },
    },
    { headerName: 'Agent', field: 'agent', sortable: true,filter: true,editable:true },
    { headerName: 'Profession Name', field: 'professionName', sortable: true,filter: true,editable:true },
    { headerName: 'New Sponser', field: 'newSponser', sortable: true,filter: true,editable:true },
    { headerName: 'Agent Amount', field: 'agent_amount', sortable: true, editable:true, width: 130 },
    { headerName: 'Iqama Amount', field: 'iqama', sortable: true, editable:true, width: 130  },
    { headerName: 'Insurance', field: 'insurance', sortable: true, editable:true, width: 130  },
    { headerName: 'Other Amount', field: 'other', sortable: true, editable:true, width: 130  },
    { headerName: 'Mol', field: 'mol', sortable: true, editable:true, width: 130  },
    { headerName: 'Absheer Amount', field: 'absheer_amount', sortable: true, editable:true, width: 130  },
    { headerName: 'Qiwa Amount', field: 'qiwa_amount', sortable: true, editable:true, width: 130  },
    { headerName: 'Government fee', field: 'government_fee', sortable: true, editable:true, width: 130  },
    { headerName: 'Chamber Amount', field: 'chamber_amount', sortable: true, editable:true, width: 130  },
    { headerName: 'Service', field: 'service', sortable: true, editable:true, width: 130  },
    { 
        headerName: 'Total Amount', 
        field: 'total_amount', 
        sortable: true,
        valueGetter: (params) => {
            const agent_amount = parseInt(params.data.agent_amount) || 0;
            const service = parseInt(params.data.service) || 0;
            const iqama = parseInt(params.data.iqama) || 0;
            const insurance = parseInt(params.data.insurance) || 0;
            const other = parseInt(params.data.other) || 0;
            const mol = parseInt(params.data.mol) || 0;
            const absheer_amount = parseInt(params.data.absheer_amount) || 0;
            const government_fee = parseInt(params.data.government_fee) || 0;
            const qiwa_amount = parseInt(params.data.qiwa_amount) || 0;
            const chamber_amount = parseInt(params.data.chamber_amount) || 0;
            const total = agent_amount+service+iqama+insurance+other+mol+absheer_amount+government_fee+qiwa_amount+chamber_amount;
            params.data.total_amount = total
            return total
          }, 
        width: 130 },
    { headerName: 'Paid Amount', field: 'paid_amount', sortable: true, editable:true, width: 130  },
    { 
        headerName: 'Balance Amount', 
        field: 'balance', 
        sortable: true,
        valueGetter: (params) => {
            const total_amount = parseInt(params.data.total_amount) || 0;
            const paid_amount = parseInt(params.data.paid_amount) || 0;
            return  (total_amount - paid_amount)
          }, 
        width: 130  },
    { headerName: 'Agent Date', field: 'paid_date', sortable: true, editable:true },
    { headerName: 'Application Number', field: 'application_number', editable:true, sortable: true, filter: true },
    { headerName: 'Remarks', field: 'remarks', editable:true, sortable: true, filter: true },
    { headerName: 'New Passport Number', field: 'new_passport_number', editable:true, sortable: true, filter: true },
    { headerName: 'Passport Expiry Date', field: 'expiry_date', editable:true, sortable: true, filter: true },
    { headerName: 'Due in months', field: 'due', editable:true, sortable: true, filter: true },
    { 
      field: "",
      pinned: "right" ,
      cellRenderer: (params) => (
        <DeleteCellRenderer
          node={params.node}
          api={params.api}
          onDelete={handleDeleteRow}
        />
      ), 
      width: 80,
      floatingFilter: false ,
      filter: false  
    },
])

  const handleDeleteRow = useCallback((deletedRow) => {
    console.log("Deleted row data:>", deletedRow);
  }, []);

  useEffect(() => {
    // fetchData(query);
  },[reFetch]);

  const submitBulk = async (data,submitUrl) => {
    setLoading(true)
    axios.post(submitUrl, data)
      .then((res) => {
        setOpen(false)
        setReFetch(!reFetch)
        setMessage(res.data.message)
        setToast(true)
      }).catch((err) => {
        setMessage(err.response.data.message)
        setToast(true)
        setLoading(false)
      })
  }

    const onCellValueChanged = (params) => {
        if (params.column.colId === "mainCategory" || params.column.colId === "sub_category") {
            const { mainCategory, sub_category } = params.data;

            // Update column visibility based on Type and Sub Type
            const updatedColumnDefs = columnDefs.map((col) => {
                switch (col.field) {
                    case "other":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath"), // Hide "Name" for Type "B" and Sub Type "Y"
                        };
                    case "boarder_number":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && sub_category === "New Iqama"), // Hide "Name" for Type "B" and Sub Type "Y"
                        };
                    case "professionName":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && sub_category === "Profession Change"), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "newSponser":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && sub_category === "Sponser Change"), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "re_entry_type":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && sub_category === "Re Entry"), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "iqama":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && !["Driving Licence", "Vehicle Registration Renew"].includes(sub_category)), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "government_fee":
                        return {
                            ...col,
                            hide: !(["Javasath", "Insurance", "Visa"].includes(mainCategory) && !["Driving Licence", "Vehicle Registration Renew", "Visit Visa", "Visit Chamber", "Wakala", "Visa Chamber", "Mofa"].includes(sub_category)), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "insurance":
                    case "mol":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && ["New Iqama", "Renew", "Visit Visa Renew"].includes(sub_category)), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "absheer_amount":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && !["Print", "Driving Licence", "Vehicle Registration Renew", "Visit Visa Renew"].includes(sub_category)), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "qiwa_amount":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && ["New Iqama", "Renew", "Sponser Change", "Profession Change"].includes(sub_category)), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "due":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && !["Visa Change", "Sponser Change"].includes(sub_category)), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "expiry_date":
                    case "new_passport_number":
                        return {
                            ...col,
                            hide: !(mainCategory === "Javasath" && sub_category === "Visa Change"), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "dob":
                    case "company":
                    case "cr_number":
                        return {
                            ...col,
                            hide: !(mainCategory === "Insurance"), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "work_type":
                        return {
                            ...col,
                            hide: !(mainCategory === "Work"), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "chamber_amount":
                        return {
                            ...col,
                            hide: !(mainCategory === "Visa" && ['Visa Chamber', 'Wakala'].includes(sub_category)), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "application_number":
                        return {
                            ...col,
                            hide: !(mainCategory === "Visa" && sub_category === "Visit Chamber"), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    case "visa_number":
                    case "travels":
                        return {
                            ...col,
                            hide: !(mainCategory === "Visa" && sub_category === "Wakala"), // Hide "Age" for Type "A" and Sub Type "X"
                        };
                    default:
                        return col;
                }
            });

            setColumnDefs(updatedColumnDefs); // Apply updated column definitions
        }
    };

  const addRow = () => {
    const newRow = { type: "A", name: "", age: "" }; // Default values for a new row
    setRowData((prev) => [...prev, newRow]);
  };

  const handleSubmit = () => {
    setLoading(true)
    console.log('>>>>>',rowData)
    let submitUrl = ``
    rowData.forEach(async(item)=>{
        console.log("////",item.mainCategory)
        switch (item.mainCategory) {
            case "Javasath":
                submitUrl = `${URL}/javasath`
                return await submitBulk(item,submitUrl)
            case "Insurance":
                submitUrl = `${URL}/insurance`
                return await submitBulk(item,submitUrl)
            case "Work":
                submitUrl = `${URL}/work`
                return await submitBulk(item,submitUrl)
            case "Visa":
                submitUrl = `${URL}/visa`
                return await submitBulk(item,submitUrl)
            case "Passport":
                submitUrl = `${URL}/other`
                return await submitBulk(item,submitUrl)
            case "Other":
                submitUrl = `${URL}/other`
                return await submitBulk(item,submitUrl)
            default:
                return submitUrl = ``
                // await submitBulk(item,submitUrl)  // Empty if no main category selected
          }
    })
    setLoading(false)
  }

  return (
      <>
          <Page title="BULK-ADD">
              <Container>
                  <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
                      <Typography variant="h4" gutterBottom>
                          BULK-ADD
                      </Typography>
                      <Button variant="contained" sx={{ backgroundColor: '#F51720' }} onClick={addRow} startIcon={<Iconify icon="eva:plus-fill" />}>
                          Add Row
                      </Button>
                  </Stack>
                  <div style={{ width: "100%", height: "100%" }}>
                      <div className="ag-theme-alpine" style={{ height: 500, width: "100%" }}>
                          <AgGridReact
                              ref={gridRef}
                              rowData={rowData}
                              columnDefs={columnDefs}
                              defaultColDef={{
                                  resizable: true,
                                  sortable: true,
                              }}
                              onCellValueChanged={onCellValueChanged}
                              animateRows={true}
                              rowHeight={50}
                          />
                      </div>
                      <Button disabled={loading} variant="contained" sx={{ width:"150px", backgroundColor: '#21B6A8',marginTop:'10px' }} onClick={handleSubmit} startIcon={<Iconify icon="eva:plus-fill" />}>
                          Submit
                      </Button>
                  </div>
              </Container>
              <Toast toast={toast} setToast={setToast} message={message} />
          </Page>
      </>
  );
}
