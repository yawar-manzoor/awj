import React from 'react'
import { useState, useRef } from 'react'
import chevron from '../../assets/chevron-down.svg'
import Plus from '../../assets/plus.svg'
import { PlusIcon } from 'lucide-react'
import CustomSelect from '../ui/CustomDropdown'
import { generateOptions } from '../../lib/options'
import { useStatusData } from '../../lib/Statusapi'
import useFetchData from '../../lib/FetchData'
import { baseURL } from '../../lib/global'

function AddLandInfo({ currentStage, setCurrentStage }) {
    const districtRef = useRef(null)

    // // Fields state
    const [assetName, setAssetName] = useState('')
    const [subAssetName, setSubAssetName] = useState('')
    const [refId, setRefId] = useState('')
    const [landDescription, setLandDescription] = useState('')
    const [valuationPrice, setValuationPrice] = useState('')
    const [area, setArea] = useState('')
    const [googleMapUrl, setGoogleMapUrl] = useState('')
    const [wltStatus, setWltStatus] = useState('')

    // // Validation state
    const [errors, setErrors] = useState({})

    // const validateFields = () => {
    //     let errors = {}

    //     // Validate all fields
    //     if (!assetName) errors.assetName = 'Asset Name is required'
    //     if (!subAssetName) errors.subAssetName = 'Sub Asset Name is required'
    //     if (!landDescription)
    //         errors.landDescription = 'Land Description is required'
    //     if (!valuationPrice || isNaN(valuationPrice))
    //         errors.valuationPrice = 'Valuation Price must be a valid number'
    //     if (!area || isNaN(area)) errors.area = 'Area must be a valid number'
    //     if (!selectedLand) errors.selectedLand = 'Land Type is required'
    //     if (!selectedLandUse) errors.selectedLandUse = 'Land Use is required'
    //     if (!selectedRegion) errors.selectedRegion = 'Region is required'
    //     if (!selectedCity) errors.selectedCity = 'City is required'
    //     if (!googleMapUrl || !googleMapUrl.startsWith('http'))
    //         errors.googleMapUrl = 'Google Map URL is required and must be valid'
    //     if (!wltStatus) errors.wltStatus = 'WLT Status is required'
    //     if (!selectedDistrict) errors.selectedDistrict = 'District is required'

    //     setErrors(errors)
    //     return Object.keys(errors).length === 0 // If no errors, return true
    // }

    const handleSubmit = () => {
        setCurrentStage(2)
        // If validation passes, log the form data
        if (validateFields()) {
            console.log('validdd')
            // setCurrentStage(2)

            // console.log({
            //     assetName,
            //     subAssetName,
            //     refId,
            //     landDescription,
            //     valuationPrice,
            //     area,
            //     selectedLand,
            //     selectedLandUse,
            //     selectedRegion,
            //     selectedCity,
            //     selectedDistrict,
            //     googleMapUrl,
            //     wltStatus,
            // })
        }
    }

    const { data: AssetsData, isLoading: isLoadingAssets } = useFetchData(
        `${baseURL}Asset/GetAllAssets`
    )
    const { data: subAssetsData, isLoading: isLoadingSubAssets } = useFetchData(
        `${baseURL}Asset/GetStatus?statusType=subasset`
    )
    const { data: LandUse, isLoading: isLoadingLandUse } = useFetchData(
        `${baseURL}Asset/GetStatus?statusType=landuse`
    )
    const { data: LandType, isLoading: isLoadingLandType } = useFetchData(
        `${baseURL}Asset/GetStatus?statusType=LandType`
    )
    const { data: Cities, isLoading: isLoadingCities } = useFetchData(
        `${baseURL}Asset/GetAllCities`
    )
    const AssetsOptions = generateOptions(
        AssetsData?.data,
        isLoadingAssets,
        'assetName',
        'assetName'
    )
    const subAssetsOptions = generateOptions(
        subAssetsData?.data,
        isLoadingAssets,
        'status',
        'status'
    )
    const LandTypeOptions = generateOptions(
        LandType?.data,
        isLoadingLandType,
        'status',
        'status'
    )
    const LandUseOptions = generateOptions(
        LandUse?.data,
        isLoadingLandUse,
        'status',
        'status'
    )
    const cityOptions = generateOptions(
        Cities?.data,
        isLoadingCities,
        'cityName',
        'cityName'
    )
    const handleInputchange = () => {
        console.log(e.target.value)
    }
    return (
        <>
            <div className="border-b py-6 mb-6 space-y-2">
                <h2 className="text-[26px] font-semibold text-neutral-600">
                    Land Information
                </h2>
                <p className="font-normal text-base text-neutral-400 max-w-lg ">
                    Fill the land information for further action requires
                    careful consideration you achieve your goals.
                </p>
            </div>
            {/* {1} */}
            <div className="grid grid-cols-6 grid-rows-1 gap-4">
                <div className="col-span-2 flex flex-col">
                    <span className="mb-2 text-base font-medium text-neutral-400">
                        Asset
                    </span>
                    <CustomSelect
                        name="AssetName"
                        value={subAssetName}
                        onChange={handleInputchange}
                        label="Asset"
                        options={AssetsOptions}
                    />
                </div>
                <div className="col-span-2 flex flex-col">
                    <span className="mb-2 text-neutral-400 text-base font-medium">
                        Sub Asset Name
                    </span>
                    <CustomSelect
                        name="subAssetName"
                        value={subAssetName}
                        onChange={handleInputchange}
                        label="SubAsset"
                        options={subAssetsOptions}
                    />
                </div>
                <div className="col-span-2 flex flex-col justify-start">
                    <span className="mb-2 text-neutral-400 text-base font-medium">
                        Ref ID
                    </span>
                    <input
                        type="text"
                        name="Ref ID"
                        placeholder="System Generate"
                        className="py-2 px-2 rounded-lg border border-primary-400 outline-none text-primary-Main placeholder:text-primary-500"
                    />
                </div>
            </div>
            {/* {2} */}
            <div className="flex flex-col mt-2">
                <span className="mb-2 text-neutral-400 text-base font-medium">
                    Land Description
                </span>
                <textarea
                    name="Land Description"
                    placeholder="Enter Land Description"
                    className={`p-3 rounded-lg border ${
                        errors.landDescription
                            ? 'border-red-500'
                            : 'border-primary-input'
                    } text-primary-Main bg-white placeholder:text-primary-500 placeholder:text-base placeholder:font-normal text-sm flex-grow resize-none focus:outline-none`}
                    rows="4"
                    value={landDescription}
                    onChange={(e) => setLandDescription(e.target.value)}
                ></textarea>
                {errors.landDescription && (
                    <p className="text-red-500 text-sm">
                        {errors.landDescription}
                    </p>
                )}
            </div>
            {/* {3} */}
            <div className="grid grid-cols-6 grid-rows-1 mt-2 gap-4">
                <div className="col-span-2 flex flex-col">
                    <span className="mb-2 text-neutral-400 text-base font-medium">
                        Area M2
                    </span>
                    <input
                        type="text"
                        name="Area in SQM"
                        placeholder="Enter Area"
                        className={`py-2 px-2 rounded-lg border outline-none ${
                            errors.area
                                ? 'border-red-500'
                                : 'border-primary-400'
                        } text-primary-Main placeholder:text-primary-500`}
                        value={area}
                        onChange={(e) => setArea(e.target.value)}
                    />
                    {errors.area && (
                        <p className="text-red-500 text-sm">{errors.area}</p>
                    )}
                </div>
                {/* ----LAND TYPE---- */}
                <div className="relative col-span-2 flex flex-col w-full">
                    <span className="mb-2 text-neutral-400 text-base font-medium">
                        Land Type
                    </span>
                    <CustomSelect
                        name="LandType"
                        value={subAssetName}
                        onChange={handleInputchange}
                        label="Land Type"
                        options={LandTypeOptions}
                    />
                </div>
                {/* ----LAND USE---- */}
                <div className="relative col-span-2 flex flex-col w-full">
                    <span className="mb-2 text-neutral-400 text-base font-medium">
                        Land Use
                    </span>
                    <CustomSelect
                        name="LandUse"
                        value={subAssetName}
                        onChange={handleInputchange}
                        label="Land Use"
                        options={LandUseOptions}
                    />
                </div>
            </div>
            {/* {4} */}
            <div className="grid grid-cols-6 grid-rows-1 mt-2 gap-4">
                {/* --REGION-- */}
                <div className="relative col-span-2 flex flex-col w-full">
                    <span className="mb-2 text-neutral-400 text-base font-medium">
                        Region
                    </span>
                    <CustomSelect
                        name="Region"
                        value={subAssetName}
                        onChange={handleInputchange}
                        label="Region"
                        options={subAssetsOptions}
                    />
                </div>
                {/* --CITY-- */}
                <div className="relative col-span-2 flex flex-col w-full">
                    <span className="mb-2 text-neutral-400 text-base font-medium">
                        City
                    </span>
                    <CustomSelect
                        name="City"
                        value={subAssetName}
                        onChange={handleInputchange}
                        label="City"
                        options={cityOptions}
                    />
                </div>

                {/* --DISTRICT-- */}
                <div className="relative col-span-2 flex flex-col w-full">
                    <span className="mb-2 text-neutral-400 text-base font-medium">
                        District
                    </span>
                    <CustomSelect
                        name="subAssetName"
                        value={subAssetName}
                        onChange={handleInputchange}
                        label="subAssetName"
                        options={subAssetsOptions}
                    />
                </div>
            </div>

            <div className="mt-4">
                {/* <button className="border font-bold text-base rounded-lg px-10 py-3 bg-primary-Main text-white">
                    Add <PlusIcon className="inline-block items-center ml-2" />
                </button> */}
                <p className="mt-2 text-neutral-400 text-base font-medium">
                    WLT Status
                </p>
                <div className="flex items-center mt-2 space-x-4 accent-primary-Main">
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="wltStatus"
                            value="active"
                            className="form-radio"
                            checked={wltStatus === 'active'}
                            onChange={() => setWltStatus('active')}
                        />
                        <span className="ml-2 text-neutral-600 text-base font-semibold">
                            Active
                        </span>
                    </label>
                    <label className="inline-flex items-center">
                        <input
                            type="radio"
                            name="wltStatus"
                            value="nonActive"
                            className="form-radio"
                            checked={wltStatus === 'nonActive'}
                            onChange={() => setWltStatus('nonActive')}
                        />
                        <span className="ml-2 text-neutral-600 text-base font-semibold">
                            In-Active
                        </span>
                    </label>
                </div>
                {errors.wltStatus && (
                    <p className="text-red-500 text-sm">{errors.wltStatus}</p>
                )}
            </div>
        </>
    )
}

export default AddLandInfo
