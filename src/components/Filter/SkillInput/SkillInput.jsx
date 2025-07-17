import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import Select, { components } from 'react-select'

import { fetchSkills } from '~/api/api-skills'

import styles from './SkillInput.module.scss'

/**
 * SkillInput component
 * Multi-select for user skills with badge indicator and API fetch
 */
function SkillInput({ filters, setFilters }) {
    const [skills, setSkills] = useState([]) // Available skills from API

    // Fetch skills on mount
    useEffect(() => {
        const getSkills = async () => {
            const data = await fetchSkills()
            setSkills(data)
        }
        getSkills()
    }, [])

    // Handle skill selection change
    const handleSelectChange = (selectedOptions) => {
        setFilters((prevFilters) => ({
            ...prevFilters,
            skills: selectedOptions,
        }))
    }

    // Custom value container shows badge when menu is closed
    const CustomValueContainer = ({ children, ...props }) => {
        const { getValue, selectProps } = props
        const selected = getValue()
        const count = selected.length

        if (!selectProps.menuIsOpen && count > 0) {
            return (
                <components.ValueContainer {...props}>
                    <div className={styles['badge']}>
                        {count} skill{count > 1 ? 's' : ''} selected
                    </div>
                </components.ValueContainer>
            )
        }

        return <components.ValueContainer {...props}>{children}</components.ValueContainer>
    }

    return (
        <div className={styles['container']}>
            <label className={styles['label']}>Your skills</label>

            <Select
                isMulti
                options={skills}
                value={filters.skills}
                onChange={handleSelectChange}
                placeholder="Select skills..."
                classNamePrefix="custom"
                menuPlacement="auto"
                components={{ ValueContainer: CustomValueContainer }}
                styles={{
                    control: (base, state) => ({
                        ...base,
                        borderColor: state.isFocused ? '#333' : '#ccc',
                        boxShadow: state.isFocused ? '0 0 0 2px #E5E7EB' : 'none',
                        minHeight: '38px',
                        fontSize: '14px',
                        cursor: 'pointer',
                    }),
                    multiValue: (base) => ({
                        ...base,
                        backgroundColor: '#eee',
                        borderRadius: '12px',
                        padding: '2px 6px',
                        fontSize: '12px',
                    }),
                    multiValueRemove: (base) => ({
                        ...base,
                        ':hover': {
                            backgroundColor: '#E5E7EB',
                            color: '#000',
                        },
                    }),
                    option: (base, state) => ({
                        ...base,
                        cursor: 'pointer',
                        backgroundColor: state.isSelected
                            ? '#e5e7eb'
                            : state.isFocused
                              ? '#f3f4f6'
                              : 'white',
                        color: '#333',
                    }),
                }}
            />
        </div>
    )
}

export default SkillInput
