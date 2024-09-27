import React from 'react'

function SplittingTitleDeedCard() {
    return (
        <div className="flex flex-col bg-[#F0F5F2] gap-4 px-8 py-4 rounded-b-[24px] absolute min-w-[288px] right-0 -top-6">
            <h4 className="test-lg font-bold text-[#7A7474]">Title Deed</h4>
            <div className="flex flex-col gap-2">
                <span className="text-base text-[#7B7B7B] font-normal">
                    Status
                </span>
                <button className="border border-[#299764] w-full rounded-lg py-2 text-sm font-bold bg-[#299764]/10 text-[#299764]">
                    ACTIVE
                </button>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-base text-[#7B7B7B] font-normal">
                    Number
                </span>
                <span className="text-[#655F5F] text-base font-semibold">
                    410118048038
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-base text-[#7B7B7B] font-normal">
                    Owner
                </span>
                <span className="text-[#655F5F] text-base font-semibold">
                    Azad Properties
                </span>
            </div>
            <div className="flex flex-col gap-2">
                <span className="text-base text-[#7B7B7B] font-normal">
                    Type
                </span>
                <span className="text-[#655F5F] text-base font-semibold">
                    Electronic Parcel
                </span>
            </div>
        </div>
    )
}

export default SplittingTitleDeedCard
