import {
    CheckCircle2Icon,
    CheckCircleIcon,
    CheckIcon,
    MapPin,
} from 'lucide-react'

import React, { useState } from 'react'
import splittingLandDetailsIconDark from '../../assets/splittingLandDetailsIconDark.svg'
import DownloadIcon from '../../assets/download-icon.svg'

function SplittingStage3({
    numberOfSplits,
    landArea,
    showModal,
    setShowModal,
}) {
    const [currentSplit, setCurrentSplit] = useState(1)
    const numberOfSplitsList = Array(numberOfSplits).fill(0)
    return (
        <>
            <div className="flex flex-col gap-6 border-b border-[#EFECE4] pb-5">
                <h3 className="text-[26px] text-[#7A7474]">TD Details</h3>
                <p className="text-[#7B7B7B] font-normal text-base">
                    A title deed is a legal document that serves as evidence of
                    ownership of a property or land. It provides a detailed
                    description of the property and outlines the rights and
                    responsibilities of the owner.
                </p>
            </div>
            <div className="py-5 space-y-8 min-h-[250px] ">
                <div className="flex gap-6 ">
                    <div className="flex flex-1 gap-4 overflow-x-scroll max-w-[700px] hide-scrollbar">
                        {numberOfSplitsList.map((item, index) => (
                            <div
                                onClick={() => setCurrentSplit(index + 1)}
                                className={`relative flex-1 flex flex-col gap-5 bg-[#EFECE4] p-8 rounded-xl shrink-0 max-w-[288px] cursor-pointer ${
                                    currentSplit === index + 1
                                        ? 'border border-[#837550]'
                                        : ''
                                }`}
                            >
                                {currentSplit === index + 1 && (
                                    <div className="absolute h-5 w-5 flex items-center justify-center right-2 top-2 bg-[#837550] rounded-full">
                                        <CheckIcon className="text-white size-3 stroke-[3px]" />
                                    </div>
                                )}
                                <span className="text-lg text-[#837550] font-semibold whitespace-nowrap">
                                    RUH-RBWA-SB01-0001 3
                                </span>
                                <div className="flex border border-[#DDD9C8] bg-white rounded-lg overflow-x-hidden ">
                                    <div className="bg-[#EFECE4]  px-2 flex items-center justify-center">
                                        <img
                                            src={splittingLandDetailsIconDark}
                                            alt="splittingLandDetailsIconDark"
                                        />
                                    </div>
                                    <input
                                        className="bg-white py-4 px-2 max-w-[150px] focus:outline-none text-sm font-semibold text-[#837550] placeholder:text-[#837550]"
                                        type="text"
                                        placeholder="952.9 m2 "
                                        value={landArea / numberOfSplits}
                                    />
                                </div>
                                <button
                                    onClick={() => setShowModal(!showModal)}
                                    className="flex items-center justify-start gap-1 px-4 py-3 w-full rounded-lg bg-[##DFD9CA] border border-[#837550] text-[#837550] font-semibold text-lg"
                                >
                                    <MapPin />
                                    Add Location
                                </button>
                            </div>
                        ))}
                    </div>
                    <div className="">
                        <div className="w-[144px] bg-[#EFECE4] rounded-lg flex flex-col h-full ">
                            <div className="flex-1 flex flex-col items-center justify-center gap-5">
                                <img
                                    src={splittingLandDetailsIconDark}
                                    alt="splittingLandDetailsIconDark"
                                />
                                <span className="text-[#837550] text-lg font-semibold">
                                    36259 M<sup>2</sup>
                                </span>
                                <span className="text-center text-[#AEA07A] text-sm font-normal">
                                    “3” Lands
                                    <br />
                                    in same size
                                </span>
                            </div>
                            <div className="">
                                <button className="bg-[#837550] rounded-lg w-full py-[10px] text-white font-semibold text-base">
                                    Split Evenly
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="w-full space-y-3">
                    <h3 className="text-[26px] text-[#7A7474]">
                        Fill TD Details
                    </h3>
                    <form className="flex flex-col items-start gap-4">
                        <div className="flex flex-wrap justify-between gap-y-4">
                            <div className="flex ">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="tdNumber"
                                        className="text-[#7B7B7B] text-base font-medium"
                                    >
                                        TD Number
                                    </label>
                                    <input
                                        placeholder="TD Number"
                                        id="tdNumber"
                                        type="text"
                                        className="border border-[#BEB395] py-3 px-4 placeholder:text-[#AEA07A] placeholder:font-normal placeholder:text-base rounded-lg focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="tdOwner"
                                        className="text-[#7B7B7B] text-base font-medium"
                                    >
                                        TD Number
                                    </label>
                                    <input
                                        placeholder="TD Owner"
                                        id="tdOwner"
                                        type="text"
                                        className="border border-[#BEB395] py-3 px-4 placeholder:text-[#AEA07A] placeholder:font-normal placeholder:text-base rounded-lg focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="tdDate"
                                        className="text-[#7B7B7B] text-base font-medium"
                                    >
                                        TD Number
                                    </label>
                                    <input
                                        placeholder="TD Date"
                                        id="tdDate"
                                        type="text"
                                        className="border border-[#BEB395] py-3 px-4 placeholder:text-[#AEA07A] placeholder:font-normal placeholder:text-base rounded-lg focus:outline-none"
                                    />
                                </div>
                            </div>
                            <div className="flex flex-wrap">
                                <div className="flex flex-col">
                                    <label
                                        htmlFor="tdType"
                                        className="text-[#7B7B7B] text-base font-medium"
                                    >
                                        TD Number
                                    </label>
                                    <input
                                        placeholder="TD Type"
                                        id="tdType"
                                        type="text"
                                        className="border border-[#BEB395] py-3 px-4 placeholder:text-[#AEA07A] placeholder:font-normal placeholder:text-base rounded-lg focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="flex flex-col ">
                            <label
                                htmlFor="tdType"
                                className="text-[#7B7B7B] text-base font-medium"
                            >
                                Documents
                            </label>
                            <div className="relative py-3 border border-dashed border-[#BEB395] rounded-xl ">
                                <input
                                    placeholder="TD Type"
                                    id="tdType"
                                    type="file"
                                    className=" border-[#BEB395] py-3 px-4 placeholder:text-[#AEA07A] placeholder:font-normal placeholder:text-base rounded-xl focus:outline-none"
                                />
                                <div className="absolute w-full h-full inset-0 rounded-xl flex items-center justify-center gap-2 bg-[#EFECE4]">
                                    <img
                                        src={DownloadIcon}
                                        alt="DownloadIcon"
                                        className="w-16 rotate-180"
                                    />
                                    <div className="flex flex-col items-center justify-center gap-1">
                                        <p className="text-[#AEA07A] text-sm font-normal">
                                            Drag & drop files or{' '}
                                            <span className="text-[#837550]">
                                                Browse
                                            </span>
                                        </p>
                                        <p className="text-[#AEA07A] text-xs font-normal">
                                            Supported formates: JPEG, PNG, PDF
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default SplittingStage3
