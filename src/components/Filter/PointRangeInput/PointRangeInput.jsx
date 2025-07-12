import { Minus } from 'lucide-react'

import styles from './PointRangeInput.module.scss'

/**
 * Component: PointRangeInput
 * Cho phép người dùng nhập khoảng điểm min - max để lọc bài đăng
 */
const PointRangeInput = ({ filters, setFilters }) => {
    // Xử lý thay đổi giá trị min
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

    // Xử lý thay đổi giá trị max
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
