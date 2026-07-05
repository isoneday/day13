const voucherResults = {
  SAVE20: {
    valid: true,
    discountPercent: 20,
    message: 'SAVE20 applied for 20% off.',
  },
  FOOD10: {
    valid: true,
    discountPercent: 10,
    message: 'FOOD10 applied for 10% off.',
  },
};

function randomDelay() {
  return 400 + Math.floor(Math.random() * 700);
}

export function validateVoucherApi(code) {
  const normalizedCode = code.trim().toUpperCase();

  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (normalizedCode === 'ERROR') {
        reject(new Error('Voucher service is temporarily unavailable.'));
        return;
      }

      if (voucherResults[normalizedCode]) {
        resolve({
          code: normalizedCode,
          ...voucherResults[normalizedCode],
        });
        return;
      }

      resolve({
        code: normalizedCode,
        valid: false,
        discountPercent: 0,
        message: 'Voucher code is not valid.',
      });
    }, randomDelay());
  });
}
