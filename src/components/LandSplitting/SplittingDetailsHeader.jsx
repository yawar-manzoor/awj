import React from 'react'

function SplittingDetailsHeader({ assetId }) {
    return (
        <div className="flex-[7] flex flex-col gap-[18px] ">
            <div>
                <h3 className="text-[32px] font-semibold text-[#837550]">
                    {assetId}
                </h3>
            </div>
            <div>
                <p className="text-base font-bold text-[#9E8D60]">
                    <span className="font-medium text-base text-[#7A7474]">
                        Asset Name :
                    </span>{' '}
                    Plot 2 Amwaj Mall, Jarir Investment, Ikea
                </p>
                <p className="text-base font-bold text-[#9E8D60]">
                    <span className="font-medium text-base text-[#7A7474]">
                        Sub Asset name :
                    </span>{' '}
                    Sinaiyah-dry port( Ubai Bin Kaab (South railway Station) -
                    Sinaiyah 4 Plots )
                </p>
            </div>
            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-[#7b7b7b]">
                        Business Plan
                    </span>
                    <span className="text-[#655F5F] font-semibold text-base">
                        Sale
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-[#7b7b7b]">
                        City
                    </span>
                    <span className="text-[#655F5F] font-semibold text-base">
                        Riyadh
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-[#7b7b7b]">
                        District
                    </span>
                    <span className="text-[#655F5F] font-semibold text-base">
                        Jazirah
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-[#7b7b7b]">
                        WLT Status
                    </span>
                    <span className="text-[#655F5F] font-semibold text-base">
                        Yes
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-[#7b7b7b]">
                        Area
                    </span>
                    <span className="text-[#655F5F] font-semibold text-base">
                        36,259 M<sup>2</sup>
                    </span>
                </div>
            </div>
        </div>
    )
}

export default SplittingDetailsHeader
