import { useState } from 'react';

// components
import SearchBox from './components/SearchBox/SearchBox';
import CountryInfo from './components/CountryInfo/CountryInfo';
import Alert from '@material-ui/lab/Alert';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';

export type Country = {
  name: string;
  capital: string;
};

type Error = {
  type: string;
  message: string;
};

const App = () => {
  const [countries, setCountries] = useState([] as Country[]);
  const [currentSearch, setCurrentSearch] = useState('');
  const [error, setError] = useState<Error | null>(null);

  const handleSearchBox = async (country: string) => {
    const newCountries = [];

    try {
      const res = await (
        await fetch(`https://restcountries.eu/rest/v2/name/${country}`)
      ).json();

      const name: string = res[0]['name'];
      const capital: string = res[0]['capital'];

      if (countries.some((country) => country.name === name)) {
        setCurrentSearch(name);
        return;
      }

      setCurrentSearch(name);

      newCountries.push({ name, capital });

      const neighbouringCountries = res[0]['borders'].join(';');

      const res2 = await (
        await fetch(
          `https://restcountries.eu/rest/v2/alpha?codes=${neighbouringCountries}`
        )
      ).json();

      res2.forEach((country: any) => {
        newCountries.push({
          name: country['name'],
          capital: country['capital'],
        });
      });

      setCountries([...countries, ...newCountries]);
      setError(null);
    } catch (Exception) {
      setError({ type: 'error', message: 'No country found' });
    }
  };

  return (
    <>
      <CssBaseline />
      <Box pt={8}>
        <Container maxWidth="md">
          <SearchBox searchCapitalByCountryName={handleSearchBox} />
          {error && (
            <Box mt={4}>
              <Alert severity="error">{error.message}</Alert>
            </Box>
          )}
          <Box p={2}>
            <Grid container justify="center" spacing={3}>
              {countries.map((country) => (
                <Grid key={country.name} item>
                  <CountryInfo
                    currentSearch={currentSearch}
                    country={country}
                    key={country.name}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

export default App;
