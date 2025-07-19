import { Search } from 'lucide-react'
import { lighten } from 'polished'
import React, { useEffect, useState } from 'react'
// eslint-disable-next-line no-unused-vars
import Select, { components } from 'react-select'

import { fetchSkills } from '~/api/api-skills'

import styles from './StepSkills.module.scss'

export default function StepSkills({ formData, setFormData, next, prev }) {
    const [skills, setSkills] = useState([])
    const [selected, setSelected] = useState(
        formData.skills?.map((s) => ({ label: s, value: s })) || [],
    )

    const [isFocused, setIsFocused] = useState(false)

    const CustomValueContainer = ({ children, ...props }) => {
        const hasValue = props.getValue().length > 0
        const [placeholder, input] = children

        return (
            <components.ValueContainer {...props}>
                <Search size={18} style={{ marginRight: '0.5rem', color: '#888' }} />
                {!hasValue && !isFocused && placeholder}
                {input}
            </components.ValueContainer>
        )
    }

    // Fetch skills on mount
    useEffect(() => {
        const getSkills = async () => {
            const data = await fetchSkills()
            setSkills(data)
        }
        getSkills()
    }, [])

    const handleRemove = (value) => {
        const updated = selected.filter((s) => s.value !== value)
        setSelected(updated)
    }

    const handleNext = () => {
        setFormData({ ...formData, skills: selected.map((s) => s.value) })
        next()
    }

    return (
        <div className={styles['step-skills']}>
            <div className={styles['content']}>
                <h1 className={styles['title']}>Skills</h1>
                <p className={styles['description']}>
                    For the best results, add <strong>3–5 skills</strong> that match your offer or
                    need.
                </p>

                <Select
                    options={skills}
                    isMulti
                    value={selected}
                    onChange={setSelected}
                    onFocus={() => setIsFocused(true)}
                    onBlur={() => setIsFocused(false)}
                    components={{
                        ValueContainer: (props) => (
                            <CustomValueContainer {...props} isFocused={isFocused} />
                        ),
                    }}
                    styles={{
                        width: '100%',
                        control: (base, state) => ({
                            ...base,
                            display: 'flex',
                            flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'flex-start',
                            height: '5rem',
                            fontSize: '1.5rem',
                            backgroundColor: '#fff', // $white
                            borderColor: state.isFocused ? '#4F80E2' : '#ccc', // $accent-secondary or $gap
                            borderRadius: '8px',
                            boxShadow: 'none',
                            '&:hover': {
                                borderColor: '#4F80E2', // hover = $accent-secondary
                            },
                        }),
                        valueContainer: (base) => ({
                            ...base,
                            display: 'flex',
                            alignItems: 'center',
                            gap: '0.5rem',
                            color: '#080809', // $text-info
                        }),
                        multiValue: () => ({
                            display: 'none', // Hide default, replaced with custom tags
                        }),
                        option: (base, state) => ({
                            ...base,
                            height: '3rem',
                            fontSize: '1rem',
                            backgroundColor: state.isFocused ? lighten(0.1, '#4F80E2') : '#fff', // focused = $accent-first (lighter)
                            color: '#080809', // $text-info
                            cursor: 'pointer',
                        }),
                        placeholder: (base) => ({
                            ...base,
                            color: '#65686C', // $text-element
                            fontStyle: 'italic',
                        }),
                    }}
                    classNamePrefix="react-select"
                    placeholder="Search skills or add your own..."
                />

                {selected.length > 0 && (
                    <div className={styles['selected-tags']}>
                        {selected.map((skill) => (
                            <div key={skill.value} className={styles['tag']}>
                                {skill.label}
                                <button onClick={() => handleRemove(skill.value)}>&times;</button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <div className={styles['actions']}>
                <hr className={styles['separator']} />

                <div className={styles['buttons']}>
                    <button className={styles['back']} onClick={prev}>
                        Back
                    </button>
                    <button
                        className={`${styles['next']} ${selected.length > 0 ? styles['active'] : styles['disabled']}`}
                        onClick={() => {
                            if (selected.length > 0) {
                                handleNext()
                            }
                        }}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    )
}
