// export const URL = `http://localhost:9000`
export const URL = `https://alinma-api.shellfixer.com`

// --------- CSV File Headers----------- //

export const javasathHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Date", key: "createdtime" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "sub_category", key: "sub_category" },
    { label: "sponser_name", key: "sponser_name" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "insurance", key: "insurance" },
    { label: "service", key: "service" },
    { label: "mol", key: "mol" },
    { label: "iqama", key: "iqama" },
    { label: "other", key: "Other" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
    { label: "remarks", key: "remarks" },
  ];

export const insuranceHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Date", key: "createdtime" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "Add/New", key: "sub_category" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "Agent Name", key: "agent" },
    { label: "Agent Paid Date", key: "paid_date"},
    { label: "dob", key: "dob" },
    { label: "Service Amount", key: "service" },
    { label: "Agent Amount", key: "agent_amount" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
    { label: "sponser_name", key: "sponser_name" },
    { label: "Remarks", key: "remarks" },
  ];

export const workHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Date", key: "createdtime" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "Sub Category", key: "sub_category" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "Agent Name", key: "agent" },
    { label: "Agent Paid Date", key: "paid_date"},
    { label: "Agent amount", key: "agent_amount" },
    { label: "Service amount", key: "service" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
    { label: "sponser_name", key: "sponser_name" },
    { label: "Remarks", key: "remarks" },
  ];

export const visaHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Date", key: "createdtime" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "Sub Category", key: "sub_category" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "Agent Name", key: "agent" },
    { label: "Agent Paid Date", key: "paid_date"},
    { label: "Agent amount", key: "agent_amount" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
    { label: "sponser_name", key: "sponser_name" },
    { label: "Remarks", key: "remarks" },
  ];

export const otherHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Date", key: "createdtime" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "Sub Category", key: "sub_category" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "Agent Name", key: "agent" },
    { label: "Agent Paid Date", key: "paid_date"},
    { label: "Agent amount", key: "agent_amount" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
    { label: "sponser_name", key: "sponser_name" },
    { label: "Remarks", key: "remarks" },
  ];

export const expenseHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Electricity", key: "electricity" },
    { label: "Telephone", key: "telephone" },
    { label: "Salary", key: "salary" },
    { label: "Stationary", key: "stationary" },
    { label: "Other", key: "other" },
    { label: "Total", key: "total_amount" },
    { label: "Date", key: "createdtime" },
    { label: "Remarks", key: "remarks" },
  ];

  // ------- Table Headers -------- //

export const JAVASATH_TABLE_HEAD = [
    { id: 'file', label: 'File', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'company', label: 'Sub category', alignRight: false },
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'sponserName', label: 'Sponser Name', alignRight: false },
    { id: 'cash', label: 'Cash', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: 'mobileNumber', label: 'Mobile', alignRight: false },
    { id: 'total', label: 'Total Amount', alignRight: false },
    { id: 'balance', label: 'Balance Amount ', alignRight: false },
    { id: '' },
  ];

export const INSURANCE_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'subCategory', label: 'Add/New', alignRight: false },
  { id: 'sponserName', label: 'Sponser Name', alignRight: false },
  { id: 'cash', label: 'Cash', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  { id: 'dob', label: 'Dob', alignRight: false },
  { id: 'company', label: 'Company', alignRight: false },
  { id: 'agentDate', label: 'Agent Date', alignRight: false },
  { id: 'agent', label: 'Agent', alignRight: false },
  { id: 'agentAmount', label: 'Agent amount', alignRight: false },
  { id: 'service', label: 'Service', alignRight: false },
  { id: 'total', label: 'Total Amount', alignRight: false },
  { id: 'paid', label: 'Paid Amount', alignRight: false },
  { id: 'balance', label: 'Balance Amount ', alignRight: false },
  // { id: 'status', label: 'Status ', alignRight: false },
  { id: '' },
];

export const WORK_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'id', label: 'Number', alignRight: false },
  { id: 'subCategory', label: 'Sub Category', alignRight: false },
  { id: 'sponserName', label: 'Sponser Name', alignRight: false },
  { id: 'cash', label: 'Cash', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  { id: 'agent', label: 'Agent', alignRight: false },
  { id: 'agentDate', label: 'Agent Date', alignRight: false },
  { id: 'agentAmount', label: 'Agent Amount', alignRight: false },
  { id: 'service', label: 'Service', alignRight: false },
  { id: 'government', label: 'Gvt-fee', alignRight: false },
  { id: 'total', label: 'Total Amount', alignRight: false },
  { id: 'paid', label: 'Paid Amount', alignRight: false },
  { id: 'balance', label: 'Balance Amount ', alignRight: false },
  // { id: 'status', label: 'Status ', alignRight: false },
  { id: '' },
];

export const VISA_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'subCategory', label: 'Sub Category', alignRight: false },
  { id: 'sponserName', label: 'Sponser Name', alignRight: false },
  { id: 'cash', label: 'Cash', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  { id: 'agent', label: 'Agent', alignRight: false },
  { id: 'agentDate', label: 'Agent Date', alignRight: false },
  { id: 'visaNumber', label: 'Visa Number', alignRight: false },
  { id: 'service', label: 'Service Amount', alignRight: false },
  { id: 'government', label: 'Gvt-fee', alignRight: false },
  { id: 'agentAmount', label: 'Agent Amount', alignRight: false },
  { id: 'chamberAmount', label: 'Chamber Amount', alignRight: false },
  { id: 'total', label: 'Total Amount', alignRight: false },
  { id: 'paid', label: 'Paid Amount', alignRight: false },
  { id: 'balance', label: 'Balance Amount ', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export const EXPENSE_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'electricity', label: 'Electricity', alignRight: false },
  { id: 'telephone', label: 'Telephone', alignRight: false },
  { id: 'salary', label: 'Salary', alignRight: false },
  { id: 'stationary', label: 'Stationary', alignRight: false },
  { id: 'other', label: 'Other', alignRight: false },
  { id: 'total', label: 'Total', alignRight: false },
  { id: 'remarks', label: 'Remarks', alignRight: false },
  { id: 'createdTime', label: 'Created Time', alignRight: false },
  { id: '' },
];

export const OTHER_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'subCategory', label: 'Sub Category', alignRight: false },
  { id: 'sponserName', label: 'Sponser Name', alignRight: false },
  { id: 'cash', label: 'Cash', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  { id: 'agent', label: 'Agent', alignRight: false },
  { id: 'agentDate', label: 'Agent Date', alignRight: false },
  { id: 'service', label: 'Service Amount', alignRight: false },
  { id: 'agentAmount', label: 'Agent Amount', alignRight: false },
  { id: 'total', label: 'Total Amount', alignRight: false },
  { id: 'paid', label: 'Paid Amount', alignRight: false },
  { id: 'balance', label: 'Balance Amount ', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export const AGENT_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'agent', label: 'Agent', alignRight: false },
  { id: 'agentDate', label: 'Agent-Date', alignRight: false },
  { id: 'amount', label: 'Amount', alignRight: false },
  { id: 'fileDate', label: 'File-Date', alignRight: false },
  { id: 'service', label: 'Service', alignRight: false },
  { id: 'category', label: 'Category', alignRight: false },
];

export const CUSTOMER_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  // { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];