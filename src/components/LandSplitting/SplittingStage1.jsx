import { PlusCircleIcon } from 'lucide-react'
import React from 'react'
import CheckCircleIcon from '../../assets/CheckCircleIcon.svg'

function SplittingStage1({ setNumberOfSplits, numberOfSplits }) {
    const maxNumberOfSplitsArray = [2, 3, 4, 5]
    return (
        <>
            <div className="flex flex-col gap-6 border-b border-[#EFECE4] pb-5">
                <h3 className="text-[26px] text-[#7A7474]">Splitting Land</h3>
                <p className="text-[#7B7B7B] font-normal text-base">
                    Splitting land, often referred to as land subdivision or
                    partitioning, involves dividing a single parcel of land into
                    smaller, distinct parcels. This process can be driven by
                    various factors, including personal, legal, commercial, or
                    developmental needs.
                </p>
            </div>
            <div className="py-5 space-y-8">
                <div className="flex justify-between">
                    {maxNumberOfSplitsArray.map((item) => (
                        <div
                            onClick={() => setNumberOfSplits(item)}
                            className={`relative w-[140px] h-[110px] rounded-lg border cursor-pointer ${
                                item === numberOfSplits
                                    ? ' border-[#9E8D60] '
                                    : ' '
                            } gap-1 flex flex-col items-center justify-center`}
                        >
                            {item === numberOfSplits && (
                                <img
                                    src={CheckCircleIcon}
                                    alt="CheckCircleIcon"
                                    className="absolute right-2 top-2"
                                />
                            )}
                            <span
                                className={`text-[32px] font-medium  ${
                                    item === numberOfSplits
                                        ? ' text-[#9E8D60] '
                                        : ' text-[#BEB395]'
                                }`}
                            >
                                {item}
                            </span>
                            <span
                                className={`text-base font-medium ${
                                    item === numberOfSplits
                                        ? ' text-[#9E8D60] '
                                        : ' text-[#BEB395]'
                                }`}
                            >
                                Splits
                            </span>
                        </div>
                    ))}

                    <div className="w-[140px] h-[110px] rounded-lg border gap-[14px] flex items-center justify-center">
                        <PlusCircleIcon className="text-[#BEB395] size-9 stroke-1" />
                    </div>
                </div>
                <div className="flex flex-col gap-2">
                    <h5 className="text-base text-[#7B7B7B] font-medium">
                        Reason for splitting
                    </h5>
                    <textarea
                        placeholder="Reason for splitting"
                        className="border border-[#BEB395] rounded-lg placeholder:text-[#AEA07A] text-base p-4 focus:outline-none"
                    />
                </div>
                {/* <div className="flex items-center justify-between">
                    <button className="bg-[#837550] text-white text-base font-bold rounded-lg py-3 px-10">
                        Back
                    </button>
                    <button className="bg-[#837550] text-white text-base font-bold rounded-lg py-3 px-10">
                        Next
                    </button>
                </div> */}
            </div>
        </>
    )
}

export default SplittingStage1
