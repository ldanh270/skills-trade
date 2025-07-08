import React, { useState } from 'react';
import Select, { components } from 'react-select';
import clsx from 'clsx';
import styles from './FilterSkills.module.scss';

const groupedOptions = [
    {
        label: 'Frontend',
        options: [
            { value: 'HTML5', label: 'HTML5' },
            { value: 'CSS3', label: 'CSS3' },
            { value: 'React', label: 'React' },
            { value: 'Vue', label: 'Vue' },
        ],
    },
    {
        label: 'Backend',
        options: [
            { value: 'Node.js', label: 'Node.js' },
            { value: 'Django', label: 'Django' },
            { value: 'Python', label: 'Python' },
        ],
    },
];

function FilterSkills() {
    const [selectedSkills, setSelectedSkills] = useState([]);

    const handleRemove = (value) => {
        setSelectedSkills((prev) => prev.filter((skill) => skill.value !== value));
    };

    const CustomValueContainer = ({ children, ...props }) => {
        const input = children.find((child) => child && child.type === components.Input);

        return (
            <components.ValueContainer {...props}>
                {props.getValue().length === 0 && (
                    <div className={clsx(styles.placeholderWrapper)}>
                        {props.selectProps.placeholder}
                    </div>
                )}
                {input}
            </components.ValueContainer>
        );
    };

    return (
        <div className={clsx(styles.container)}>
            <label>Your skills:</label>

            <div className={clsx(styles.tags)}>
                {selectedSkills.map((skill) => (
                    <span key={skill.value} className={clsx(styles.tag)}>
                        {skill.label}
                        <button
                            type="button"
                            className={clsx(styles.removeBtn)}
                            onClick={() => handleRemove(skill.value)}
                        >
                            ×
                        </button>
                    </span>
                ))}
            </div>

            <Select
                isMulti
                options={groupedOptions}
                value={selectedSkills}
                onChange={() => setSelectedSkills}
                placeholder="Search skills..."
                components={{ ValueContainer: CustomValueContainer }}
                classNamePrefix="react-select"
            />
        </div>
    );
}

export default FilterSkills;
