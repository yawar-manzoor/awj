import { createSlice } from '@reduxjs/toolkit'

const breadcrumbSlice = createSlice({
    name: 'breadcrumb',
    initialState: {
        breadcrumbRoutes: [],
    },
    reducers: {
        pushRoute(state, action) {
            state.breadcrumbRoutes = [...state.breadcrumbRoutes, action.payload]
        },
        clearState(state, action) {
            state.breadcrumbRoutes = []
        },
        popRoute(state, action) {
            state.breadcrumbRoutes.pop()
        },
    },
})

export const { pushRoute, clearState, popRoute } = breadcrumbSlice.actions
export default breadcrumbSlice.reducer
