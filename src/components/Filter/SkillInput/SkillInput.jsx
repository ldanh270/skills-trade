import React, { useState } from 'react'
// eslint-disable-next-line no-unused-vars
import Select, { components } from 'react-select'

import styles from './SkillInput.module.scss'

function SkillInput() {
    // Options list (Get from API)
    const groupedOptions = [
        {
            label: 'Frontend',
            options: [
                { value: 'HTML5', label: 'HTML5' },
                { value: 'CSS3', label: 'CSS3' },
                { value: 'React', label: 'React' },
            ],
        },
        {
            label: 'Backend',
            options: [
                { value: 'Node.js', label: 'Node.js' },
                { value: 'Django', label: 'Django' },
            ],
        },
    ]

    // State to display selected skill tags
    const [selected, setSelected] = useState([])

    // Display number of selected skills in input bar
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
                options={groupedOptions}
                value={selected}
                onChange={setSelected}
                isMulti
                placeholder="Select skills..."
                classNamePrefix="custom"
                components={{ ValueContainer: CustomValueContainer }}
                menuPlacement="auto"
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
