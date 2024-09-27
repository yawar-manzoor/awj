import React from 'react'
import Button from '../ui/Button'
import { useState } from 'react'
import Modal from './AddLandModal'

const StepperButtons = ({ currentStage, onStageChange }) => {
    const [ShowModal, setShowModal] = useState()
    return (
        <div className="flex items-center justify-between">
            <Button
                onClick={() => onStageChange('back')}
                className={`${
                    currentStage === 1 ? 'bg-[#837550]/50 ' : 'bg-[#837550]'
                } text-white text-base font-bold rounded-lg py-3 px-10`}
                disabled={currentStage === 1}
            >
                Back
            </Button>

            {currentStage === 2 ? (
                <Button
                    onClick={() => {
                        // onStageChange('')
                        setShowModal(true)
                    }}
                    className="bg-[#837550] text-white text-base font-bold rounded-lg py-3 px-10"
                >
                    Submit
                </Button>
            ) : (
                <button
                    onClick={() => onStageChange('next')}
                    className="bg-[#837550] text-white text-base font-bold rounded-lg py-3 px-10"
                >
                    Next
                </button>
            )}
            {ShowModal && <Modal setShowModal={setShowModal} />}
        </div>
    )
}

export default StepperButtons
