// src/utils/formatApi.js (or wherever you prefer to place this file)
import { useSelector } from 'react-redux'
import axios from '../api/axios'
// Import any utility functions you might be using
// Adjust the import path as necessary
const formatDate = (date) => {
    if (!date) return '2024-09-24' // Default date if no date is provided

    // Check if the date is a valid string before proceeding
    if (typeof date !== 'string') {
        console.error('Invalid date format:', date)
        return '2024-09-24' // Return default date or handle it accordingly
    }

    // Split the date string assuming the format is MM/DD/YYYY
    const [month, day, year] = date.split('/')

    // Check if all parts (month, day, year) are defined
    if (!month || !day || !year) {
        console.error('Incomplete date:', date)
        return '2024-09-24' // Return default date if the date is incomplete
    }

    // Return the formatted date in YYYY-MM-DD without any timezone shifts
    return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
}

// const landassetinfo = useSelector((state) => state?.forms?.LandAssetInfo)

// const landId = landassetinfo?.landID
// console.log(landId, 'aaaaaaaaaaaaaaaa')
export const formatForAPI = async (whiteLandDetails, landassetinfo) => {
    // Check if whiteLandDetails is not empty
    console.log(landassetinfo, 'landassetinfo')
    if (whiteLandDetails.length === 0) return null

    // Initialize an array to hold the formatted payloads
    const payloads = []

    // Iterate over each detail in whiteLandDetails
    whiteLandDetails.forEach((detail) => {
        // Build the upsertWlt array from the details for the current duration
        const upsertWlt = detail.wltDetails.map((wltDetail) => ({
            wltId: wltDetail.wltId || null,
            tdId: wltDetail.tdId || null,
            landID: landassetinfo?.landId || null,
            duration: detail.duration || null,
            wltPhase: wltDetail.wltPhase || null,
            masterPlanNoID: wltDetail.masterPlanNoID || null,
            statusOfSubTitleDeedID: wltDetail.statusOfSubTitleDeedID || null,
            invoiceNumber: wltDetail.invoiceNumber || null,
            notificationDate: formatDate(wltDetail.notificationDate),
            tdOwnerID: wltDetail.tdOwnerID || null,
            ownershipPercentage: wltDetail.ownershipPercentage || null,
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
                return null // Default to 0 for any other case
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

        // Construct the final payload for the current duration
        const payload = {
            duration: detail.duration || 'string',
            upsertWlt: upsertWlt,
        }

        payloads.push(payload)
    })

    try {
        // Send all payloads to the API
        const response = await axios.post('/Land/UpsertLandWLT', payloads)
        console.log('API Response:', response.data)
        return response.data
    } catch (error) {
        console.error('API Error:', error)
        throw error // Rethrow the error for further handling
    }
}
