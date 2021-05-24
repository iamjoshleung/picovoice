import { useState } from 'react';

//components
import { Country } from '../../App';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Typography from '@material-ui/core/Typography';
import Ratings from '../Ratings/Ratings';
import StarIcon from '../StarIcon/StarIcon';

// styles
import { Wrapper } from './CountryInfo.styles';

type Props = {
  country: Country;
  currentSearch: string;
};

const CountryInfo: React.FC<Props> = ({ country, currentSearch }) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const onMouseEnter = (index: number) => {
    setHoverRating(index);
  };
  const onMouseLeave = () => {
    setHoverRating(0);
  };
  const onSaveRating = (index: number) => {
    setRating(index);
  };

  return (
    <Wrapper>
      <Card variant={currentSearch === country.name ? 'outlined' : undefined}>
        <CardContent>
          <Typography color="textSecondary" gutterBottom>
            Name of the country
          </Typography>
          <Typography variant="h5" component="h2">
            {country.name}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            Capital
          </Typography>
          <Typography variant="h5" component="p">
            {country.capital}
          </Typography>
        </CardContent>
        <CardActions>
          <Ratings
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
          />
        </CardActions>
      </Card>
    </Wrapper>
  );
};

export default CountryInfo;
