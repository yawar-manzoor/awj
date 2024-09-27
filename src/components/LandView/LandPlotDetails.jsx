import { useDispatch, useSelector } from 'react-redux'
import {
    updateLandAssetInfo,
    updateLandOverView,
} from '../../features/forms/formSlice'

const LandPlotDetails = () => {
    const dispatch = useDispatch()
    const isEditable = useSelector((state) => state?.forms?.isEditable)
    const details = useSelector((state) => state?.forms?.LandAssetInfo)
    const titledeed = useSelector(
        (state) => state?.forms?.LandAssetInfo?.titleDeed
    )

    const handleInputChange = (e) => {
        const { name, value } = e.target
        dispatch(
            updateLandAssetInfo({
                [name]: value,
            })
        )
        dispatch(
            updateLandOverView({
                [name]: value,
            })
        )
    }

    return (
        <div className="flex space-x-4 mb-6 rounded-2xl px-8 py-10 bg-[#DFD9CA]/25">
            <div className="px-6 text-primary-600 flex flex-col justify-center items-center py-4 bg-primary-100  font-normal text-base rounded-lg">
                Owner
                <p className="text-primary-Main font-semibold text-base">
                    {titledeed?.owner}
                </p>
            </div>
            <div className="px-6 flex flex-col justify-center items-center py-4 bg-primary-100 text-primary-600 font-normal text-base rounded-lg">
                Type
                <p className="text-primary-Main font-semibold text-base">
                    {titledeed?.deedType}
                </p>
            </div>
            <div className="px-6 flex flex-col justify-center items-center py-4 bg-primary-100 text-primary-600 font-normal text-base rounded-lg">
                Business Plan
                <p className="text-primary-Main font-semibold text-base">
                    {details?.businessPlan}
                </p>
            </div>
            <div className="px-6 flex flex-col justify-center items-center py-4 bg-primary-100 font-normal text-base rounded-lg">
                <p className="text-primary-600">Business Plan Details</p>
                <p className="text-primary-Main font-semibold text-base">
                    {details?.businessPlanDetail}
                </p>
            </div>
            <div className="px-6 flex flex-col justify-center items-center py-4 bg-primary-100 text-primary-600 font-normal text-base rounded-lg">
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
            </div>
        </div>
    )
}

export default LandPlotDetails
