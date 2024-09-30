import { useSelector, useDispatch } from 'react-redux'
import axios from '../api/axios'
import {
    setEditable,
    setInitialLandAssetInfo,
} from '../features/forms/formSlice'

const token = localStorage.getItem('token')
const formatDate = (date) => {
    if (!date) return '2024-09-24'

    if (typeof date !== 'string') {
        console.error('Invalid date format:', date)
        return '2024-09-24'
    }

    const [month, day, year] = date.split('/')

    if (!month || !day || !year) {
        console.error('Incomplete date:', date)
        return '2024-09-24'
    }

    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

export const formatForAPI = async (
    whiteLandDetails,
    landassetinfo,
    dispatch
) => {
    console.log(landassetinfo, 'landassetinfo')
    if (whiteLandDetails.length === 0) return null

    const payloads = []

    whiteLandDetails.forEach((detail) => {
        const upsertWlt = detail.wltDetails.map((wltDetail) => ({
            wltId: wltDetail.wltId || null,
            tdId: wltDetail.tdId || null,
            landID: landassetinfo?.landId || null,
            duration: null,
            wltPhase: wltDetail.wltPhase || null,
            masterPlanNoID: wltDetail.masterPlanNoID || null,
            statusOfSubTitleDeedID: wltDetail.statusOfSubTitleDeedID || null,
            invoiceNumber: wltDetail.invoiceNumber || null,
            notificationDate: formatDate(wltDetail.notificationDate),
            tdOwnerID: wltDetail.tdOwnerID || null,
            ownershipPercentage: null,
            wltOrderNo: wltDetail.wltOrderNo || null,
            amount: wltDetail.amount || null,
            sadadNo: wltDetail.sadadNo || null,
            objDeadline: formatDate(wltDetail.objDeadline),
            paymentDeadline: formatDate(wltDetail.paymentDeadline),
            dueDate: formatDate(wltDetail.dueDate),
            paymentStatus: (() => {
                if (wltDetail.objStatus === 'Accepted') return 1
                if (wltDetail.objStatus === 'Rejected') return 2
                if (wltDetail.objStatus === 'NA') return null
                return null
            })(),
            note: wltDetail.note || null,
            objDescription: wltDetail.objDescription || null,
            caseNumberBeforeTheBoardOfGrievances:
                wltDetail.caseNumberBeforeTheBoardOfGrievances || null,
            objectionNumber: wltDetail.objectionNumber || null,
            circle: wltDetail.circle || null,
            dateOfSubmissionOfTheObjection: formatDate(
                wltDetail.dateOfSubmissionOfTheObjection
            ),
            hearingTime: formatDate(wltDetail.hearingTime),

            objStatus: (() => {
                const statusValue = (() => {
                    console.log('Current objStatus:', wltDetail.objStatus)
                    if (wltDetail.objStatus === 'Accepted') return 1
                    if (wltDetail.objStatus === 'Rejected') return 2
                    if (wltDetail.objStatus === 'NA') return null
                    return null
                })()
                console.log('Assigned objStatus:', statusValue)
                return statusValue
            })(),
        }))

        const payload = {
            duration: null,
            upsertWlt: upsertWlt,
        }

        payloads.push(payload)
    })

    try {
        const response = await axios.post('/Land/UpsertLandWLT', payloads, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
        })
        console.log('API Response:', response.data)

        // dispatch(setInitialLandAssetInfo(response))
        // console.log(response.data.data, 'after refetch')
        dispatch(setEditable(true))
    } catch (error) {
        console.error('API Error:', error)
        throw error
    }
}
