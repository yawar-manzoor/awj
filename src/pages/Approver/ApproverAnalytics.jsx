import { useEffect, useState } from 'react'
import CloseIcon from '../../assets/AssetCardIcons/close-circle.svg'
import { useLocation, useNavigate } from 'react-router-dom'
import useFetchData from '../../lib/FetchData'
import { baseURL } from '../../lib/global'
import Loader from '../../components/ui/Loader'
import debounce from 'lodash.debounce'
import SelectCustom from '../../components/SelectCustom'
import SearchIcon from '../../assets/AssetCardIcons/SearchIcon.svg'
import Button from '../../components/ui/Button'
import TourPopUp from '../../components/TourPopup'
import Pagination from '../../components/Pagination'
import DashboardApr from '../../components/DashboardApr'
import RequestDetailsHeader from '../../components/RequestHeader'

// const sortOptions = [
//     // 'Price: Low to High',
//     // 'Price: High to Low',
//     // 'Newest First',
//     // 'Oldest First',
// ]
const options = [
    { label: '10', value: 10 },
    { label: '20', value: 20 },
    { label: '30', value: 30 },
]

const ApproverAnalytics = () => {
    const location = useLocation()
    const [role, setRole] = useState('')
    const navigate = useNavigate()
    useEffect(() => {
        setRole(localStorage.getItem('roleName'))
    }, [])

    const isApprover = role === 'Approver'
    const isEditor = role === 'Editor'
    const isViewer = role === 'Viewer'
    const {
        assetData: initialData,
        title,
        cityId,
        selectedCity,
        selectedDistrict,
    } = location.state || {}

    const [searchQuery, setSearchQuery] = useState('')
    const [selectedFilters, setSelectedFilters] = useState({
        asset: title ? { label: title, value: title } : null,
        city: cityId ? { label: initialData.cityName, value: cityId } : null,

        district: selectedDistrict
            ? { label: selectedDistrict.districtName, value: selectedDistrict }
            : null,

        owner: null,
        wltStatus: null,
        // landUse: null,
        businessPlan: null,
        sortBy: '',
    })
    const [dropdownStates, setDropdownStates] = useState({
        asset: false,
        city: false,
        district: false,
        owner: false,
        wltStatus: false,
        // landUse: false,
        businessPlan: false,
        sortBy: false,
    })
    const [selectedLandUse, setSelectedLandUse] = useState(null)
    const [isPopUpOpen, setIsPopUpOpen] = useState(false)
    const [currentPage, setCurrentPage] = useState(1)
    // const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(10)
    const [totalItems, setTotalItems] = useState(0)
    const [selectedOption, setSelectedOptions] = useState(options[0])
    const [isOpen, setIsOpen] = useState(false)
    const [landStageId, setLandStageId] = useState(null)

    // const roleName = localStorage.getItem('roleName')

    const handleNavigate = (landId) => {
        navigate(`/land-overview`, { state: { landId: landId } })
    }

    const handlePageSelect = (option) => {
        setItemsPerPage(option.value)
        setSelectedOptions(option)
        setIsOpen(false)
        setCurrentPage(1)
    }
    const params = new URLSearchParams()

    let assetId = initialData?.assetId

    if (selectedFilters?.asset?.value?.id) {
        assetId = selectedFilters.asset.value.id
    }

    if (assetId) {
        params.append('assetId', assetId)
    }

    if (selectedFilters?.city) {
        if (selectedFilters.city.value?.id) {
            params.append('cityId', selectedFilters.city.value.id)
        }
    } else if (cityId) {
        params.append('cityId', cityId)
    }

    if (selectedFilters?.district) {
        params.append('districtId', selectedFilters.district.value.id)
    }

    // if (selectedFilters?.asset) {
    //     params.append('assetId', selectedFilters?.asset?.value?.id)
    // }

    if (searchQuery) {
        params.append('searchText', searchQuery)
    }
    if (selectedFilters?.wltStatus) {
        params.append('IsWlt', selectedFilters?.wltStatus?.value.id)
    }
    if (selectedLandUse) {
        params.append('landUseId', selectedLandUse.id)
    }
    if (selectedFilters?.businessPlan) {
        params.append('businessPlanId', selectedFilters?.businessPlan?.value.id)
    }
    if (selectedFilters?.owner) {
        params.append('userId', selectedFilters?.owner?.value.id)
    }
    if (landStageId != null) {
        params.append('landStage', landStageId)
    }

    params.append('PageNo', currentPage)
    params.append('PageSize', itemsPerPage)

    // const apiUrlViewer = `${baseURL}Land/GetLandsByAssetIdForViewer?${params.toString()}`

    const apiUrlNonViewer = `${baseURL}Land/GetLandsByAssetId?${params.toString()}`

    const {
        data: assetsData,
        isError,
        isLoading,
    } = useFetchData(apiUrlNonViewer)
    const { data: assets } = useFetchData(`${baseURL}Asset/GetAllAssets`)
    const { data: cities } = useFetchData(`${baseURL}Asset/GetAllCities`)
    const { data: districts } = useFetchData(
        selectedFilters.city
            ? `${baseURL}Asset/GetDistrictsByCityId?cityId=${selectedFilters?.city?.value.id}`
            : null
    )
    const { data: landData } = useFetchData(
        `${baseURL}Asset/GetLandUses?statusType=landuse`
    )
    console.log(landData)

    const { data: wltStatusData } = useFetchData(
        `${baseURL}Asset/GetStatus?statusType=wltstatus`
    )
    const { data: ownerData } = useFetchData(
        `${baseURL}Asset/GetStatus?statusType=owner`
    )
    const { data: landCountData } = useFetchData(
        `${baseURL}Land/GetLandStatsCount?assetId=${assetId}`
    )

    // const handleSelect = (type, item) => {
    //     setSelectedFilters((prevFilters) => ({
    //         ...prevFilters,
    //         [type]: item ? { label: item.label, value: item } : null,
    //     }))
    //     toggleDropdown(type)
    // }
    const handleSelect = (type, item) => {
        setSelectedFilters((prevFilters) => ({
            ...prevFilters,
            [type]: item ? { label: item.label, value: item.value } : null,
        }))
        if (item) {
            toggleDropdown(type)
        }
    }

    const toggleDropdown = (type) => {
        setDropdownStates((prevStates) => {
            const newState = {}

            // Close all other dropdowns by setting them to false
            Object.keys(prevStates).forEach((key) => {
                newState[key] = key === type ? !prevStates[key] : false
            })

            return newState
        })
    }

    const debouncedHandleSearch = debounce((value) => {
        setSearchQuery(value)
    }, 100)

    const handleSearchAssets = (e) => {
        debouncedHandleSearch(e.target.value)
    }

    const clearAllFilters = () => {
        setSelectedFilters({
            asset: null,
            city: null,
            district: null,
            owner: null,
            wltStatus: null,
            // landUse: null,
            businessPlan: null,
            sortBy: null,
        })
        setDropdownStates({
            asset: false,
            city: false,
            district: false,
            owner: false,
            wltStatus: false,
            // landUse: false,
            businessPlan: false,
            sortBy: false,
        })

        setSelectedLandUse(null)
    }
    const handlePageChange = (pageNumber) => {
        if (
            pageNumber >= 1 &&
            pageNumber <= Math.ceil(totalItems / itemsPerPage)
        ) {
            setCurrentPage(pageNumber)
        }
    }

    useEffect(() => {
        if (
            assetsData?.totalCount !== undefined &&
            assetsData?.totalCount !== totalItems
        ) {
            setTotalItems(assetsData?.totalCount)
        }
    }, [
        assetsData?.totalCount,
        itemsPerPage,
        currentPage,
        landStageId,
        totalItems,
    ])

    const getStatusClass = (status) => {
        switch (status) {
            case 'Data Not Submitted':
                return 'text-[#F79708]'
            case 'Approved':
                return 'text-[#299764]'
            case 'Send Back':
                return 'text-[#F2440D]'
            case 'Waiting for Approval':
                return 'text-[#487ADA]'
            default:
                return ''
        }
    }
    return (
        <>
            <h1
                className={`text-primary-Main font-messiri font-bold text-[40px] leading-[48px] pt-4 ${
                    isViewer ? 'pb-5' : ''
                } pb-7 px-12 2xl:px-24`}
            >
                AWJ Land Bank Hub{' '}
                {(isApprover || isEditor) && '- Data Completion'}
            </h1>
            {isViewer && (
                <div className="justify-end flex 2xl:px-24 px-12 mb-4">
                    <Button
                        className="bg-primary-Main text-white font-semibold rounded-lg py-2 px-4"
                        translationKey="Take a Tour"
                        onClick={() => setIsPopUpOpen(!isPopUpOpen)}
                    />
                    {isPopUpOpen && <TourPopUp closePopUp={setIsPopUpOpen} />}
                </div>
            )}

            <div className="bg-white mx-12 2xl:mx-24 mb-6 rounded-2xl shadow-card ">
                <div className="grid 3xl:grid-cols-9 grid-cols-5 2xl:gap-5 gap-2 items-center px-8 py-6">
                    <div
                        className={`relative ${
                            isApprover || isEditor ? '2xl:col-span-2' : ''
                        }`}
                    >
                        <input
                            type="text"
                            value={searchQuery}
                            className={`border border-primary-input py-3  pr-10 rounded-[10px] px-2 placeholder-primary-Main 2xl:placeholder:text-sm focus:border-primary-200 focus:ring-0 focus:ring-primary-100 focus:ring-opacity-50 focus:outline-none w-full`}
                            placeholder="Search By Keyword"
                            onChange={handleSearchAssets}
                        />
                        <img
                            src={SearchIcon}
                            alt=""
                            loading="lazy"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 fill-primary-Main"
                        />
                    </div>

                    {/* Asset Dropdown */}
                    <SelectCustom
                        label="Asset"
                        isApprover={isApprover}
                        isEditor={isEditor}
                        placeholder="Asset"
                        selectedItem={selectedFilters.asset || null}
                        items={assets?.data?.map((item) => ({
                            label: item.assetName,
                            value: {
                                id: item.id,
                                assetName: item.assetName,
                            },
                        }))}
                        onSelect={(item) => handleSelect('asset', item)}
                        isOpen={dropdownStates.asset}
                        toggleDropdown={() => toggleDropdown('asset')}
                    />

                    {/* City Dropdown */}
                    <SelectCustom
                        label="City"
                        placeholder="City"
                        selectedItem={selectedFilters.city || null}
                        items={cities?.data.map((item) => ({
                            label: item.cityName,
                            value: {
                                id: item.id,
                                cityName: item.cityName,
                            },
                        }))}
                        onSelect={(item) => handleSelect('city', item)}
                        isOpen={dropdownStates.city}
                        toggleDropdown={() => toggleDropdown('city')}
                    />

                    {/* District Dropdown */}
                    <SelectCustom
                        label="District"
                        placeholder="District"
                        selectedItem={selectedFilters.district || null}
                        items={districts?.data.map((item) => ({
                            label: item.districtName,
                            value: {
                                id: item.id,
                                districtName: item.districtName,
                            },
                        }))}
                        onSelect={(item) => handleSelect('district', item)}
                        isOpen={dropdownStates.district}
                        toggleDropdown={() => toggleDropdown('district')}
                    />

                    {/* Owner Dropdown */}
                    <SelectCustom
                        label="Owner"
                        placeholder="Owner"
                        selectedItem={selectedFilters.owner || null}
                        items={ownerData?.data?.map((item) => ({
                            label: item.status,
                            value: item,
                        }))}
                        onSelect={(item) => handleSelect('owner', item)}
                        isOpen={dropdownStates.owner}
                        toggleDropdown={() => toggleDropdown('owner')}
                    />

                    {/* WLT Status Dropdown */}
                    <SelectCustom
                        label="WLT Status"
                        placeholder="WLT Status"
                        selectedItem={selectedFilters.wltStatus || null}
                        items={wltStatusData?.data?.map((item) => ({
                            label: item.status,
                            value: item,
                        }))}
                        onSelect={(item) => handleSelect('wltStatus', item)}
                        isOpen={dropdownStates.wltStatus}
                        toggleDropdown={() => toggleDropdown('wltStatus')}
                    />

                    {/* Land Use Dropdown */}
                    {/* <SelectCustom
                        label="Land Use"
                        placeholder="Land Use"
                        selectedItem={selectedFilters.landUse || null}
                        items={landData?.data?.map((item) => ({
                            label: item.status,
                            value: item,
                        }))}
                        onSelect={(item) => handleSelect('landUse', item)}
                        isOpen={dropdownStates.landUse}
                        toggleDropdown={() => toggleDropdown('landUse')}
                    /> */}

                    {/* Business Plan Dropdown */}

                    {/* Sort By Dropdown */}
                    {/* <SelectCustom
                        label="Sort By"
                        placeholder="Sort By"
                        selectedItem={selectedFilters.sortBy || null}
                        items={sortOptions?.data?.map((item) => ({
                            label: item.optionName,
                            value: item,
                        }))}
                        onSelect={(item) => handleSelect('sortBy', item)}
                        isOpen={dropdownStates.sortBy}
                        toggleDropdown={() => toggleDropdown('sortBy')}
                    /> */}
                </div>

                {/*  selected filters */}
                <div
                    className={` gap-[10px] px-8 ${
                        Object.values(selectedFilters).some((value) => value) ||
                        selectedLandUse
                            ? 'border-t  py-6 '
                            : ''
                    } flex flex-wrap border-primary-200`}
                >
                    {/* Asset Filter */}
                    {selectedFilters.asset && (
                        <div className="flex items-center bg-primary-100 rounded-lg px-4 py-2">
                            <span className=" flex flex-col pe-7  text-primary-Main">
                                <span className="text-xs">Asset</span>
                                <p className="font-semibold text-sm">
                                    {selectedFilters.asset.label}
                                </p>
                            </span>
                            <button
                                onClick={() => handleSelect('asset', null)}
                                className="ml-auto p-1"
                            >
                                <img
                                    src={CloseIcon}
                                    alt="close"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    )}
                    {/* City Filter */}
                    {selectedFilters.city && (
                        <div className="flex items-center bg-primary-100 rounded-lg px-4 py-2">
                            <span className=" flex flex-col pe-7 text-primary-Main">
                                <span className="text-xs">City</span>
                                <p className="font-semibold text-sm">
                                    {selectedFilters.city.label}
                                </p>
                            </span>
                            <button
                                onClick={() => handleSelect('city', null)}
                                className="ml-auto p-1"
                            >
                                <img
                                    src={CloseIcon}
                                    alt="close"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    )}
                    {/* District Filter */}
                    {selectedFilters.district && (
                        <div className="flex items-center bg-primary-100 rounded-lg px-4 py-2">
                            <span className=" flex flex-col pe-7 text-primary-Main">
                                <span className="text-xs">District</span>
                                <p className="font-semibold text-sm">
                                    {selectedFilters.district.label}
                                </p>
                            </span>
                            <button
                                onClick={() => handleSelect('district', null)}
                                className="ml-auto p-1"
                            >
                                <img
                                    src={CloseIcon}
                                    alt="close"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    )}
                    {/* Owner Filter */}
                    {selectedFilters.owner && (
                        <div className="flex items-center bg-primary-100 rounded-lg px-4 py-2">
                            <span className=" flex flex-col pe-7 text-primary-Main">
                                <span className="text-xs">Owner</span>
                                <p className="font-semibold text-sm">
                                    {selectedFilters.owner.label}
                                </p>
                            </span>
                            <button
                                onClick={() => handleSelect('owner', '')}
                                className="ml-auto p-1"
                            >
                                <img
                                    src={CloseIcon}
                                    alt="close"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    )}
                    {/* WLT Status Filter */}
                    {selectedFilters.wltStatus && (
                        <div className="flex items-center bg-primary-100 rounded-lg px-4 py-2">
                            <span className=" flex flex-col pe-7 text-primary-Main">
                                <span className="text-xs">WLT Status</span>
                                <p className="font-semibold text-sm">
                                    {selectedFilters.wltStatus.label}
                                </p>
                            </span>
                            <button
                                onClick={() => handleSelect('wltStatus', '')}
                                className="ml-auto p-1"
                            >
                                <img
                                    src={CloseIcon}
                                    alt="close"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    )}

                    {/* {selectedFilters.sortBy && (
                        <div className="flex items-center bg-primary-100 rounded-lg px-4 py-2">
                            <span className=" flex flex-col pe-7 text-primary-Main">
                                <span className="text-xs">Sort By</span>
                                <p className="font-semibold text-sm">
                                    {selectedFilters.sortBy.label}
                                </p>
                            </span>
                            <button
                                onClick={() => handleSelect('sortBy', '')}
                                className="ml-auto p-1"
                            >
                                <img
                                    src={CloseIcon}
                                    alt="close"
                                    className="w-6 h-6"
                                />
                            </button>
                        </div>
                    )} */}
                    {Object.values(selectedFilters).some((value) => value) ||
                    selectedLandUse ? (
                        <button
                            onClick={clearAllFilters}
                            className="bg-primary-Main text-white px-6 font-bold py-3 rounded-lg"
                        >
                            Clear All
                        </button>
                    ) : null}
                </div>
            </div>
            <div className="px-12 2xl:px-24 ">
                {isApprover && (
                    <DashboardApr
                        landCountData={landCountData}
                        handleLandStageId={setLandStageId}
                    />
                )}
                {isLoading ? (
                    <Loader />
                ) : isError ? (
                    <p className="text-center py-16 text-3xl text-neutral-50">
                        No Data Found!
                    </p>
                ) : (
                    <>
                        {assetsData?.data?.length > 0 ? (
                            <div className="mt-8  bg-white p-6 rounded-2xl">
                                <table
                                    className="table-auto w-full text-neutral-600  font-normal text-base"
                                    style={{
                                        borderSpacing: '0 10px',
                                        borderCollapse: 'separate',
                                    }}
                                >
                                    <thead className="py-5">
                                        <tr className="text-left ">
                                            <th className="border-primary-500 border-b whitespace-nowrap border-r px-6 py-5">
                                                ID
                                            </th>
                                            <th className="border-primary-500 border-b whitespace-nowrap border-r px-6 py-5">
                                                Refrence No
                                            </th>
                                            <th className="border-primary-500 border-b whitespace-nowrap border-r px-6 py-5">
                                                Asset Name
                                            </th>
                                            <th className="border-primary-500 border-b whitespace-nowrap border-r px-6 py-5">
                                                TD Number
                                            </th>
                                            <th className="border-primary-500 border-b whitespace-nowrap border-r px-6 py-5">
                                                Owner
                                            </th>
                                            <th className="border-primary-500 border-b whitespace-nowrap border-r px-6 py-5">
                                                Created Date
                                            </th>
                                            <th className="border-primary-500 border-b whitespace-nowrap  px-6 py-5">
                                                Status
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {assetsData.data.map((asset) => (
                                            <tr
                                                key={asset.assetId}
                                                className="bg-[#EFECE480] cursor-pointer"
                                                onClick={() =>
                                                    handleNavigate(asset.landId)
                                                }
                                            >
                                                <td className="border-primary-300 rounded-l-xl px-6 py-3">
                                                    {asset.landId}
                                                </td>
                                                <td className="border-primary-300 border-r px-6 py-3">
                                                    {asset.referenceNumber}
                                                </td>
                                                <td className="border-primary-300 border-r px-6 py-3">
                                                    {asset.assetName}
                                                </td>
                                                <td className="border-primary-300 border-r px-6 py-3">
                                                    {asset.tdNo}
                                                </td>
                                                <td className="border-primary-300 border-r px-6 py-3">
                                                    {asset.deedOwner}
                                                </td>
                                                <td className="border-primary-300 border-r px-6 py-3">
                                                    {asset.tdDate}
                                                </td>
                                                <td
                                                    className={`border-primary-300 px-6 whitespace-nowrap py-3 rounded-r-xl ${getStatusClass(
                                                        asset.status
                                                    )}`}
                                                >
                                                    <span
                                                        className={`w-3 h-3 mx-2 inline-block rounded-full ${
                                                            asset.status ===
                                                            'Data Not Submitted'
                                                                ? 'bg-[#F79708]'
                                                                : asset.status ===
                                                                  'Approved'
                                                                ? 'bg-[#299764]'
                                                                : asset.status ===
                                                                  'Send Back'
                                                                ? 'bg-[#F2440D]'
                                                                : asset.status ===
                                                                  'Waiting for Approval'
                                                                ? 'bg-[#487ADA]'
                                                                : ''
                                                        } `}
                                                    ></span>{' '}
                                                    {asset.status}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        ) : (
                            <div className="lg:col-span-3 md:col-span-2 col-span-1 flex justify-center items-center">
                                <p className="text-center py-16 text-3xl text-neutral-50">
                                    No Data Found!
                                </p>
                            </div>
                        )}
                    </>
                )}
                <div
                    className={`mt-6 flex ${
                        totalItems > 10 ? 'justify-between' : 'justify-end'
                    } `}
                >
                    {' '}
                    {totalItems > 10 && (
                        <div className="relative inline-block">
                            <span className="">Showing</span>
                            <button
                                type="button"
                                className="px-4 py-2 border border-[#DDD9C8]  relative rounded-[10px] mx-4  bg-white text-gray-800"
                                onClick={() => setIsOpen(!isOpen)}
                            >
                                {selectedOption?.label}
                                <svg
                                    className="w-4 h-4 ml-2 inline-block"
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M19 9l-7 7-7-7"
                                    />
                                </svg>

                                {isOpen && (
                                    <div className="absolute right-0 left-0 mt-4 w-full bg-white border border-gray-300 rounded-md shadow-lg">
                                        {options.map((option) => (
                                            <button
                                                key={option.value}
                                                className="block px-4 py-2 w-full text-left hover:bg-gray-100"
                                                onClick={() =>
                                                    handlePageSelect(option)
                                                }
                                            >
                                                {option.label}
                                            </button>
                                        ))}
                                    </div>
                                )}
                            </button>
                            <span> elements out of {totalItems}</span>
                        </div>
                    )}
                    <Pagination
                        currentPage={currentPage}
                        totalPages={Math.ceil(totalItems / itemsPerPage)}
                        onPageChange={handlePageChange}
                    />
                </div>
            </div>
        </>
    )
}

export default ApproverAnalytics
