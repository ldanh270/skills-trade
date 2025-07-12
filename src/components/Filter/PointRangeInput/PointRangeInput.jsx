import { Minus } from 'lucide-react'

import styles from './PointRangeInput.module.scss'

/**
 * Component: PointRangeInput
 * Allows users to input a minimum and maximum point value to filter posts accordingly.
 */
const PointRangeInput = ({ filters, setFilters }) => {
    /**
     * Handle changes to the minimum point input
     * Ensures min is either null or less than the current max
     */
    const handleMinChange = (e) => {
        const raw = e.target.value
        const value = raw === '' ? null : Number(raw)

        if (value === null || filters.pointMax === null || value < filters.pointMax) {
            setFilters({
                ...filters,
                pointMin: value,
            })
        }
    }

    /**
     * Handle changes to the maximum point input
     * Ensures max is either null or greater than the current min
     */
    const handleMaxChange = (e) => {
        const raw = e.target.value
        const value = raw === '' ? null : Number(raw)

        if (value === null || filters.pointMin === null || value > filters.pointMin) {
            setFilters({
                ...filters,
                pointMax: value,
            })
        }
    }

    return (
        <div className={styles['container']}>
            <label>Point range</label>

            <div className={styles['field']}>
                {/* Minimum point input field */}
                <input
                    id="min"
                    type="number"
                    value={filters.pointMin}
                    placeholder={0}
                    onChange={handleMinChange}
                    className={styles['input']}
                />

                {/* Dash icon between inputs */}
                <Minus />

                {/* Maximum point input field */}
                <input
                    id="max"
                    type="number"
                    value={filters.pointMax}
                    placeholder={999}
                    onChange={handleMaxChange}
                    className={styles['input']}
                />
            </div>
        </div>
    )
}

export default PointRangeInput
