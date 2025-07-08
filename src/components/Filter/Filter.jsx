// Import libraries
import { useState } from 'react';
import Select from 'react-select';
import clsx from 'clsx';

// Import styles
import * as styles from './Filter.module.scss';
import { Star } from 'lucide-react';

// Import components
import FilterSkills from '~/components/FilterSkills/FilterSkills';

function Filter() {
    // State to toogle post type
    const [type, setType] = useState('Order');

    // State to set rating
    const [rating, setRating] = useState(0);

    // State to set budget range
    const [range, setRange] = useState(100);

    return (
        <div className={styles['Filter']}>
            <h2 className={styles['title']}>Filters</h2>

            {/* Post Type */}
            <div className={styles['section']}>
                <label>Type of post</label>
                <div className={styles['buttonGroup']}>
                    {['Order', 'Hire'].map((item) => (
                        <button
                            key={item}
                            onClick={() => setType(item)}
                            className={clsx(styles['button'], {
                                [styles['active']]: type === item,
                            })}
                        >
                            {item}
                        </button>
                    ))}
                </div>
            </div>

            {/* Skills */}
            <div className={styles['section']}>
                <FilterSkills />
            </div>

            {/* Rating */}
            <div className={styles['section']}>
                <label>Rating</label>
                <div className={styles['stars']}>
                    {[1, 2, 3, 4, 5].map((i) => (
                        <Star
                            key={i}
                            size={20}
                            onClick={() => setRating(i)}
                            className={clsx({ [styles['filled']]: rating >= i })}
                        />
                    ))}
                </div>
            </div>

            {/* Range */}
            <div className={styles['section']}>
                <label>Point range</label>
                <div className={styles['rangeLabels']}>
                    <span>0</span>
                    <span>{range} pts</span>
                </div>
                <input
                    type="range"
                    min="0"
                    max="100"
                    value={range}
                    onChange={(e) => setRange(e.target.value)}
                />
            </div>
        </div>
    );
}

export default Filter;
