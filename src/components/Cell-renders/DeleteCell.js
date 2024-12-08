import React, { useCallback } from "react";
import styles from "./DeleteCell.module.css";

const DeleteCellRenderer = ({ api, node, onDelete,onPrint,print = false }) => {
  const onRemoveClick = useCallback(() => {
    const rowData = node.data;
    onDelete(rowData)
    api.applyTransaction({ remove: [rowData] });
  }, [node, api]);
  const onPrintClick = useCallback(() => {
    const rowData = node.data;
    onPrint(rowData)
  }, [node, api]);

  return (
    <div className={styles.buttonCell}>
      <button
        className={`button-secondary ${styles.removeButton}`}
        onClick={onRemoveClick}
      >
        <img src={`/assets/delete.svg`} alt="delete" />
      </button>
      {print && <button
        className={`button-secondary ${styles.printButton}`}
        onClick={onPrintClick}
      >
        <img src={`/assets/printer-icon.svg`} alt="delete" />
      </button>}
    </div>
  );
};

export default DeleteCellRenderer;