import React, { useEffect, useState, memo, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router-dom'
import {
    clearLandData,
    refetchLandAssetInfo,
    setActiveTab,
    setEditable,
} from '../features/forms/formSlice'
import Button from '../components/ui/Button'

const EditToggle = memo(() => {
    const dispatch = useDispatch()
    const location = useLocation()
    const isEditable = useSelector((state) => state.forms.isEditable)

    const toggleEditMode = useCallback(() => {
        dispatch(setEditable(!isEditable))
        dispatch(refetchLandAssetInfo())
        dispatch(dispatch(clearLandData()))
    }, [dispatch, isEditable])

    useEffect(() => {
        dispatch(setEditable(false))
        dispatch(setActiveTab('landoverview'))
    }, [location.pathname, dispatch])

    return (
        <Button
            onClick={toggleEditMode}
            className="bg-primary-Main border text-base font-bold rounded-lg px-6 py-3 text-white"
        >
            {isEditable ? 'Cancel' : 'Edit'}
        </Button>
    )
})

export default EditToggle
