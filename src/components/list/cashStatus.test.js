import { isPaidRecord, outstandingBalance } from './cashStatus';

const settledWithNullBalance = {
  id: 1967,
  total_amount: '200',
  paid_amount: null,
  balance_amount: null,
  amount_paid_dates: [
    { date: '18-10-2026', amount: 'undefined' },
    { date: '18-10-2026', amount: '200' },
  ],
};

test('a null balance is paid when numeric payments cover the total', () => {
  expect(outstandingBalance(settledWithNullBalance)).toBe(0);
  expect(isPaidRecord(settledWithNullBalance)).toBe(true);
});

test('a null balance with no real payment stays credit', () => {
  const row = {
    total_amount: '200',
    paid_amount: null,
    balance_amount: null,
    amount_paid_dates: [{ date: '18-10-2026', amount: 'undefined' }],
  };
  expect(outstandingBalance(row)).toBe(200);
  expect(isPaidRecord(row)).toBe(false);
});

test('a stored balance still decides the label', () => {
  expect(isPaidRecord({ balance_amount: 0, total_amount: '200', paid_amount: null })).toBe(true);
  expect(isPaidRecord({ balance_amount: '50', total_amount: '200' })).toBe(false);
});
