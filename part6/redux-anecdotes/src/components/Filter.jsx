import { useDispatch } from 'react-redux';
import { setFilter } from '../reducers/filterReducer';

const Filter = () => {
  const dispatch = useDispatch();
  const handleFilterChange = (e) => {
    const filterValue = e.target.value;
    dispatch(setFilter(filterValue));
  };
  return (
    <div>
      filter <input onChange={handleFilterChange} />
    </div>
  );
};

export default Filter;