import { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, map } from 'rxjs/operators';
import { searchKeywordChanged } from '../features/products/productsSlice.js';

function ProductSearch() {
  const dispatch = useDispatch();
  const [inputValue, setInputValue] = useState('');
  const searchInput$ = useMemo(() => new Subject(), []);

  useEffect(() => {
    const subscription = searchInput$
      .pipe(
        map((value) => value.trim()),
        debounceTime(400),
        distinctUntilChanged(),
      )
      .subscribe((keyword) => {
        dispatch(searchKeywordChanged(keyword));
      });

    return () => subscription.unsubscribe();
  }, [dispatch, searchInput$]);

  function handleSearchChange(event) {
    const value = event.target.value;
    setInputValue(value);
    searchInput$.next(value);
  }

  return (
    <label>
      Search
      <input
        type="search"
        value={inputValue}
        onChange={handleSearchChange}
        placeholder="Search products"
      />
    </label>
  );
}

export default ProductSearch;
