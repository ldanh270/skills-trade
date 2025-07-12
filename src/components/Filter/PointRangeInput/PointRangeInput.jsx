import { Minus } from 'lucide-react'

import styles from './PointRangeInput.module.scss'

const PointRangeInput = ({ filters, setFilters }) => {
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
                <input
                    id="min"
                    type="number"
                    value={filters.pointMin}
                    placeholder={0}
                    onChange={handleMinChange}
                    className={styles['input']}
                />
                <Minus />
                <input
                    id="max"
                    type="number"
                    placeholder={999}
                    value={filters.pointMax}
                    onChange={handleMaxChange}
                    className={styles['input']}
                />
            </div>
        </div>
    )
}

export default PointRangeInput
