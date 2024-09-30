import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'
import { baseURL } from '../../lib/global'
import {
    setEditable,
    setInitialLandAssetInfo,
} from '../../features/forms/formSlice'
import Button from '../ui/Button'

const SubmitSales = ({ refetch }) => {
    const roleName = localStorage.getItem('roleName')
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const location = useLocation()
    const landId = location.state?.landId || null
    const salesDetail = useSelector((state) => state.forms?.salesData)
    const salesDetailed =
        useSelector((state) => state.forms?.LandAssetInfo?.saleDetails) || {}
    const AssetInfo = useSelector((state) => state.forms?.LandAssetInfo) || {}
    const actionAssetId =
        useSelector((state) => state.forms.LandAssetInfo.assetId) || {}

    const [error, setError] = useState(null)
    const [Emailerror, setEmailerror] = useState('')
    const handleApiError = (error, message) => {
        setError('Failed to submit')
    }
    const token = localStorage.getItem('token')

    const submitAction = async () => {
        try {
            const response = await fetch(`${baseURL}Land/LandUpdateAction`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ landId, action: 3 }),
            })

            if (!response.ok) {
                const errorData = await response.json()
                console.log({ errorData })
                handleApiError(
                    error,
                    errorData.responseException.exceptionMessage
                )
            }

            if (roleName === 'Approver') {
                navigate('/approver-analytics', { state: { actionAssetId } })
            } else if (roleName === 'Editor') {
                navigate('/analytics', { state: { actionAssetId } })
            } else {
                navigate('/landbank')
            }
        } catch (error) {
            handleApiError(error, error?.responseException?.exceptionMessage)
            throw error
        } finally {
            dispatch(setEditable(false))
        }
    }

    const handleSubmitSales = async () => {
        const Selectedbuyerid = localStorage.getItem('buyerId')
        const email = salesDetail?.buyerEmail
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

        if (email && !emailPattern.test(email)) {
            setEmailerror('Please enter a valid email address.')
            return
        }
        const payload = {
            landId,
            referenceNumber: salesDetail.referenceNumber ?? null,
            salesMethodId: salesDetail.salesMethodId,
            salesStatusId: salesDetail.salesStatusId,
            commission: salesDetailed.commission
                ? +salesDetailed.commission
                : null,
            saleValue: salesDetail.salesValue ? +salesDetail.salesValue : null,
            saleDate: null,
            salesRepresentative: null,
            agentName: salesDetail.agentNameId ?? null,
            buyerId: Selectedbuyerid ? +Selectedbuyerid : null,
            paymentAmount: salesDetail.paymentAmount
                ? +salesDetail.paymentAmount
                : null,
            discount: salesDetail.discount ? +salesDetail.discount : null,
            vatAmount: salesDetail.vat ? +salesDetail.vat : null,
            paymentTerm: salesDetail.paymentTerm ?? null,
            paymentStatus: salesDetail.paymentStatus,
            depositStatus: salesDetail.depositStatus,
            collectedStatus: salesDetail.collectedStatus,
            paymentDate: salesDetail.paymentDate
                ? salesDetail.paymentDate
                : null,
            buyerIdField: salesDetail.buyerId ? salesDetail.buyerId : null,
            buyerName: salesDetail.buyerName ?? null,
            buyerEmail: salesDetail.email ?? null,
            buyerMobile: salesDetail.mobile ?? null,
            companyId: salesDetail.companyId ?? null,
            reetNumber: salesDetail.reetNumber,
            reetDate: salesDetail.reetDate,
            reetAmount: salesDetail.reetAmount ? +salesDetail.reetAmount : null,
            reetStatusId: salesDetail.reetStatusId,
            collaction: null,
        }

        console.log({ payload }, 'in submit')

        try {
            const response = await fetch(`${baseURL}Sales/UpsertSale`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(payload),
            })
            if (response.ok) {
                submitAction()
                const data = await refetch()
                dispatch(setInitialLandAssetInfo(data?.data?.data))
                dispatch(setEditable(false))
            }
            if (!response.ok) {
                const errorData = await response.json()
                handleApiError(error, '')
                const data = await refetch()
                dispatch(setInitialLandAssetInfo(data?.data?.data))
                dispatch(setEditable(false))
            }
        } catch (error) {
            const errorData = await response.json()
            handleApiError(error, '')
        } finally {
            const data = await refetch()
            dispatch(setInitialLandAssetInfo(data?.data?.data))
            dispatch(setEditable(false))
            localStorage.removeItem('buyerId')
        }
    }

    return (
        <div className="flex flex-col gap-4 justify-items-end items-center">
            <Button
                className="border mt-4 bg-primary-Main px-6 py-3 text-white text-base font-semibold rounded-lg"
                onClick={handleSubmitSales}
            >
                Submit
            </Button>
            {error && (
                <div className="mt-4 text-red-600 font-semibold">{error}</div>
            )}
            {Emailerror && (
                <div className="mt-4 text-red-600 font-semibold">
                    {Emailerror}
                </div>
            )}
        </div>
    )
}

export default SubmitSales
