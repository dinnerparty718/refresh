import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { searchRepo, selectRepo } from './repoSlice';
import { useState } from 'react';

const Repo: React.FC = () => {
  const [term, setTerm] = useState('');

  const { data, loading, error } = useAppSelector(selectRepo);

  const dispatch = useAppDispatch();

  const onSumit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    dispatch(searchRepo(term));
  };

  return (
    <div>
      <form onSubmit={onSumit}>
        <input value={term} onChange={(e) => setTerm(e.target.value)} />
        <button>Search</button>
      </form>

      {error && <h1>{error} </h1>}
      {loading && <div>loading...</div>}
      {!error && !loading && (
        <ul>
          {' '}
          {data.map((name) => (
            <li key={name}>{name}</li>
          ))}{' '}
        </ul>
      )}
    </div>
  );
};

export default Repo;
