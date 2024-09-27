import { useState } from 'react'
import actionIcon from '../../assets/action-icon.svg'
import groupIcon from '../../assets/group-icon.svg'
import AddLandTDDetails from '../../components/AddLand/AddLandTDDetails'
import AddLandInfo from '../../components/AddLand/AddLandInfo'
import LandHeader from '../../components/AddLand/LandHeader'
import Stepper from '../../components/AddLand/Stepper'
import StepperButtons from '../../components/AddLand/StepperButtons'

const AddLand = () => {
    const [currentStage, setCurrentStage] = useState(1)
    const handleStageChange = (direction) => {
        if (direction === 'next' && currentStage < 3) {
            setCurrentStage(currentStage + 1)
        } else if (direction === 'back' && currentStage > 1) {
            setCurrentStage(currentStage - 1)
        }
    }
    const steps = [
        {
            title: 'Action',
            description: 'Add/Modify',
            icon: actionIcon,
            stage: 1,
        },
        {
            title: 'Land Details',
            description: 'Fill land info',
            icon: groupIcon,
            stage: 1,
        },
        {
            title: 'TD Details',
            description: 'Title Deed & Owner',
            label: 'TD',
            stage: 2,
        },
    ]

    return (
        <div className="space-y-6">
            <h1 className="text-[32px] font-semibold text-neutral-600 ">
                Add Land
            </h1>
            <div className="bg-white rounded-xl py-4 px-8">
                {currentStage === 2 && (
                    <div className="border-b pb-6 ">
                        <LandHeader />
                    </div>
                )}
                <div className="flex ">
                    <div className="flex-[2]">
                        <Stepper steps={steps} currentStage={currentStage} />
                    </div>
                    <div className="flex-[8]  space-y-4 p-6 ">
                        {currentStage === 1 && (
                            <AddLandInfo setCurrentStage={setCurrentStage} />
                        )}
                        {currentStage === 2 && (
                            <AddLandTDDetails
                                setCurrentStage={setCurrentStage}
                            />
                        )}
                        <div className="pt-6">
                            <StepperButtons
                                currentStage={currentStage}
                                onStageChange={handleStageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AddLand
