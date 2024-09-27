import { useSelector } from 'react-redux'
import Label from '../ui/Label'

const TitleDeedCard = () => {
    const LandAssetInfo = useSelector((state) => state?.forms?.LandAssetInfo)
    const {
        idDeedStatusEdited,
        isOwnerEdited,
        isDeedTypeEdited,
        titleDeed,
        status,
    } = LandAssetInfo || {}

    const highlightColor = '#487ADA'
    const defaultColor = 'text-neutral-700 text-base font-semibold'

    const getTextClass = (isEdited) => {
        return status === 'Waiting for Approval' && isEdited === 1
            ? `text-[${highlightColor}] font-bold`
            : defaultColor
    }
    return (
        <div className={` px-6 py-4  w-full   grid gap-4  titlecard `}>
            <h2 className="text-lg font-bold text-neutral-600">Title Deed</h2>

            <div className="grid gap-2 ">
                <div className="flex flex-col justify-center gap-1">
                    <Label className="text-neutral-400 font-normal text-base">
                        Status
                    </Label>

                    <span
                        className={`${
                            idDeedStatusEdited === 1 &&
                            status === 'Waiting for Approval '
                                ? 'text-[#487ADA] '
                                : 'px-4 py-2 text-center bg-[#299764]/10 border border-success text-success rounded-lg font-bold text-sm'
                        } `}
                    >
                        {titleDeed?.deedStatus
                            ? titleDeed?.deedStatus?.toUpperCase()
                            : 'NA'}
                    </span>
                </div>

                <div className="flex flex-col justify-center gap-1">
                    <Label className="text-neutral-400 font-normal text-base">
                        Number
                    </Label>

                    <span className="text-neutral-700 text-base font-semibold">
                        {titleDeed?.deedNumber ? titleDeed?.deedNumber : 'NA'}
                    </span>
                </div>

                <div className="flex flex-col justify-center gap-1">
                    <Label className="text-neutral-400 font-normal text-base">
                        Owner
                    </Label>

                    <span className={getTextClass(isOwnerEdited)}>
                        {titleDeed?.owner ? titleDeed?.owner : 'NA'}
                    </span>
                </div>

                <div className="flex flex-col justify-center gap-1">
                    <Label className="text-neutral-400 font-normal text-base">
                        Type
                    </Label>

                    <span className={getTextClass(isDeedTypeEdited)}>
                        {titleDeed?.deedType ? titleDeed?.deedType : 'NA'}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TitleDeedCard
