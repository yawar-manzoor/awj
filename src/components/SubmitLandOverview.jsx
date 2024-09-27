import { useSelector, useDispatch } from 'react-redux'
import {
    setEditable,
    setInitialLandAssetInfo,
} from '../features/forms/formSlice'
import { useLocation } from 'react-router-dom'
import { useState } from 'react'
import { baseURL } from '../lib/global'
import Button from './ui/Button'
import PulseLoader from 'react-spinners/PulseLoader'

const SubmitButton = ({ refetch }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const { landId } = location?.state || {}
    const [isLoading, setIsLoading] = useState(false)
    const { isEditable, LandOverView, AssetInfo } = useSelector((state) => ({
        isEditable: state?.forms?.isEditable,
        AssetInfo: state?.forms?.LandAssetInfo,
        LandOverView: state?.forms?.LandOverView,
    }))

    const handleSubmit = async () => {
        const payload = {
            landId,
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
            landInformation: AssetInfo.landInformation,
            location: LandOverView.location,
            mapUrl: LandOverView.mapUrl,
            masterPlan: LandOverView?.masterPlan,
            infraApproval: LandOverView?.infraApproval,
            infraContraction: LandOverView?.infraContraction,
            munHandingOver: LandOverView.munHandingOver,
        }

        try {
            setIsLoading(true)

            // First API Call: UpdateLandOverview
            const response = await fetch(`${baseURL}Land/UpdateLandOverview`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                // Second API Call: LandUpdateAction
                const actionPayload = {
                    landId: landId,
                    action: 3, // Example action value
                }

                const secondResponse = await fetch(
                    `${baseURL}Land/LandUpdateAction`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(actionPayload),
                    }
                )

                if (secondResponse.ok) {
                    // Refetch data and update state after both API calls are successful
                    const data = await refetch()
                    dispatch(setInitialLandAssetInfo(data?.data.data))
                    console.log(data.data.data, 'after refetch')
                    dispatch(setEditable(!isEditable))
                } else {
                    console.error(
                        'Error in LandUpdateAction:',
                        secondResponse.statusText
                    )
                }
            } else {
                console.error(
                    'Error updating land overview:',
                    response.statusText
                )
            }
        } catch (error) {
            console.error('Error:', error.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Button
            onClick={handleSubmit}
            className="border font-bold  text-base rounded-lg px-6 py-3 bg-primary-Main text-white"
        >
            {isLoading ? <PulseLoader /> : 'Submit'}
        </Button>
    )
}

export default SubmitButton
