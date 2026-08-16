import React, { useState } from 'react';
import { Star } from 'lucide-react';

export const RatingStars = ({ value = 0, onChange, readonly = false, max = 5 }) => {
  const [hover, setHover] = useState(0);

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
      {[...Array(max)].map((_, i) => {
        const ratingValue = i + 1;
        const isFilled = ratingValue <= (hover || value);

        return (
          <button
            key={i}
            type="button"
            disabled={readonly}
            onClick={() => !readonly && onChange && onChange(ratingValue)}
            onMouseEnter={() => !readonly && setHover(ratingValue)}
            onMouseLeave={() => !readonly && setHover(0)}
            style={{
              background: 'transparent',
              border: 'none',
              cursor: readonly ? 'default' : 'pointer',
              padding: '2px'
            }}
          >
            <Star
              style={{
                width: '18px',
                height: '18px',
                color: isFilled ? '#f59e0b' : '#334155',
                fill: isFilled ? '#f59e0b' : 'transparent',
                transition: 'all 0.15s ease'
              }}
            />
          </button>
        );
      })}
    </div>
  );
};
