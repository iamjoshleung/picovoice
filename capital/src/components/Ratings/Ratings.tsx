import { useState } from 'react';

// components
import RatingIcon from '../RatingIcon/RatingIcon';

// styles
import { Wrapper } from './Ratings.styles';

type Props = {
  rating: number;
  hoverRating: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  onSaveRating: (index: number) => void;
};

const Ratings: React.FC<Props> = ({
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
}) => {
  return (
    <Wrapper className="box flex">
      {[1, 2, 3, 4, 5].map((index) => {
        return (
          <RatingIcon
            key={index}
            index={index}
            rating={rating}
            hoverRating={hoverRating}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onSaveRating={onSaveRating}
          />
        );
      })}
    </Wrapper>
  );
};

export default Ratings;
