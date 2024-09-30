import { useSelector, useDispatch } from 'react-redux'
import {
    setEditable,
    setInitialLandAssetInfo,
} from '../features/forms/formSlice'
import { useLocation, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { baseURL } from '../lib/global'
import Button from './ui/Button'
import PulseLoader from 'react-spinners/PulseLoader'

const SubmitButton = ({ refetch }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const navigate = useNavigate()
    const roleName = localStorage.getItem('roleName')
    const { landId } = location?.state || {}
    const [isLoading, setIsLoading] = useState(false)
    const { isEditable, LandOverView, AssetInfo, actionAssetId } = useSelector(
        (state) => ({
            isEditable: state?.forms?.isEditable,
            AssetInfo: state?.forms?.LandAssetInfo,
            LandOverView: state?.forms?.LandOverView,
            actionAssetId: state.forms.LandAssetInfo.assetId,
        })
    )
    const token = localStorage.getItem('token')
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

            const response = await fetch(`${baseURL}Land/UpdateLandOverview`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })

            if (response.ok) {
                const actionPayload = {
                    landId: landId,
                    action: 3,
                }

                const secondResponse = await fetch(
                    `${baseURL}Land/LandUpdateAction`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            Authorization: `Bearer ${token}`,
                        },

                        body: JSON.stringify(actionPayload),
                    }
                )

                if (secondResponse.ok) {
                    const data = await refetch()
                    dispatch(setInitialLandAssetInfo(data?.data.data))
                    console.log(data.data.data, 'after refetch')
                    dispatch(setEditable(!isEditable))

                    if (roleName === 'Approver') {
                        navigate('/approver-analytics', {
                            state: { actionAssetId },
                        })
                    } else if (roleName === 'Editor') {
                        navigate('/analytics', { state: { actionAssetId } })
                    } else {
                        navigate('/landbank')
                    }
                    navigate('/landbank')
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
            {/* {isLoading ? <PulseLoader color="white" /> : 'Submit'} */}
            Submit
        </Button>
    )
}

export default SubmitButton
