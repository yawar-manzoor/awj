import React, { memo } from 'react'
import AHC from '../../assets/AHCLogo.svg'
import LandAssetsDetails from './LandAssetsDetails'
import TitleDeedCard from './LandTitleCard'

const LandCard = () => {
    return (
        <div className="px-9 landoverview rounded-t-3xl flex w-full">
            <div className="flex-1 py-9">
                <img src={AHC} alt="Asset Logo" className="" loading="lazy" />
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
