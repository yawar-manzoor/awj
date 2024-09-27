import React from 'react'

function TimelineTooltip({
    tooltipIndex,
    isLastElement,
    owner,
    deedDate,
    deedNumber,
}) {
    return (
        <div
            className={`absolute flex  z-20 py-4 ${
                isLastElement ? '' : 'right-0 items-end'
            }  ${
                tooltipIndex % 2 === 0
                    ? 'bottom-10 flex-col-reverse'
                    : 'top-10 flex-col'
            }`}
        >
            <span className="text-[#837550] text-[16px] font-semibold whitespace-nowrap">
                {owner ? owner : 'NA'}
            </span>
            <span className="text-[#9E8D60] text-[16px] whitespace-nowrap  ">
                {deedDate?.split('-')[2]}
            </span>
            <div className="text-[#837550] text-sm whitespace-nowrap">
                <span className="text-[16px] text-[#7A7474]"> </span>
                <span>{deedNumber}</span>
            </div>
        </div>
    )
}

export default TimelineTooltip
