import React, { useEffect, useRef } from "react";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";
import "../styles/grid.css";
import GridFrame from "../components/list/GridFrame";
import { TABLE_HEIGHT } from "../theme/layout";

const NewTable = ({ rowData, colDef = [], handleCellClick, editData,returnHandler }) => {
  const gridRef = useRef(null);

  const handleCellValueChanged = (params) => {
    // console.log("Cell value changed", params);
    if (params.colDef.field === "status" && params.value === "returned") {
      returnHandler("returned",params.data.id);
    }else{
      params.data.paid_amount = 0;
      editData(params.data);
    }
  };

  useEffect(() => {
    if (!gridRef.current || !gridRef.current.api) return;

    const gridApi = gridRef.current.api;
    const scrollPosition = gridApi.getHorizontalPixelRange()?.left || 0; // Save horizontal position
    const verticalScrollPosition = gridApi.getVerticalPixelRange()?.top || 0; // Save vertical position

    setTimeout(() => {
      gridApi.setGridOption("suppressScrollOnNewData", true); // Prevent auto-scroll
      gridApi.getBodyViewportElement().scrollTop = verticalScrollPosition; // Restore vertical scroll
      gridApi.getBodyViewportElement().scrollLeft = scrollPosition; // Restore horizontal scroll
    }, 0);
  }, [rowData]); // Runs only when rowData updates

  return (
    <GridFrame height={TABLE_HEIGHT}>
      <AgGridReact
        ref={gridRef}
        columnDefs={colDef}
        rowData={rowData} // AG Grid automatically updates when this prop changes
        onCellValueChanged={handleCellValueChanged}
        defaultColDef={{
          flex: 1,
          minWidth: 140,
          resizable: true,
          sortable: true,
          filter: true,
          floatingFilter: true,
        }}
        rowHeight={60}
        onCellClicked={handleCellClick}
        singleClickEdit={true}
        onGridReady={(params) => (gridRef.current = params)} // Set gridRef properly
        suppressScrollOnNewData={true} // Prevent automatic scrolling
      />
    </GridFrame>
  );
};

export default NewTable;
