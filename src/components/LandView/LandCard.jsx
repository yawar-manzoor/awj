import React, { memo } from 'react'
import AHC from '../../assets/AHCtext.svg'
import LandAssetsDetails from './LandAssetsDetails'
import TitleDeedCard from './LandTitleCard'

const LandCard = () => {
    return (
        <div className="px-9 landoverview rounded-t-3xl flex w-full">
            <div className="flex-1 py-9 flex justify-center items-center">
                <div className="w-[100px] h-[100px] md:w-[150px] md:h-[150px] lg:w-[200px] lg:h-[200px] rounded-lg p-6 flex justify-center items-center bg-[#cec6af]/50">
                    <img
                        src={AHC}
                        alt="Asset Logo"
                        className="w-full h-full object-contain"
                        loading="lazy"
                    />
                </div>
            </div>
            <div className={`flex-[4] 3xl:flex-[6] px-9 py-9`}>
                <LandAssetsDetails />
            </div>
            <div className="flex-[2] w-full relative">
                <div className="absolute right-0 left-0">
                    <TitleDeedCard />
                </div>
            </div>
        </div>
    )
}

export default memo(LandCard)
