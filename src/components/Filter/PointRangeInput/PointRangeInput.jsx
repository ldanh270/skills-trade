import { Minus } from 'lucide-react'
import React, { useState } from 'react'

import styles from './PointRangeInput.module.scss'

const PointRangeInput = ({ initialMin = 0, initialMax = 100 }) => {
    const [minValue, setMinValue] = useState(initialMin)
    const [maxValue, setMaxValue] = useState(initialMax)

    const handleMinChange = (e) => {
        const value = Number(e.target.value)
        if (value < maxValue) setMinValue(value)
    }

    const handleMaxChange = (e) => {
        const value = Number(e.target.value)
        if (value > minValue) setMaxValue(value)
    }

    return (
        <div className={styles['container']}>
            <label>Point range</label>
            <div className={styles['field']}>
                <input
                    id="min"
                    type="number"
                    value={minValue}
                    placeholder={0}
                    onChange={handleMinChange}
                    className={styles['input']}
                />
                <Minus />
                <input
                    id="max"
                    type="number"
                    placeholder={0}
                    value={maxValue}
                    onChange={handleMaxChange}
                    className={styles['input']}
                />
            </div>
        </div>
    )
}

export default PointRangeInput
