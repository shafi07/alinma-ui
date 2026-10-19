import {
  buildPayload,
  columnVisibilityState,
  computeTotal,
  createRow,
  carryToCategory,
  entryFields,
  prepareCategoryChange,
  validateRows,
} from './bulkAddModel';

const fill = (row, values) => Object.assign(row, values);

test('totals follow the service form for each category', () => {
  const javasath = fill(createRow(), {
    mainCategory: 'Javasath',
    sub_category: 'Renew',
    agent_amount: 10,
    service: 5,
    iqama: 20,
    insurance: 7,
    mol: 3,
    other: 2,
    absheer_amount: 4,
    qiwa_amount: 6,
    government_fee: 100,
    chamber_amount: 50,
    paid_amount: 15,
  });
  prepareCategoryChange(javasath, 'sub_category');
  expect(computeTotal(javasath)).toBe(10 + 5 + 20 + 7 + 3 + 2 + 4 + 6);
  expect(javasath.government_fee).toBe(0);
  expect(javasath.balance).toBe(computeTotal(javasath) - 15);

  const insurance = fill(createRow(), {
    mainCategory: 'Insurance',
    sub_category: 'Add',
    agent_amount: 10,
    service: 4,
    iqama: 99,
  });
  prepareCategoryChange(insurance, 'sub_category');
  expect(computeTotal(insurance)).toBe(14);
  expect(buildPayload(insurance).iqama).toBeUndefined();

  const visa = fill(createRow(), {
    mainCategory: 'Visa',
    sub_category: 'Wakala',
    agent_amount: 1,
    service: 2,
    chamber_amount: 3,
    government_fee: 4,
    iqama: 9,
  });
  prepareCategoryChange(visa, 'sub_category');
  expect(computeTotal(visa)).toBe(10);
  expect(buildPayload(visa)).toMatchObject({ total_amount: 10, balance: 10, balance_amount: 10, chamber_amount: 3 });
});

test('changing main category clears the previous sub category and leftover fees', () => {
  const row = fill(createRow(), {
    mainCategory: 'Javasath',
    sub_category: 'New Iqama',
    iqama: 40,
    boarder_number: 'B-1',
  });
  prepareCategoryChange(row, 'sub_category');
  row.mainCategory = 'Other';
  prepareCategoryChange(row, 'mainCategory');

  expect(row.sub_category).toBe('');
  expect(row.iqama).toBe(0);
  expect(row.boarder_number).toBe('');
  expect(computeTotal(row)).toBe(0);
});

test('submit validation rejects a missing category and keeps a valid pair', () => {
  const blank = createRow();
  const valid = fill(createRow(), { mainCategory: 'Passport', sub_category: 'Translation' });

  expect(validateRows([blank])).toEqual(['Row 1 needs a main category.']);
  expect(validateRows([valid])).toEqual([]);
  expect(buildPayload(valid).total_amount).toBe(0);
});

test('copying a javasath row into insurance keeps only the shared details', () => {
  const javasath = fill(createRow(), {
    mainCategory: 'Javasath',
    sub_category: 'Renew',
    name: 'Noura',
    id_number: '1234567890',
    sponser_name: 'Ali',
    mobilenumber: '0550000000',
    agent: 'Hassan',
    agent_amount: 10,
    service: 25,
    iqama: 40,
    insurance: 7,
    paid_amount: 5,
  });
  const insurance = carryToCategory(javasath, 'Insurance', 'Add');

  expect(insurance.rowId).not.toBe(javasath.rowId);
  expect(insurance.mainCategory).toBe('Insurance');
  expect(insurance.sub_category).toBe('Add');
  expect(insurance.name).toBe('Noura');
  expect(insurance.id_number).toBe('1234567890');
  expect(insurance.agent_amount).toBe(10);
  expect(insurance.service).toBe(25);
  expect(insurance.paid_amount).toBe(5);
  expect(insurance.iqama).toBe(0);
  expect(insurance.insurance).toBe(0);
  expect(computeTotal(insurance)).toBe(35);
});

test('a batch only lists fields for the selected service', () => {
  const insurance = entryFields('Insurance', 'Add');
  expect(insurance.person.map((field) => field.field)).toEqual(
    expect.arrayContaining(['name', 'dob', 'company', 'cr_number'])
  );
  expect(insurance.person.map((field) => field.field)).not.toContain('boarder_number');
  expect(insurance.fees.map((field) => field.field)).toEqual(['agent_amount', 'service']);

  const renew = entryFields('Javasath', 'Renew');
  expect(renew.fees.map((field) => field.field)).toContain('iqama');
  expect(renew.fees.map((field) => field.field)).not.toContain('government_fee');
  expect(renew.person.map((field) => field.field)).not.toContain('boarder_number');
});

test('columns hide until a row category needs them', () => {
  const hidden = (rows, field) => columnVisibilityState(rows).find((column) => column.colId === field).hide;

  const blank = createRow();
  expect(hidden([blank], 'dob')).toBe(true);
  expect(hidden([blank], 'iqama')).toBe(true);

  const insurance = fill(createRow(), { mainCategory: 'Insurance', sub_category: 'Add' });
  expect(hidden([insurance], 'dob')).toBe(false);
  expect(hidden([insurance], 'cr_number')).toBe(false);
  expect(hidden([insurance], 'iqama')).toBe(true);
  expect(hidden([insurance], 'work_type')).toBe(true);

  const renew = fill(createRow(), { mainCategory: 'Javasath', sub_category: 'Renew' });
  expect(hidden([renew], 'boarder_number')).toBe(true);
  expect(hidden([renew], 'iqama')).toBe(false);
  expect(hidden([renew], 'government_fee')).toBe(true);

  const wakala = fill(createRow(), { mainCategory: 'Visa', sub_category: 'Wakala' });
  expect(hidden([insurance, wakala], 'dob')).toBe(false);
  expect(hidden([insurance, wakala], 'visa_number')).toBe(false);
  expect(hidden([insurance, wakala], 'work_type')).toBe(true);
});

test('new rows and copies do not share the template object', () => {
  const first = createRow();
  first.name = 'Ada';
  const copy = createRow(first);
  first.name = 'First';
  expect(copy.name).toBe('Ada');
  expect(copy.rowId).not.toBe(first.rowId);
});
