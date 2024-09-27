import { Circle, Dot } from 'lucide-react'
import React from 'react'
import splittingActionIcon from '../../assets/splittingActionIcon.svg'
import splittingLandDetailsIcon from '../../assets/splittingLandDetailsIcon.svg'
import splittingScissorIcon from '../../assets/splittingScissorIcon.svg'
import splittingDetailsIcon from '../../assets/splittingDetailsIcon.svg'
import splittingTDIcon from '../../assets/splittingTDIcon.svg'
import splittingTDIconWhite from '../../assets/splittingTDIconWhite.svg'
import splittingDetailsIconWhite from '../../assets/splittingDetailsIconWhite.svg'

function SplittingProgressTimeline({ currentStage, setCurrentStage }) {
    return (
        <>
            <div className="flex-1 flex ">
                <div className=" flex-[8] relative">
                    <div className="flex flex-col items-end  min-w-[150px] absolute -top-6 left-1/4">
                        <span className="font-bold text-base text-[#837550] whitespace-nowrap">
                            Action
                        </span>
                        <span className="text-base font-normal text-[#9E8D60] whitespace-nowrap">
                            Select New/Split
                        </span>
                    </div>
                </div>
                <div className="border-s border-[#9E8D60] flex-[2] relative ">
                    <Dot className="absolute -right-4 -top-4 size-8 text-[#9E8D60]" />
                    <div className="w-12 h-12 rounded-full bg-[#9E8D60] flex items-center justify-center absolute -top-6 -left-6">
                        <img src={splittingActionIcon} alt="icon" />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex ">
                <div className=" flex-[8] relative">
                    <div className="flex flex-col items-end  min-w-[150px] absolute -top-6 left-1/4">
                        <span className="font-bold text-base text-[#837550] whitespace-nowrap">
                            Land Details
                        </span>
                        <span className="text-base font-normal text-[#9E8D60] whitespace-nowrap">
                            Select land
                        </span>
                    </div>
                </div>
                <div className="border-s border-[#9E8D60] flex-[2] relative ">
                    <Dot className="absolute -right-4 -top-4 size-8 text-[#9E8D60]" />
                    <div className="w-12 h-12 rounded-full bg-[#9E8D60] flex items-center justify-center absolute -top-6 -left-6">
                        <img src={splittingLandDetailsIcon} alt="icon" />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex ">
                <div className="flex-[8] relative">
                    <div className="flex flex-col items-end  min-w-[150px] absolute -top-6 left-1/4">
                        <span className="font-bold text-base text-[#837550] whitespace-nowrap">
                            Splitting
                        </span>
                        <span className="text-base font-normal text-[#9E8D60] whitespace-nowrap">
                            Select Split Number
                        </span>
                    </div>
                </div>
                <div className="border-s border-[#9E8D60] flex-[2] relative ">
                    <Dot className="absolute -right-4 -top-4 size-8 text-[#9E8D60]" />
                    <div
                        onClick={() => setCurrentStage(1)}
                        className="w-12 h-12 rounded-full bg-[#9E8D60] flex items-center justify-center absolute -top-6 -left-6"
                    >
                        <img src={splittingScissorIcon} alt="icon" />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex ">
                <div className="flex-[8] relative">
                    <div className="flex flex-col items-end  min-w-[150px] absolute -top-6 left-1/4">
                        <span className="font-bold text-base text-[#837550] whitespace-nowrap">
                            Split Details
                        </span>
                        <span className="text-base font-normal text-[#9E8D60] whitespace-nowrap">
                            Area & Location
                        </span>
                    </div>
                </div>
                <div className="border-s border-[#9E8D60] flex-[2] relative ">
                    {currentStage >= 2 ? (
                        <Dot className="absolute -right-4 -top-4 size-8 text-[#9E8D60] " />
                    ) : (
                        <Circle className="absolute -right-1 -top-1  text-[#9E8D60] size-2 fill-white" />
                    )}
                    <div
                        onClick={() => setCurrentStage(2)}
                        className={`w-12 h-12 rounded-full ${
                            currentStage >= 2 ? 'bg-[#9E8D60]' : 'bg-[#EFECE4]'
                        } flex items-center justify-center absolute -top-6 -left-6`}
                    >
                        <img
                            src={
                                currentStage >= 2
                                    ? splittingDetailsIconWhite
                                    : splittingDetailsIcon
                            }
                            alt="icon"
                        />
                    </div>
                </div>
            </div>
            <div className="flex-1 flex ">
                <div className="flex-[8]  relative">
                    <div className="flex flex-col items-end  min-w-[150px] absolute -top-6 left-1/4">
                        <span className="font-bold text-base text-[#837550] whitespace-nowrap">
                            TD Details
                        </span>
                        <span className="text-base font-normal text-[#9E8D60] whitespace-nowrap">
                            Title Deed & Owner
                        </span>
                    </div>
                </div>
                <div className=" flex-[2] relative ">
                    {currentStage === 3 ? (
                        <Dot className="absolute -right-4 -top-4 size-8 text-[#9E8D60] " />
                    ) : (
                        <Circle className="absolute -right-1 -top-1  text-[#9E8D60] size-2 fill-white" />
                    )}
                    <div
                        onClick={() => setCurrentStage(3)}
                        className={`w-12 h-12 rounded-full ${
                            currentStage === 3 ? 'bg-[#9E8D60]' : 'bg-[#EFECE4]'
                        } flex items-center justify-center absolute -top-6 -left-6`}
                    >
                        <img
                            src={
                                currentStage === 3
                                    ? splittingTDIconWhite
                                    : splittingTDIcon
                            }
                            alt="icon"
                        />
                    </div>
                </div>
            </div>
        </>
    )
}

export default SplittingProgressTimeline
