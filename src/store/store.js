import { configureStore } from '@reduxjs/toolkit'
import formReducer from '../features/forms/formSlice'
import breadcrumbReducer from '../features/breadcrumbSlice'

export const store = configureStore({
    reducer: {
        forms: formReducer,
        breadcrumb: breadcrumbReducer,
    },
})

export default store
