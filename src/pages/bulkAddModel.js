import { bulkEditDefault } from '../_mock/constant';

export const SUB_CATEGORIES = {
  Javasath: [
    'New Iqama',
    'Renew',
    'Visa Change',
    'Visit Visa Renew',
    'Re Entry',
    'Print',
    'Driving Licence',
    'Vehicle Registration Renew',
    'Final Exit',
    'Sponser Change',
    'Profession Change',
  ],
  Insurance: ['Add', 'New'],
  Work: ['Sijil', 'Ruksa'],
  Visa: ['Work Visa', 'Visit Visa', 'Visit Chamber', 'Wakala', 'Visa Chamber', 'Mofa'],
  Passport: ['Renew Pasport', 'Translation'],
  Other: ['Baladiya Card', 'Vaccine', 'Salary Transfer', 'Qiwa', 'Gosi', 'Certificate', 'Rent agreement'],
};

export const ENDPOINTS = {
  Javasath: 'javasath',
  Insurance: 'insurance',
  Work: 'work',
  Visa: 'visa',
  Passport: 'other',
  Other: 'other',
};

export const WORK_TYPES = ['New', 'Renew', 'Update', 'Cancel', 'Transfer', 'QR-Code', 'Difa Madani'];
export const RE_ENTRY_TYPES = ['Leave', 'Extend'];

const CONDITIONAL_FIELDS = [
  'other',
  'boarder_number',
  'professionName',
  'newSponser',
  're_entry_type',
  'iqama',
  'government_fee',
  'insurance',
  'mol',
  'absheer_amount',
  'qiwa_amount',
  'due',
  'expiry_date',
  'new_passport_number',
  'dob',
  'company',
  'cr_number',
  'work_type',
  'chamber_amount',
  'application_number',
  'visa_number',
  'travels',
];

const NUMERIC_FIELDS = new Set([
  'other',
  'iqama',
  'government_fee',
  'insurance',
  'mol',
  'absheer_amount',
  'qiwa_amount',
  'chamber_amount',
  'agent_amount',
  'service',
  'paid_amount',
]);

const TOTAL_FIELDS = [
  'agent_amount',
  'service',
  'other',
  'iqama',
  'insurance',
  'mol',
  'absheer_amount',
  'qiwa_amount',
  'government_fee',
  'chamber_amount',
];

const includes = (list, value) => list.includes(value);

export const num = (value) => {
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : 0;
};

export function fieldApplies(row, field) {
  const main = row?.mainCategory;
  const sub = row?.sub_category;

  switch (field) {
    case 'other':
      return main === 'Javasath';
    case 'boarder_number':
      return main === 'Javasath' && sub === 'New Iqama';
    case 'professionName':
      return main === 'Javasath' && sub === 'Profession Change';
    case 'newSponser':
      return main === 'Javasath' && sub === 'Sponser Change';
    case 're_entry_type':
      return main === 'Javasath' && sub === 'Re Entry';
    case 'iqama':
      return main === 'Javasath' && !includes(['Driving Licence', 'Vehicle Registration Renew'], sub);
    case 'insurance':
    case 'mol':
      return main === 'Javasath' && includes(['New Iqama', 'Renew', 'Visit Visa Renew'], sub);
    case 'absheer_amount':
      return (
        main === 'Javasath' &&
        !includes(['Print', 'Driving Licence', 'Vehicle Registration Renew', 'Visit Visa Renew'], sub)
      );
    case 'qiwa_amount':
      return main === 'Javasath' && includes(['New Iqama', 'Renew', 'Sponser Change', 'Profession Change'], sub);
    case 'due':
      return main === 'Javasath' && !includes(['Visa Change', 'Sponser Change'], sub);
    case 'expiry_date':
    case 'new_passport_number':
      return main === 'Javasath' && sub === 'Visa Change';
    case 'government_fee':
      if (main === 'Work') return true;
      if (main === 'Javasath') return includes(['Driving Licence', 'Vehicle Registration Renew'], sub);
      if (main === 'Visa') return includes(['Work Visa', 'Wakala'], sub);
      return false;
    case 'dob':
    case 'company':
    case 'cr_number':
      return main === 'Insurance';
    case 'work_type':
      return main === 'Work';
    case 'chamber_amount':
      return main === 'Visa' && includes(['Visa Chamber', 'Wakala'], sub);
    case 'application_number':
      return main === 'Visa' && sub === 'Visit Chamber';
    case 'visa_number':
    case 'travels':
      return main === 'Visa' && sub === 'Wakala';
    default:
      return true;
  }
}

