import { useSelector, useDispatch } from 'react-redux'
import { setEditable } from '../features/forms/formSlice'

import Button from './ui/Button'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { baseURL } from '../lib/global'
const SubmitButton = () => {
    const dispatch = useDispatch()
    const AssetInfo = useSelector((state) => state.forms?.LandAssetInfo)
    const isEditable = useSelector((state) => state.forms?.isEditable)
    const LandOverView = useSelector((state) => state.forms?.LandOverView)
    const location = useLocation()
    const [Message, setMessage] = useState('')
    const { landId } = location?.state || {}
    const handleSubmit = async () => {
        if (AssetInfo) {
            const payload = {
                landId: landId,
                subAssetId: LandOverView.subAssetId,
                districtId: LandOverView.districtId,
                area: LandOverView?.area,
                businessPlanId: LandOverView.businessPlanId,
                businessPlanStatusId: LandOverView.businessPlanStatusId,
                businessPlanDetailedId: LandOverView.businessPlanDetailedId,
                landStatusId: LandOverView.landStatusId,
                landUseId: LandOverView.landUseId,
                landTypeId: LandOverView.landTypeId,
                wltStatus: LandOverView.wltStatus,
                plotNumber: LandOverView.plotNumber,
                landInfo: LandOverView.landInfo,
                location: LandOverView.location,
                mapUrl: LandOverView.mapUrl,
                masterPlan: LandOverView?.masterplan,
                infraApproval: LandOverView?.infraApproval,
                infraContraction: LandOverView?.infraContraction,
                munHandingOver: LandOverView.munHandingOver,
                deedStatus: LandOverView?.deedStatus,
                deedNumber: LandOverView?.deedNumber,
                deedDate: LandOverView.deedDate,
                deedOwner: LandOverView?.deedOwner,
                deedType: LandOverView?.deedType,
                deedUrl: LandOverView?.deedUrl,
                deedSequence: LandOverView?.deedSequence,
            }
            try {
                const response = await fetch(
                    `${baseURL}Land/UpdateLandOverview`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(payload),
                    }
                )

                const result = await response.json()
                dispatch(setEditable(!isEditable))
            } catch (error) {
                console.log(error.message)
            }

            console.log('in payload submitted', payload)
            dispatch(setEditable(!isEditable))
        }
    }

    return (
        <Button
            onClick={handleSubmit}
            className="border font-bold  text-base rounded-lg px-6 py-3 bg-primary-Main text-white"
        >
            Submit
        </Button>
    )
}

export default SubmitButton
