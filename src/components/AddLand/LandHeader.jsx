import React from 'react'
function LandHeader() {
    return (
        <div className=" flex flex-col gap-[18px] ">
            <div>
                <h3 className="text-[32px] font-semibold text-primary-Main">
                    RUH-RBWA-SB01-00012
                </h3>
            </div>
            <div>
                <p className="text-base font-bold text-primary-600">
                    <span className="font-medium text-base text-neutral-600">
                        Asset Name :
                    </span>{' '}
                    haramain
                </p>
                <p className="text-base font-bold text-primary-600">
                    <span className="font-medium text-base text-neutral-600">
                        Sub Asset name :
                    </span>{' '}
                    Haramain-Zone 1
                </p>
            </div>
            <div className="flex items-center gap-36">
                <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-neutral-400">
                        City
                    </span>
                    <span className="text-neutral-700 font-semibold text-base">
                        Riyadh
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-neutral-400">
                        District
                    </span>
                    <span className="text-neutral-700 font-semibold text-base">
                        Jazirah
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-neutral-400">
                        WLT Status
                    </span>
                    <span className="text-neutral-700 font-semibold text-base">
                        Yes
                    </span>
                </div>
                <div className="flex flex-col gap-2">
                    <span className="text-base font-normal text-neutral-400">
                        Area
                    </span>
                    <span className="text-neutral-700 font-semibold text-base">
                        36,259 M<sup>2</sup>
                    </span>
                </div>
            </div>
        </div>
    )
}
export default LandHeader