export function columnVisibilityState(rows) {
  const categorized = (rows || []).filter((row) => row?.mainCategory);
  return CONDITIONAL_FIELDS.map((field) => ({
    colId: field,
    hide: !categorized.some((row) => fieldApplies(row, field)),
  }));
}

export function clearInapplicable(row) {
  CONDITIONAL_FIELDS.forEach((field) => {
    if (!fieldApplies(row, field)) {
      row[field] = NUMERIC_FIELDS.has(field) ? 0 : '';
    }
  });
  return row;
}

export function computeTotal(row) {
  return TOTAL_FIELDS.reduce((total, field) => total + (fieldApplies(row, field) ? num(row[field]) : 0), 0);
}

export function writeTotals(row) {
  const total = computeTotal(row);
  row.total_amount = total;
  row.balance = total - num(row.paid_amount);
  return row;
}

export function createRow(source) {
  const row = {
    ...bulkEditDefault,
    ...(source || {}),
    rowId:
      typeof crypto !== 'undefined' && crypto.randomUUID
        ? crypto.randomUUID()
        : `bulk-${Date.now()}-${Math.random().toString(16).slice(2)}`,
  };
  clearInapplicable(row);
  writeTotals(row);
  return row;
}

export function prepareCategoryChange(row, field) {
  if (field === 'mainCategory') {
    row.sub_category = '';
  }
  if (field === 'mainCategory' || field === 'sub_category') {
    clearInapplicable(row);
  }
  writeTotals(row);
  return row;
}

const text = (value) => (value == null ? '' : String(value));

const sharedPayload = (row) => {
  const total = computeTotal(row);
  const balance = total - num(row.paid_amount);
  return {
    sub_category: text(row.sub_category),
    name: text(row.name),
    sponser_name: text(row.sponser_name),
    id_number: text(row.id_number),
    mobilenumber: text(row.mobilenumber),
    remarks: text(row.remarks),
    agent: text(row.agent),
    agent_amount: num(row.agent_amount),
    service: num(row.service),
    paid_amount: num(row.paid_amount),
    paid_date: text(row.paid_date),
    total_amount: total,
    balance,
  };
};

const amount = (row, field) => (fieldApplies(row, field) ? num(row[field]) : 0);
const applicableText = (row, field) => (fieldApplies(row, field) ? text(row[field]) : '');

export function buildPayload(row) {
  const base = sharedPayload(row);

  switch (row.mainCategory) {
    case 'Javasath':
      return {
        ...base,
        mol: amount(row, 'mol'),
        other: amount(row, 'other'),
        iqama: amount(row, 'iqama'),
        insurance: amount(row, 'insurance'),
        professionName: applicableText(row, 'professionName'),
        newSponser: applicableText(row, 'newSponser'),
        due: applicableText(row, 'due'),
        absheer_amount: amount(row, 'absheer_amount'),
        qiwa_amount: amount(row, 'qiwa_amount'),
        government_fee: amount(row, 'government_fee'),
        new_passport_number: applicableText(row, 'new_passport_number'),
        expiry_date: applicableText(row, 'expiry_date'),
        re_entry_type: applicableText(row, 're_entry_type'),
        boarder_number: applicableText(row, 'boarder_number'),
      };
    case 'Insurance':
      return {
        ...base,
        dob: applicableText(row, 'dob'),
        company: applicableText(row, 'company'),
        cr_number: applicableText(row, 'cr_number'),
      };
    case 'Work':
      return {
        ...base,
        government_fee: amount(row, 'government_fee'),
        work_type: applicableText(row, 'work_type'),
      };
    case 'Visa':
      return {
        ...base,
        visa_number: applicableText(row, 'visa_number'),
        travels: applicableText(row, 'travels'),
        chamber_amount: amount(row, 'chamber_amount'),
        government_fee: amount(row, 'government_fee'),
        application_number: applicableText(row, 'application_number'),
        balance_amount: base.balance,
      };
    case 'Passport':
    case 'Other':
      return base;
    default:
      return null;
  }
}

export function validateRows(rows) {
  if (!rows.length) return ['Add a row before submitting.'];

  return rows.flatMap((row, index) => {
    const label = `Row ${index + 1}`;
    if (!ENDPOINTS[row.mainCategory]) return [`${label} needs a main category.`];
    if (!SUB_CATEGORIES[row.mainCategory].includes(row.sub_category)) {
      return [`${label} needs a valid sub category.`];
    }
    return [];
  });
}
