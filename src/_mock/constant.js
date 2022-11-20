export const URL = `http://alinma-env.eba-8frrdp32.ap-south-1.elasticbeanstalk.com`

// --------- CSV File Headers----------- //

export const javasathHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "sub_category", key: "sub_category" },
    { label: "sponser_name", key: "sponser_name" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "insurance", key: "insurance" },
    { label: "service", key: "service" },
    { label: "mol", key: "mol" },
    { label: "iqama", key: "iqama" },
    { label: "other", key: "other" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
  ];

export const insuranceHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "Add/New", key: "sub_category" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "dob", key: "dob" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
    { label: "sponser_name", key: "sponser_name" },
  ];

export const workHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "Sub Category", key: "sub_category" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "Agent", key: "agent" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
    { label: "sponser_name", key: "sponser_name" },
  ];

export const visaHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "Sub Category", key: "sub_category" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
    { label: "sponser_name", key: "sponser_name" },
  ];

export const otherHeaders = [
    { label: "File NO", key: "fileid" },
    { label: "Name", key: "name" },
    { label: "ID", key: "id_number" },
    { label: "Sub Category", key: "sub_category" },
    { label: "Mobile", key: "mobilenumber" },
    { label: "total_amount", key: "total_amount" },
    { label: "paid_amount", key: "paid_amount" },
    { label: "balance_amount", key: "balance_amount" },
    { label: "sponser_name", key: "sponser_name" },
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
  ];

  // ------- Table Headers -------- //

export const JAVASATH_TABLE_HEAD = [
    { id: 'file', label: 'File', alignRight: false },
    { id: 'name', label: 'Name', alignRight: false },
    { id: 'id', label: 'ID', alignRight: false },
    { id: 'company', label: 'Sub category', alignRight: false },
    { id: 'sponserName', label: 'Sponser Name', alignRight: false },
    { id: 'mobileNumber', label: 'Mobile', alignRight: false },
    { id: 'cash', label: 'Cash', alignRight: false },
    { id: 'mol', label: 'Mol', alignRight: false },
    { id: 'iqama', label: 'Iqama', alignRight: false },
    { id: 'insurance', label: 'Insurance', alignRight: false },
    { id: 'service', label: 'Service', alignRight: false },
    { id: 'other', label: 'other', alignRight: false },
    { id: 'total', label: 'Total Amount', alignRight: false },
    { id: 'paid', label: 'Paid Amount', alignRight: false },
    { id: 'balance', label: 'Balance Amount ', alignRight: false },
    { id: 'status', label: 'Status', alignRight: false },
    { id: '' },
  ];

export const INSURANCE_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'subCategory', label: 'Add/New', alignRight: false },
  { id: 'sponserName', label: 'Sponser Name', alignRight: false },
  { id: 'dob', label: 'Dob', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  { id: 'cash', label: 'Cash', alignRight: false },
  { id: 'agentDate', label: 'Agent Date', alignRight: false },
  { id: 'agent', label: 'Agent', alignRight: false },
  { id: 'agentAmount', label: 'Agent amount', alignRight: false },
  { id: 'service', label: 'Service', alignRight: false },
  { id: 'total', label: 'Total Amount', alignRight: false },
  { id: 'paid', label: 'Paid Amount', alignRight: false },
  { id: 'balance', label: 'Balance Amount ', alignRight: false },
  { id: 'status', label: 'Status ', alignRight: false },
  { id: '' },
];

export const WORK_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'subCategory', label: 'Sub Category', alignRight: false },
  { id: 'sponserName', label: 'Sponser Name', alignRight: false },
  { id: 'agent', label: 'Agent', alignRight: false },
  { id: 'agentDate', label: 'Agent Date', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  { id: 'cash', label: 'Cash', alignRight: false },
  { id: 'service', label: 'Service', alignRight: false },
  { id: 'agentAmount', label: 'Agent Amount', alignRight: false },
  { id: 'total', label: 'Total Amount', alignRight: false },
  { id: 'paid', label: 'Paid Amount', alignRight: false },
  { id: 'balance', label: 'Balance Amount ', alignRight: false },
  { id: 'status', label: 'Status ', alignRight: false },
  { id: '' },
];

export const VISA_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'name', label: 'Name', alignRight: false },
  { id: 'id', label: 'ID', alignRight: false },
  { id: 'subCategory', label: 'Sub Category', alignRight: false },
  { id: 'sponserName', label: 'Sponser Name', alignRight: false },
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  { id: 'cash', label: 'Cash', alignRight: false },
  { id: 'agent', label: 'Agent', alignRight: false },
  { id: 'agentDate', label: 'Agent Date', alignRight: false },
  { id: 'visaNumber', label: 'Visa Number', alignRight: false },
  { id: 'service', label: 'Service Amount', alignRight: false },
  { id: 'agentAmount', label: 'Agent Amount', alignRight: false },
  { id: 'total', label: 'Total Amount', alignRight: false },
  { id: 'paid', label: 'Paid Amount', alignRight: false },
  { id: 'balance', label: 'Balance Amount ', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];

export const EXPENSE_TABLE_HEAD = [
  { id: 'file', label: 'File', alignRight: false },
  { id: 'electricity', label: 'Electricity', alignRight: false },
  { id: 'telephone', label: 'Telephone', alignRight: false },
  { id: 'salary', label: 'Salary', alignRight: false },
  { id: 'stationary', label: 'stationary', alignRight: false },
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
  { id: 'mobileNumber', label: 'Mobile', alignRight: false },
  { id: 'cash', label: 'Cash', alignRight: false },
  { id: 'agent', label: 'Agent', alignRight: false },
  { id: 'agentDate', label: 'Agent Date', alignRight: false },
  { id: 'service', label: 'Service Amount', alignRight: false },
  { id: 'agentAmount', label: 'Agent Amount', alignRight: false },
  { id: 'total', label: 'Total Amount', alignRight: false },
  { id: 'paid', label: 'Paid Amount', alignRight: false },
  { id: 'balance', label: 'Balance Amount ', alignRight: false },
  { id: 'status', label: 'Status', alignRight: false },
  { id: '' },
];