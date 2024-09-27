import { CheckCircle2Icon } from 'lucide-react'
import { Eye } from 'lucide-react'
import React from 'react'
import electronicParcelIcon from '../../assets/electronicParcelIcon.svg'

function TrackRequestDetails() {
    const demoArray = [0, 0, 0]
    return (
        <div className="py-8 w-full flex flex-col">
            <div className="flex space-x-4 mb-6 rounded-2xl px-8 py-10 bg-[#DFD9CA]/25">
                <div className="px-6 text-primary-600 flex flex-col justify-center items-center py-4 bg-primary-100  font-normal text-base rounded-lg">
                    Owner
                    <p className="text-primary-Main font-semibold text-base">
                        Saleh Alrobah
                    </p>
                </div>
                <div className="px-6 flex flex-col justify-center items-center py-4 bg-primary-100 text-primary-600 font-normal text-base rounded-lg">
                    Type
                    <p className="text-primary-Main font-semibold text-base">
                        3
                    </p>
                </div>
                <div className="px-6 flex flex-col justify-center items-center py-4 bg-primary-100 text-primary-600 font-normal text-base rounded-lg">
                    Business Plan
                    <p className="text-primary-Main font-semibold text-base">
                        22-08-2024
                    </p>
                </div>
                <div className="px-6 flex flex-col justify-center items-center py-4 bg-primary-100 font-normal text-base rounded-lg">
                    <p className="text-primary-600">Business Plan Details</p>
                    <p className="text-primary-Main font-semibold text-base">
                        Pending
                    </p>
                </div>
                {/* <div className="px-6 flex flex-col justify-center items-center py-4 bg-primary-100 text-primary-600 font-normal text-base rounded-lg">
                    Plot #{' '}
                    {isEditable ? (
                        <input
                            name="plotNumber"
                            value={details?.plotNumber}
                            onChange={handleInputChange}
                            placeholder="Enter Plot Number"
                            className="p-2 rounded border border-primary-400 outline-none"
                        />
                    ) : (
                        <p className="text-primary-Main font-semibold text-base">
                            {details?.plotNumber ? details?.plotNumber : 'NA'}
                        </p>
                    )}
                </div> */}
            </div>
            <div className="space-y-8">
                <div className="flex flex-col">
                    <h5 className="text-[#7B7B7B] font-normal text-base">
                        Split Reason
                    </h5>
                    <p className="text-[#655F5F] font-semibold text-base">
                        A title deed is a legal document that serves as evidence
                        of ownership of a property or land. It provides
                        adetailed description of the property and outlines the
                        rights and responsibilities of the owner.
                    </p>
                </div>
                <div className="flex">
                    <div className="flex flex-col ">
                        <div className="flex flex-col py-7">
                            <span className=" text-white text-[32px] font-semibold">
                                1
                            </span>
                            <span className=" text-white text-lg  font-semibold ">
                                2
                            </span>
                        </div>
                        <span className="rounded-s-lg bg-[#EFECE4]/50 text-[#837550] font-medium text-lg py-4 px-6">
                            TD Number
                        </span>
                        <span className=" rounded-s-lg text-[#837550] font-medium text-lg py-4 px-6">
                            TD Owner
                        </span>
                        <span className="rounded-s-lg bg-[#EFECE4]/50 text-[#837550] font-medium text-lg py-4 px-6">
                            TD Type
                        </span>
                        <span className=" rounded-s-lg text-[#837550] font-medium text-lg py-4 px-6">
                            TD Date
                        </span>
                        <span className="rounded-s-lg bg-[#EFECE4]/50 text-[#837550] font-medium text-lg py-4 px-6">
                            TD Status
                        </span>
                        <span className=" rounded-s-lg text-[#837550]/0 font-medium text-lg py-4 px-6">
                            View
                        </span>
                    </div>
                    {demoArray.map((item, index) => (
                        <div className={`flex flex-col flex-1 relative`}>
                            {index === 1 && (
                                <div className="absolute inset-0 border border-[#837550] rounded-xl"></div>
                            )}
                            <div className="flex flex-col py-7">
                                <span className=" text-center  text-[#837550] text-[32px] font-semibold">
                                    952.9 M<sup>2</sup>
                                </span>
                                <span className=" text-center  text-[#837550] text-lg  font-semibold ">
                                    RUH-RBWA-SB01-0001 3
                                </span>
                            </div>
                            <span
                                className={` text-center bg-[#EFECE4]/50 text-[#837550] font-medium text-lg py-4 px-6 ${
                                    demoArray.length === index + 1 &&
                                    'rounded-e-lg'
                                }`}
                            >
                                56211804898
                            </span>
                            <span className="  text-center text-[#837550] font-medium text-lg py-4 px-6">
                                AWJ Holding
                            </span>
                            <div
                                className={` flex items-center justify-center gap-2 bg-[#EFECE4]/50 text-[#837550] font-medium text-lg py-4 px-6 ${
                                    demoArray.length === index + 1 &&
                                    'rounded-e-lg'
                                }`}
                            >
                                <img
                                    src={electronicParcelIcon}
                                    alt="Electronic Parcel"
                                />
                                <span>Electronic Parcel</span>
                            </div>
                            <span className="  text-center text-[#837550] font-medium text-lg py-4 px-6">
                                14-08-2024
                            </span>
                            <div
                                className={`flex items-center justify-center gap-2 bg-[#EFECE4]/50 text-[#837550] font-medium text-lg py-4 px-6 ${
                                    demoArray.length === index + 1 &&
                                    'rounded-e-lg'
                                }`}
                            >
                                <CheckCircle2Icon className="text-[#299764]" />
                                <span className="text-[#299764]">Active</span>
                            </div>
                            <div className=" text-center  text-[#837550] font-medium text-lg py-4 px-6">
                                <button className="flex items-center justify-center gap-2 border border-dashed w-full py-2 rounded-lg bg-[#EFECE4]/50">
                                    <Eye className="stroke-[1px] size-10" />
                                    <span>View TD</span>
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default TrackRequestDetails
