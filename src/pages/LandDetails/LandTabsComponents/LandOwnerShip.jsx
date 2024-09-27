import React from 'react'
import OwnershipDetailsTable from '../../../components/OwnershipDetailsTable'
import Timeline from '../../../components/Timeline'
import { useSelector } from 'react-redux'

const LandOwnerShip = ({
    timelineContainerWidth,
    timelineContainerPadding,
    refetch,
}) => {
    return (
        <div className="space-y-12">
            <OwnershipDetailsTable refetch={refetch} />
            <Timeline
                parentWidth={timelineContainerWidth}
                parentPadding={timelineContainerPadding}
            />
        </div>
    )
}

export default LandOwnerShip
