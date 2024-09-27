import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'
import { baseURL } from '../../lib/global'
import {
    setEditable,
    setInitialLandAssetInfo,
} from '../../features/forms/formSlice'
import Button from '../ui/Button'

const SubmitSales = ({ refetch }) => {
    const dispatch = useDispatch()
    const location = useLocation()
    const landId = location.state?.landId || null
    const salesDetail = useSelector((state) => state.forms?.salesData)
    const salesDetailed =
        useSelector((state) => state.forms?.LandAssetInfo?.saleDetails) || {}
    const AssetInfo = useSelector((state) => state.forms?.LandAssetInfo) || {}
    console.log({ AssetInfo })
    const [error, setError] = useState(null)
    const [Emailerror, setEmailerror] = useState('')
    const handleApiError = (error, message) => {
        setError(message)
    }

    const submitAction = async () => {
        try {
            const response = await fetch(`${baseURL}Land/LandUpdateAction`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
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
        } catch (error) {
            handleApiError(error, errorData.responseException.exceptionMessage)
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
            console.error('Invalid email format')
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
            saleValue: salesDetailed.salesValue
                ? +salesDetailed.salesValue
                : null,
            saleDate: null,
            salesRepresentative: null,
            agentName: salesDetail.agentName,
            buyerId: Selectedbuyerid ? +Selectedbuyerid : null,
            paymentAmount: salesDetailed.paymentAmount
                ? +salesDetailed.paymentAmount
                : null,
            discount: salesDetailed.discount ? +salesDetailed.discount : null,
            vatAmount: salesDetailed.vat ? +salesDetailed.vat : null,
            paymentTerm: salesDetailed.paymentTerm ?? null,
            paymentStatus: salesDetail.paymentStatus,
            depositStatus: salesDetail.depositStatus,
            collectedStatus: salesDetail.collectedStatus,
            paymentDate: salesDetailed.paymentDate ?? null,
            buyerIdField: salesDetailed.buyerId ? salesDetailed.buyerId : null,
            buyerName: salesDetail.buyerName ?? null,
            email: salesDetail.buyerEmail ?? null,
            mobile: salesDetail.buyerMobile ?? null,
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
                headers: { 'Content-Type': 'application/json' },
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
                handleApiError(
                    error,
                    errorData.responseException.exceptionMessage
                )
                const data = await refetch()
                dispatch(setInitialLandAssetInfo(data?.data?.data))
                dispatch(setEditable(false))
            }
        } catch (error) {
            const errorData = await response.json()
            console.log(errorData.responseException.exceptionMessage)
            handleApiError(error, errorData.responseException.exceptionMessage)
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
