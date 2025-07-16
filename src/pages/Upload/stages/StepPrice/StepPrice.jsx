import React, { useState } from 'react'

import styles from './StepPrice.module.scss'

export default function StepPrice({ formData, setFormData, next, prev }) {
    const [minPrice, setMinPrice] = useState(formData.price.min || '')
    const [maxPrice, setMaxPrice] = useState(formData.price.max || '')
    const [error, setError] = useState(null)

    const validate = () => {
        if (!maxPrice) return 'Please fill in fields.'
        if (isNaN(minPrice) || isNaN(maxPrice)) return 'Values must be numbers.'
        if (minPrice < 0 || maxPrice <= 0) return 'Max prices must be greater than 0.'
        if (Number(maxPrice) < Number(minPrice)) return 'Max must be greater than Min.'
        return null
    }

    const handleNext = () => {
        const err = validate()
        if (err) {
            setError(err)
            return
        }
        setFormData({
            ...formData,
            price: {
                min: Number(minPrice) || 0,
                max: Number(maxPrice),
            },
        })
        next()
    }

    return (
        <div className={styles['step-price']}>
            <div className={styles['content']}>
                <h1 className={styles['title']}>Set Your Point Range</h1>
                <p className={styles['description']}>
                    Indicate the <strong>point range (pts)</strong> that fits your offer or budget.
                </p>

                <div className={styles['price-input-group']}>
                    <div className={styles['price-field']}>
                        <label htmlFor="min">Min Points</label>
                        <div className={styles['input-wrapper']}>
                            <span className={styles['prefix']}>$</span>
                            <input
                                type="number"
                                id="min"
                                placeholder="0"
                                value={minPrice}
                                onChange={(e) => {
                                    setError(null)
                                    setMinPrice(e.target.value)
                                }}
                                min={0}
                            />
                        </div>
                    </div>

                    <div className={styles['price-field']}>
                        <label htmlFor="max">Max Points</label>
                        <div className={styles['input-wrapper']}>
                            <span className={styles['prefix']}>$</span>
                            <input
                                type="number"
                                id="max"
                                placeholder="0"
                                value={maxPrice}
                                onChange={(e) => {
                                    setError(null)
                                    setMaxPrice(e.target.value)
                                }}
                                min={0}
                            />
                        </div>
                    </div>
                </div>

                {error && <p className={styles['error']}>{error}</p>}
            </div>

            <div className={styles['actions']}>
                <hr className={styles['separator']} />
                <div className={styles['buttons']}>
                    <button className={styles['back']} onClick={prev}>
                        Back
                    </button>
                    <button
                        className={`${styles['next']} ${
                            !validate() ? styles['active'] : styles['disabled']
                        }`}
                        onClick={handleNext}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
