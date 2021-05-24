import { useState } from 'react';
import TextField from '@material-ui/core/TextField';

type Props = {
  searchCapitalByCountryName: (country: string) => void;
};

const SearchBox: React.FC<Props> = ({ searchCapitalByCountryName }) => {
  const [country, setCountry] = useState('');

  const handleCountryInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCountry(e.target.value);
  };

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();
    searchCapitalByCountryName(country);
    setCountry('');
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          type="text"
          label="Enter a country name"
          value={country}
          onChange={handleCountryInput}
        />
      </form>
    </div>
  );
};

export default SearchBox;
