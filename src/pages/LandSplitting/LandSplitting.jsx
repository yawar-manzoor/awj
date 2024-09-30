import React, { useState } from 'react'
import SplittingProgressTimeline from '../../components/LandSplitting/SplittingProgressTimeline'
import SplittingTitleDeedCard from '../../components/LandSplitting/SplittingTitleDeedCard'
import SplittingDetailsHeader from '../../components/LandSplitting/SplittingDetailsHeader'
import SplittingStage1 from '../../components/LandSplitting/SplittingStage1'
import SplittingStage2 from '../../components/LandSplitting/SplittingStage2'
import SplittingStage3 from '../../components/LandSplitting/SplittingStage3'
import AddLocationModal from '../../components/LandSplitting/AddLocationModal'
import FormSuccessModal from '../../components/LandSplitting/FormSuccessModal'
import TrackRequestDetails from '../../components/LandSplitting/TrackRequestDetails'

function LandSplitting() {
    const [currentStage, setCurrentStage] = useState(1)
    const [numberOfSplits, setNumberOfSplits] = useState(2)
    const [landArea, setLandArea] = useState(36259)
    const [showModal, setShowModal] = useState(false)
    const [showFormSuccessModal, setShowFormSuccessModal] = useState(false)
    const [showTrackRequestDetails, setShowTrackRequestDetails] =
        useState(false)
    const [newSplitDetailsList, setNewSplitDetailsList] = useState([])
    const hangleStageChange = (direction) => {
        if (direction === 'next' && currentStage < 4) {
            setCurrentStage(currentStage + 1)
        } else if (direction === 'back' && currentStage > 1) {
            setCurrentStage(currentStage - 1)
        }
    }
    const data = {
        assetId: 'RUH-RBWA-SB01-00012',
    }
    return (
        <div className="px-12 2xl:px-24 4xl:px-32 py-6">
            {showModal && (
                <AddLocationModal
                    showModal={showModal}
                    setShowModal={setShowModal}
                />
            )}
            {showFormSuccessModal && (
                <FormSuccessModal
                    showFormSuccessModal={showFormSuccessModal}
                    setShowFormSuccessModal={setShowFormSuccessModal}
                    setShowTrackRequestDetails={setShowTrackRequestDetails}
                />
            )}
            <div className="flex flex-col gap-8 bg-white px-[33px] py-[23px] rounded-2xl h-full">
                <header className="flex ">
                    <SplittingDetailsHeader assetId={data.assetId} />
                    <div className="flex-[3] relative ">
                        <SplittingTitleDeedCard />
                    </div>
                </header>
                <main className="flex-1 flex border-t-2 border-[#CEC6AF]">
                    {showTrackRequestDetails ? (
                        <TrackRequestDetails />
                    ) : (
                        <>
                            <div className="flex-[3] flex flex-col py-10 border-e min-w-[350px] max-h-[650px]">
                                <SplittingProgressTimeline
                                    setCurrentStage={setCurrentStage}
                                    currentStage={currentStage}
                                />
                            </div>
                            <div className="flex-[7] p-14">
                                {currentStage === 1 && (
                                    <SplittingStage1
                                        setNumberOfSplits={setNumberOfSplits}
                                        numberOfSplits={numberOfSplits}
                                    />
                                )}
                                {currentStage === 2 && (
                                    <SplittingStage2
                                        assetId={data.assetId}
                                        numberOfSplits={numberOfSplits}
                                        landArea={landArea}
                                        showModal={showModal}
                                        setShowModal={setShowModal}
                                        newSplitDetailsList={
                                            newSplitDetailsList
                                        }
                                        setNewSplitDetailsList={
                                            setNewSplitDetailsList
                                        }
                                    />
                                )}

                                {(currentStage === 3 || currentStage === 4) && (
                                    <SplittingStage3
                                        numberOfSplits={numberOfSplits}
                                        landArea={landArea}
                                        showModal={showModal}
                                        setShowModal={setShowModal}
                                    />
                                )}

                                <div className="flex items-center justify-between">
                                    <button
                                        onClick={() =>
                                            hangleStageChange('back')
                                        }
                                        className={`${
                                            currentStage === 1
                                                ? 'bg-[#837550]/50 '
                                                : 'bg-[#837550] '
                                        }bg-[#837550] text-white text-base font-bold rounded-lg py-3 px-10`}
                                    >
                                        Back
                                    </button>
                                    <button
                                        onClick={
                                            currentStage === 4
                                                ? () =>
                                                      setShowFormSuccessModal(
                                                          !showFormSuccessModal
                                                      )
                                                : () =>
                                                      hangleStageChange('next')
                                        }
                                        className={`bg-[#837550] text-white text-base font-bold rounded-lg py-3 px-10`}
                                    >
                                        {currentStage === 4 ? 'Submit' : 'Next'}
                                    </button>
                                </div>
                            </div>
                        </>
                    )}
                </main>
            </div>
        </div>
    )
}

export default LandSplitting
