import React, { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
    updateLandAssetInfo,
    updateLandOverView,
} from '../../features/forms/formSlice'
import { useStatusData } from '../../lib/Statusapi'
import { generateOptions } from '../../lib/options'
import { baseURL } from '../../lib/global'
import CustomSelect from '../ui/CustomDropdown'
import EditToggle from '../EditToggle'
import useFetchData from '../../lib/FetchData'
import tick from '../../assets/tick-circle.svg'
import {
    isRoleEditorApprover,
    isStatusDataNotSubmittedOrSentBack,
} from '../../lib/AcessCheck'

const AssetDetails = () => {
    const dispatch = useDispatch()
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const token = localStorage.getItem('token')
    const [openDropdown, setOpenDropdown] = useState(null)
    const { isEditable, activeTab, landAssetInfo } = useSelector((state) => ({
        isEditable: state?.forms?.isEditable,
        activeTab: state?.forms?.activeTab,
        landAssetInfo: state?.forms?.LandAssetInfo,
    }))
    const {
        assetName = '',
        subAssetName = '',
        businessPlan = '',
        city = '',
        cityId = '',
        district = '',
        area = '',
        referenceId = '',
        isWlt = '',
        isAreaEdited = 0,
        isDistrictEdited = 0,
        isSubAssetEdited = 0,
        isWLTStatusEdited = 0,
        isCityEdited = 0,
        isBusinessPlanEdited = 0,

        status = '',
    } = landAssetInfo
    const [cityID, setCityID] = useState(cityId || '')
    const highlightColor = '#487ADA'
    const defaultColor = 'text-neutral-700 text-base font-bold'

    const getTextClass = (isEdited) => {
        return status === 'Waiting for Approval' && isEdited === 1
            ? `text-[${highlightColor}] font-bold`
            : defaultColor
    }
    const { data: businessPlanData, isLoading: isLoadingBusinessPlan } =
        useStatusData('businessPlan', isEditable)

    const { data: subAssetsData, isLoading: isLoadingAssets } = useStatusData(
        'subasset',
        isEditable
    )
    const { data: citiesData, isLoading: isLoadingCities } = useFetchData(
        `${baseURL}Asset/GetAllCities`,
        token
    )

    const { data: districtsData, isLoading: isLoadingDistricts } = useFetchData(
        `${baseURL}Asset/GetDistrictsByCityId?cityId=${cityID}`,
        token
    )

    const subAssetsOptions = isEditable
        ? generateOptions(
              subAssetsData?.data,
              isLoadingAssets,
              'status',
              'status'
          )
        : []

    const cityOptions = generateOptions(
        citiesData?.data,
        isLoadingCities,
        'cityName',
        'cityName'
    )
    const districtOptions = generateOptions(
        districtsData?.data,
        isLoadingDistricts,
        'districtName',
        'districtName'
    )

    const handleInputChange = (e) => {
        const { name, value, type } = e.target
        const newValue =
            type === 'radio' && name === 'isWlt'
                ? value === 'Yes'
                    ? 'Yes'
                    : 'No'
                : value

        dispatch(updateLandAssetInfo({ [name]: newValue }))

        switch (name) {
            case 'city': {
                const selectedCity = citiesData?.data?.find(
                    (city) => city.cityName === value
                )
                if (selectedCity) {
                    setCityID(selectedCity.id)
                    dispatch(updateLandAssetInfo({ district: '' }))
                }
                break
            }
            case 'businessPlan': {
                const selectedBusinessPlan = businessPlanData?.data?.find(
                    (plan) => plan.status === value
                )
                if (selectedBusinessPlan) {
                    dispatch(
                        updateLandOverView({
                            businessPlanId: selectedBusinessPlan.id,
                        })
                    )
                }
                break
            }
            case 'area': {
                dispatch(updateLandOverView({ area: newValue }))
                break
            }
            case 'subAssetName': {
                const subAssetId = subAssetsData?.data?.find(
                    (subAsset) => subAsset.status === value
                )
                if (subAssetId) {
                    dispatch(updateLandOverView({ subAssetId: subAssetId.id }))
                }
                break
            }
            case 'district': {
                const district = districtsData?.data?.find(
                    (district) => district.districtName === value
                )
                if (district) {
                    dispatch(updateLandOverView({ districtId: district.id }))
                }
                break
            }
            case 'isWlt': {
                const wltStatus = newValue === 'Yes' ? 1 : 2
                dispatch(updateLandOverView({ wltStatus }))
                break
            }
            default:
                break
        }
    }

    const hasPermissionToEditAseetDetails =
        isEditable &&
        activeTab === 'landoverview' &&
        department === 'Land Bank' &&
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(landAssetInfo?.status)

    const ToShowEditButton =
        isRoleEditorApprover(roleName) &&
        isStatusDataNotSubmittedOrSentBack(landAssetInfo?.status)

    return (
        <div className="grid gap-2">
            <div className="flex justify-between">
                <h2 className="text-primary-Main pt-2 font-semibold text-[32px] leading-[38.4px]">
                    {referenceId}
                </h2>
                {ToShowEditButton ? <EditToggle /> : null}
            </div>
            <div>
                <p className="font-medium text-base flex gap-1">
                    <span className="text-neutral-600">Asset Name : </span>
                    <span className="text-primary-600 text-base font-bold">
                        {assetName}
                    </span>
                </p>
            </div>
            {hasPermissionToEditAseetDetails ? (
                <div className="grid gap-2 ">
                    <div className="font-medium text-base flex gap-1 justify-center items-center">
                        <span className="text-neutral-600 whitespace-nowrap ">
                            Sub Asset Name :
                        </span>
                        <CustomSelect
                            name="subAssetName"
                            isEdited={isSubAssetEdited}
                            value={subAssetName}
                            onChange={handleInputChange}
                            label="subAssetName"
                            options={subAssetsOptions}
                            openDropdown={openDropdown}
                            setOpenDropdown={setOpenDropdown}
                        />
                    </div>
                    <div className="flex gap-3   flex-wrap ">
                        <div className="flex flex-col  z-10">
                            <label className="text-neutral-600 text-base font-normal">
                                Area
                            </label>
                            <input
                                placeholder="Type Area"
                                type="text"
                                name="area"
                                value={area}
                                onChange={handleInputChange}
                                className="border rounded-lg px-4 py-2 w-40 text-primary-500 outline-none  border-primary-400"
                            />
                        </div>

                        <div className="flex flex-col">
                            <label className="text-neutral-600 text-base font-normal">
                                City
                            </label>
                            <CustomSelect
                                name="city"
                                isEdited={isCityEdited}
                                value={city}
                                onChange={handleInputChange}
                                label="City"
                                options={cityOptions}
                                openDropdown={openDropdown}
                                setOpenDropdown={setOpenDropdown}
                            />
                        </div>
                        <div className="flex flex-col">
                            <label className="text-neutral-600 text-base font-normal">
                                District
                            </label>
                            <CustomSelect
                                name="district"
                                value={district}
                                isEdited={isDistrictEdited}
                                onChange={handleInputChange}
                                label="District"
                                options={districtOptions}
                                openDropdown={openDropdown}
                                setOpenDropdown={setOpenDropdown}
                            />
                        </div>
                        <div className="flex flex-col  gap-3">
                            <label className="text-neutral-600 text-base font-normal">
                                WLT Status
                            </label>

                            <div className="flex justify-center items-center space-x-4">
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="isWlt"
                                        value="Yes"
                                        checked={isWlt === 'Yes'}
                                        onChange={handleInputChange}
                                        className="text-primary-Main accent-primary-Main"
                                    />
                                    <span className="text-neutral-700 font-bold">
                                        Yes
                                    </span>
                                </label>
                                <label className="flex items-center space-x-2">
                                    <input
                                        type="radio"
                                        name="isWlt"
                                        value="No"
                                        checked={isWlt === 'No'}
                                        onChange={handleInputChange}
                                        className="text-primary-Main accent-primary-Main"
                                    />
                                    <span className="text-neutral-700 font-bold">
                                        No
                                    </span>
                                </label>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                <div>
                    <p className="font-medium text-base flex gap-1">
                        <span className="text-neutral-600">
                            Sub Asset Name :
                        </span>
                        <span
                            className={`${
                                isSubAssetEdited === 1 &&
                                status === 'Waiting for Approval'
                                    ? 'text-[#487ADA]'
                                    : 'text-primary-600'
                            } text-base font-bold`}
                        >
                            {subAssetName}
                        </span>
                    </p>
                    <div className="flex justify-between  mt-4 ">
                        <div className="flex flex-col">
                            <label className="text-neutral-400 text-base font-normal mb-1">
                                Business Plan
                            </label>
                            <span
                                className={getTextClass(isBusinessPlanEdited)}
                            >
                                {businessPlan}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-neutral-400 text-base font-normal mb-1">
                                City
                            </label>
                            <span className="text-neutral-700 font-semibold text-base">
                                {city}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-neutral-400 text-base font-normal mb-1">
                                District
                            </label>
                            <span className={getTextClass(isDistrictEdited)}>
                                {district}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-neutral-400 text-base font-normal mb-1">
                                WLT Status
                            </label>
                            <span className="text-neutral-700 font-semibold text-base">
                                {isWlt === 'Yes' ? (
                                    <>
                                        <span className="flex items-center text-success">
                                            <img
                                                src={tick}
                                                alt="tick"
                                                className="mr-2"
                                            />
                                            <span
                                                className={`${
                                                    isWLTStatusEdited === 1 &&
                                                    status ===
                                                        'Waiting for Approval'
                                                        ? 'text-[#487ADA]'
                                                        : 'text-success'
                                                }
                                                `}
                                            >
                                                Yes
                                            </span>
                                        </span>
                                    </>
                                ) : (
                                    <span>No</span>
                                )}
                            </span>
                        </div>
                        <div className="flex flex-col">
                            <label className="text-neutral-400 text-base font-normal mb-1">
                                Area
                            </label>
                            <span className={getTextClass(isAreaEdited)}>
                                {area && `${area} sqft`}
                            </span>
                        </div>
                        <div></div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AssetDetails
