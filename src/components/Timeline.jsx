// import { useSelector } from 'react-redux'
// import TimelineTooltip from './TimelineTooltip'

// function Timeline({ parentWidth, parentPadding }) {
//     const initialOwnershipDetails = useSelector(
//         (state) => state?.forms?.LandAssetInfo?.ownerShipDetails
//     )
//     const landId = useSelector((state) => state?.forms?.LandAssetInfo?.landId)
//     console.log('land id ', landId)
//     console.log('initial owner ship ', initialOwnershipDetails)
//     let ownershipDetails = []
//     const isDummyElement = initialOwnershipDetails?.length === 1
//     if (initialOwnershipDetails?.length === 1) {
//         const dummyElement = initialOwnershipDetails[0]
//         ownershipDetails = [dummyElement, ...initialOwnershipDetails]
//     } else {
//         ownershipDetails = initialOwnershipDetails
//     }
//     const timeLineLength =
//         ownershipDetails?.length === 2
//             ? 1
//             : ownershipDetails?.length < 5 && ownershipDetails?.length > 2
//             ? ownershipDetails?.length - 1
//             : 5
//     console.log(timeLineLength)

//     return (
//         <div className="w-full h-96 flex flex-col items-center">
//             <h4 className="text-[28px] text-[#837550] font-semibold self-start">
//                 Ownership Transfer Timeline
//             </h4>
//             <div
//                 style={{ maxWidth: parentWidth - 2 * parentPadding }}
//                 className="relative w-full h-80  flex justify-center  overflow-x-scroll no-scrollbar px-10"
//             >
//                 {ownershipDetails?.map((item, index) => (
//                     <div
//                         key={index}
//                         style={{
//                             width:
//                                 index == ownershipDetails.length - 1
//                                     ? 0
//                                     : (parentWidth - 2 * parentPadding - 32) /
//                                       timeLineLength,
//                         }}
//                         className={`relative shrink-0`}
//                     >
//                         {index !== ownershipDetails.length - 1 && (
//                             <div
//                                 className={`absolute top-1/2 -translate-y-1/2 w-full h-[2px]  ${
//                                     index !== ownershipDetails.length - 2
//                                         ? ' bg-gradient-to-r from-[#837550] to-[#837550]/20 '
//                                         : ' bg-gradient-to-r from-[#299764] to-[#299764]/20 '
//                                 } z-10 `}
//                             ></div>
//                         )}
//                         <div
//                             className={`relative top-1/2 -translate-y-1/2 -left-2 z-20 h-4 w-4 rounded-full before:content-link  before:flex before:items-center before:justify-center  before:w-full before:full  before:absolute before:left-1/2 before:-translate-x-1/2  ${
//                                 index !== ownershipDetails.length - 1
//                                     ? 'bg-[#837550]'
//                                     : 'bg-[#299764]'
//                             } ${
//                                 index % 2 === 0
//                                     ? 'before:bottom-1/2 '
//                                     : 'before:top-1/2 before:rotate-180'
//                             } before:left-1/2 before:z-10 `}
//                         >
//                             <TimelineTooltip
//                                 tooltipIndex={index}
//                                 isLastElement={
//                                     index !== ownershipDetails.length - 1
//                                 }
//                                 owner={item?.owner}
//                                 deedDate={item?.deedDate}
//                                 deedNumber={item.deedNumber}
//                             />
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     )
// }

// export default Timeline
import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import TimelineTooltip from './TimelineTooltip'
import axios from '../api/axios'

function Timeline({ parentWidth, parentPadding }) {
    const initialOwnershipDetails = useSelector(
        (state) => state?.forms?.LandAssetInfo?.ownerShipDetails
    )
    const landId = useSelector((state) => state?.forms?.LandAssetInfo?.landId)
    const [ownershipDetails, setOwnershipDetails] = useState([])
    const isDummyElement = initialOwnershipDetails?.length === 1

    useEffect(() => {
        const fetchOwnershipDetails = async () => {
            try {
                const response = await axios.get(
                    `/Land/GetDeedTimelineValues?LandId=${landId}`,
                    {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem(
                                'token'
                            )}`,
                        },
                    }
                )
                const transformedData = response.data.data.map(
                    (item, index) => ({
                        titleDeedId: 6292 + index, // Adjust as needed
                        deedDate: item.deedDate,

                        deedStatus:
                            item.owner === 'Transferred'
                                ? item.owner
                                : 'Normal', // Modify based on your logic

                        deedNumber: item.deedNumber || 'N/A', // Fallback if deedNumber is undefined

                        owner: item.owner,
                    })
                )
                setOwnershipDetails(transformedData)
            } catch (error) {
                console.error('Error fetching ownership details:', error)
            }
        }

        if (landId) {
            fetchOwnershipDetails()
        }
    }, [landId])

    const timeLineLength =
        ownershipDetails.length === 2
            ? 1
            : ownershipDetails.length < 5 && ownershipDetails.length > 2
            ? ownershipDetails.length - 1
            : 5

    return (
        <div className="w-full h-96 flex flex-col items-center">
            <h4 className="text-[28px] text-[#837550] font-semibold self-start">
                Business Ownership Transfer Timeline
            </h4>
            <div
                style={{ maxWidth: parentWidth - 2 * parentPadding }}
                className="relative w-full h-80  flex justify-center  overflow-x-scroll no-scrollbar px-10"
            >
                {ownershipDetails?.map((item, index) => (
                    <div
                        key={index}
                        style={{
                            width:
                                index == ownershipDetails.length - 1
                                    ? 0
                                    : (parentWidth - 2 * parentPadding - 32) /
                                      timeLineLength,
                        }}
                        className={`relative shrink-0`}
                    >
                        {index !== ownershipDetails.length - 1 && (
                            <div
                                className={`absolute top-1/2 -translate-y-1/2 w-full h-[2px]  ${
                                    index !== ownershipDetails.length - 2
                                        ? ' bg-gradient-to-r from-[#837550] to-[#837550]/20 '
                                        : ' bg-gradient-to-r from-[#299764] to-[#299764]/20 '
                                } z-10 `}
                            ></div>
                        )}
                        <div
                            className={`relative top-1/2 -translate-y-1/2 -left-2 z-20 h-4 w-4 rounded-full before:content-link  before:flex before:items-center before:justify-center  before:w-full before:full  before:absolute before:left-1/2 before:-translate-x-1/2  ${
                                index !== ownershipDetails.length - 1
                                    ? 'bg-[#837550]'
                                    : 'bg-[#299764]'
                            } ${
                                index % 2 === 0
                                    ? 'before:bottom-1/2 '
                                    : 'before:top-1/2 before:rotate-180'
                            } before:left-1/2 before:z-10 `}
                        >
                            <TimelineTooltip
                                tooltipIndex={index}
                                isLastElement={
                                    index !== ownershipDetails.length - 1
                                }
                                owner={item?.owner}
                                deedDate={item?.deedDate}
                                deedNumber={item.deedNumber}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Timeline
