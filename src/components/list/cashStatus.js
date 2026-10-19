const numericAmount = (value) => {
  if (value == null || value === '') return null;
  const amount = Number(value);
  return Number.isFinite(amount) ? amount : null;
};

const paymentHistory = (row) => {
  const history = row?.amount_paid_dates;
  if (Array.isArray(history)) return history;
  if (typeof history === 'string') {
    try {
      const parsed = JSON.parse(history);
      return Array.isArray(parsed) ? parsed : [];
    } catch (err) {
      return [];
    }
  }
  return [];
};

export const outstandingBalance = (row) => {
  if (!row) return null;
  const stored = numericAmount(row.balance_amount);
  if (row.balance_amount != null && row.balance_amount !== '' && stored != null) return stored;

  const total = numericAmount(row.total_amount) ?? 0;
  const history = paymentHistory(row);
  const paidFromHistory = history.reduce((sum, entry) => {
    const amount = numericAmount(entry?.amount);
    return amount == null ? sum : sum + amount;
  }, 0);
  const hasNumericPayment = history.some((entry) => numericAmount(entry?.amount) != null);
  const paid = hasNumericPayment ? paidFromHistory : (numericAmount(row.paid_amount) ?? 0);
  return total - paid;
};

export const isPaidRecord = (row) => {
  if (!row) return false;
  if (row.balance_amount != null) return Number(row.balance_amount) === 0;
  return outstandingBalance(row) === 0;
};
