import React, { useEffect, useState, useRef } from "react";

const CustomAutoCompleteEditor = (props) => {
  const [inputValue, setInputValue] = useState(props.value || "");
  const [suggestions, setSuggestions] = useState([]);
  const [selectedValue, setSelectedValue] = useState(null);
  const dropdownRef = useRef(null);

  const allAgents = ["John Doe", "Jane Smith", "Alice Johnson", "Bob Brown", "Emma White"];

  const onValueChange = props.onValueChange;

  useEffect(() => {
    // Filter suggestions based on input
    const filtered = allAgents.filter((agent) =>
      agent.toLowerCase().includes(inputValue.toLowerCase())
    );
    setSuggestions(filtered);
  }, [inputValue]);

  // Handle suggestion selection
  const handleSelect = (value) => {
    setInputValue(value); // Set selected value in the input field

    onValueChange(value)
    // const { api, column, node } = props;
    // // Update the cell value directly in the grid
    // api.getRowNode(node.id).setDataValue(column.getColId(), value); 
    props.api.stopEditing(); // Stop editing after selection
  };

  // Adjust dropdown position to avoid being clipped
  useEffect(() => {
    if (dropdownRef.current) {
      const cellRect = props.eGridCell.getBoundingClientRect();
      dropdownRef.current.style.top = `${cellRect.bottom}px`;
      dropdownRef.current.style.left = `${cellRect.left}px`;
      dropdownRef.current.style.width = `${cellRect.width * 1.5}px`;
    }
  }, [props.eGridCell]);

  return (
    <>
      <input
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        style={{ width: "100%" }}
      />
      {suggestions.length > 0 && (
        <ul
          ref={dropdownRef}
          style={{
            position: "fixed", // Absolute position relative to the viewport
            background: "white",
            border: "1px solid #ccc",
            listStyle: "none",
            width:"15%",
            margin: 0,
            padding: 0,
            maxHeight: "150px",
            overflowY: "auto",
            zIndex: 1000,
          }}
        >
          {suggestions.map((suggestion) => (
            <li
              key={suggestion}
              onClick={() => handleSelect(suggestion)}
              style={{
                padding: "5px",
                cursor: "pointer",
                backgroundColor: selectedValue === suggestion ? "#f0f0f0" : "white",
              }}
              onMouseEnter={(e) => (e.target.style.backgroundColor = "#d3e9ff")} // Light blue on hover
              onMouseLeave={(e) =>
                (e.target.style.backgroundColor =
                  selectedValue === suggestion ? "#f0f0f0" : "white") // Reset on mouse leave
              }
            >
              {suggestion}
            </li>
          ))}
        </ul>
      )}
    </>
  );
};

export default CustomAutoCompleteEditor;
