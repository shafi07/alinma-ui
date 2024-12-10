// src/components/MyAgGridTable.js

import React,{useState} from 'react';
import { AgGridReact } from 'ag-grid-react';
import 'ag-grid-community/styles/ag-grid.css';
import 'ag-grid-community/styles/ag-theme-alpine.css';

const NewTable = ({rowData,colDef=[],handleCellClick,editData}) => {

    const handleCellValueChanged = (params) => {
        console.log('Edited Row Data:', params);
        console.log('ID of Edited Row:', params.data.id);
        params.data.paid_amount = 0
        editData(params.data)
      };
      

  return (
    <div className="ag-theme-alpine" style={{ height: 600, width: "100%"}}>
      <AgGridReact
        columnDefs={colDef}
        rowData={rowData}
        onCellValueChanged={handleCellValueChanged}
        defaultColDef={{
          // headerClass:""
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
        }}
        rowHeight={60} 
        onCellClicked={handleCellClick}
        // suppressRowTransform={true}
      />
    </div>
  );
};

export default NewTable;
