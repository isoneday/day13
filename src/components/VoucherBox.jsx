import { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { EMPTY, Subject, from } from 'rxjs';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  filter,
  map,
  switchMap,
  tap,
} from 'rxjs/operators';
import {
  voucherCleared,
  voucherInputChanged,
  voucherValidationErrored,
  voucherValidationFailed,
  voucherValidationStarted,
  voucherValidationSucceeded,
} from '../features/voucher/voucherSlice.js';
import { validateVoucherApi } from '../services/fakeApi.js';

function VoucherBox() {
  const dispatch = useDispatch();
  const voucher = useSelector((state) => state.voucher);
  const voucherInput$ = useMemo(() => new Subject(), []);

  useEffect(() => {
    const subscription = voucherInput$
      .pipe(
        map((value) => value.trim().toUpperCase()),
        debounceTime(500),
        distinctUntilChanged(),
        filter((code) => code.length >= 3),
        tap(() => dispatch(voucherValidationStarted())),
        // switchMap keeps the latest voucher request as the only result that matters.
        switchMap((code) =>
          from(validateVoucherApi(code)).pipe(
            catchError((error) => {
              dispatch(voucherValidationErrored(error.message));
              return EMPTY;
            }),
          ),
        ),
      )
      .subscribe((result) => {
        if (result.valid) {
          dispatch(voucherValidationSucceeded(result));
          return;
        }

        dispatch(voucherValidationFailed(result));
      });

    return () => subscription.unsubscribe();
  }, [dispatch, voucherInput$]);

  function handleVoucherChange(event) {
    const value = event.target.value;
    dispatch(voucherInputChanged(value));
    voucherInput$.next(value);
  }

  function handleRetry() {
    // Retry is an explicit one-off user action, not a typing event, so it
    // deliberately bypasses debounceTime/distinctUntilChanged/filter and
    // calls the fake API directly instead of pushing back into voucherInput$
    // (distinctUntilChanged would otherwise swallow the identical code).
    dispatch(voucherValidationStarted());

    validateVoucherApi(voucher.code)
      .then((result) => {
        if (result.valid) {
          dispatch(voucherValidationSucceeded(result));
          return;
        }

        dispatch(voucherValidationFailed(result));
      })
      .catch((error) => {
        dispatch(voucherValidationErrored(error.message));
      });
  }

  return (
    <section className="voucher-box" aria-labelledby="voucher-title">
      <h3 id="voucher-title">Voucher</h3>
      <label>
        Code
        <input
          type="text"
          value={voucher.code}
          onChange={handleVoucherChange}
          placeholder="Try SAVE20 or FOOD10"
          autoComplete="off"
        />
      </label>
      <p className={`voucher-status voucher-status-${voucher.status}`}>
        Status: <strong>{voucher.status}</strong>
      </p>
      {voucher.message && <p className="voucher-message">{voucher.message}</p>}
      {voucher.error && (
        <div className="voucher-error-row">
          <p className="voucher-error">{voucher.error}</p>
          <button type="button" onClick={handleRetry}>
            Retry
          </button>
        </div>
      )}
      {voucher.code && (
        <button type="button" onClick={() => dispatch(voucherCleared())}>
          Clear voucher
        </button>
      )}
    </section>
  );
}

export default VoucherBox;
