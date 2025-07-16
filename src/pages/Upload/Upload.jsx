import React, { useState } from 'react'
import { useSelector } from 'react-redux'

import Sidebar from './Sidebar/SideBar'
import StepDescription from './stages/StepDescription/StepDescription'
import StepPrice from './stages/StepPrice/StepPrice'
import StepProofs from './stages/StepProofs/StepProofs'
import StepSkills from './stages/StepSkills/StepSkills'
import StepSubmit from './stages/StepSubmit/StepSubmit'
import StepTitle from './stages/StepTitle/StepTitle'
import StepType from './stages/StepType/StepType'
import styles from './Upload.module.scss'

// ----- STEP DEFINITIONS -----
const steps = [
    { key: 'type', label: 'Type of Post' },
    { key: 'title', label: 'Title' },
    { key: 'skills', label: 'Skills' },
    { key: 'price', label: 'Price Range' },
    { key: 'description', label: 'Description' },
    // { key: 'media', label: 'Media Proof' },
    { key: 'submit', label: 'Submit' },
]

export default function Upload() {
    // ----- USER & FORM STATE -----
    const user = useSelector((state) => state.user.user)
    // State to manage submiting post
    const [formData, setFormData] = useState({
        type: '',
        title: '',
        author: {
            id: user.id,
            name: user.name,
        },
        rating: user.rating,
        skills: [],
        price: {
            min: 0,
            max: 0,
        },
        description: '',
        media: null,
    })
    const [currentStep, setCurrentStep] = useState(0)
    const [status, setStatus] = useState(null)

    // ----- STEP NAVIGATION -----
    const next = () => setCurrentStep((prev) => Math.min(prev + 1, steps.length - 1))
    const prev = () => setCurrentStep((prev) => Math.max(prev - 1, 0))
    const reset = () => {
        setCurrentStep(0)
        setFormData({})
        setStatus(null)
    }

    // ----- SHARED PROPS FOR STEPS -----
    const sharedProps = { formData, setFormData, next, prev, setStatus }

    // ----- STEP COMPONENTS -----
    const stepComponents = [
        <StepType {...sharedProps} />,
        <StepTitle {...sharedProps} />,
        <StepSkills {...sharedProps} />,
        <StepPrice {...sharedProps} />,
        <StepDescription {...sharedProps} />,
        // <StepProofs {...sharedProps} />,
        <StepSubmit {...sharedProps} status={status} reset={reset} />,
    ]

    // ----- RENDER -----
    return (
        <div className={styles['container']}>
            <div className={styles['sidebar']}>
                <Sidebar steps={steps} current={currentStep} status={status} />
            </div>
            <div className={styles['content']}>{stepComponents[currentStep]}</div>
        </div>
    )
}
