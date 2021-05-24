import { useMemo } from 'react';

import StarIcon from '../StarIcon/StarIcon';

//styles
import { Wrapper } from './RatingIcon.styles';

type Props = {
  index: number;
  rating: number;
  hoverRating: number;
  onMouseEnter: (index: number) => void;
  onMouseLeave: () => void;
  onSaveRating: (index: number) => void;
};

const RatingIcon: React.FC<Props> = ({
  index,
  rating,
  hoverRating,
  onMouseEnter,
  onMouseLeave,
  onSaveRating,
}) => {
  const fill = useMemo(() => {
    if (hoverRating >= index) {
      return 'gray';
    } else if (!hoverRating && rating >= index) {
      return 'black';
    }
    return 'none';
  }, [rating, hoverRating, index]);

  return (
    <Wrapper
      className="cursor-pointer"
      onMouseEnter={() => onMouseEnter(index)}
      onMouseLeave={() => onMouseLeave()}
      onClick={() => onSaveRating(index)}
    >
      <StarIcon fill={fill} />
    </Wrapper>
  );
};

export default RatingIcon;
