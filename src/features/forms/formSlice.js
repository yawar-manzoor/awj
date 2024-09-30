import { createSlice } from '@reduxjs/toolkit'

const formSlice = createSlice({
    name: 'forms',
    initialState: {
        isEditable: false,
        LandAssetInfo: {},
        refetch: false,
        activeTab: 'landoverview',
        salesData: {
            landId: null,
            referenceNumber: null,
            salesMethodId: null,
            salesStatusId: null,
            commission: null,
            salesValue: null,
            saleDate: null,
            salesRepresentative: null,
            agentNameId: null,
            buyerId: null,
            paymentAmount: null,
            discount: null,
            vatAmount: null,
            paymentTerms: null,
            paymentStatus: null,
            paymentDate: null,
            collectedStatus: null,
            depositStatus: null,
            paymentDate: null,
            collaction: null,
            id: null,
            buyerIdField: null,
            buyerName: null,
            email: null,
            mobile: null,
            companyId: null,
            reetNumber: null,
            reetDate: null,
            reetAmount: null,
            reetStatusId: null,
        },
        LandOverView: {
            landId: null,
            subAssetId: null,
            districtId: null,
            area: null,
            businessPlanId: null,
            businessPlanStatusId: null,
            businessPlanDetailedId: null,
            landStatusId: null,
            landUseId: null,
            landTypeId: null,
            wltStatus: null,
            plotNumber: null,
            landInformation: '',
            location: null,
            mapUrl: '',
            masterPlan: null,
            infraApproval: null,
            infraContraction: null,
            munHandingOver: null,
        },
    },
    reducers: {
        setActiveTab(state, action) {
            state.activeTab = action.payload
        },
        setEditable(state, action) {
            state.isEditable = action.payload
        },
        setInitialLandAssetInfo(state, action) {
            state.LandAssetInfo = action.payload || {}
        },
        updateLandAssetInfo(state, action) {
            state.LandAssetInfo = {
                ...state.LandAssetInfo,
                ...action.payload,
            }
        },
        updateLandOverView(state, action) {
            state.LandOverView = {
                ...state.LandOverView,
                ...action.payload,
            }
        },
        updateSalesData(state, action) {
            state.salesData = {
                ...state.salesData,
                ...action.payload,
            }
        },
        updateBuyerData(state, action) {
            state.buyerData = {
                ...state.buyerData,
                ...action.payload,
            }
        },
        refetchLandAssetInfo(state) {
            state.refetch = !state.refetch
        },
        clearLandData(state) {
            // state.LandAssetInfo = {}
            state.salesData = {
                landId: null,
                referenceNumber: null,
                salesMethodId: null,
                salesStatusId: null,
                commission: null,
                saleValue: null,
                saleDate: null,
                salesRepresentative: null,
                agentName: null,
                buyerId: null,
                paymentAmount: null,
                discount: null,
                vatAmount: null,
                paymentTerm: null,
                paymentStatus: null,
                collectedStatus: null,
                depositStatus: null,
                paymentDate: null,
                collaction: null,
            }
            state.buyerData = {
                id: null,
                buyerId: null,
                buyerName: null,
                buyerEmail: null,
                buyerMobile: null,
                companyId: null,
            }
        },
    },
})

export const {
    setEditable,
    setInitialLandAssetInfo,
    updateLandAssetInfo,
    updateLandOverView,
    updateSalesData,
    updateBuyerData,
    refetchLandAssetInfo,
    clearLandData,
    setActiveTab,
} = formSlice.actions

export default formSlice.reducer
