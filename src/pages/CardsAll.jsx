import { useEffect, useRef, useState } from 'react'
import chevron from '../assets/chevron-down.svg'
import useFetchData from '../lib/FetchData'
import { baseURL } from '../lib/global'
import { useLocation } from 'react-router-dom'
import Card from '../components/Card'
import LandIcon from '../assets/Card Image/LandIcon.svg'
import SearchIcon from '../assets/search-icon.svg'
import GpsIcon from '../assets/Card Image/GpsLogo.svg'
import axios from 'axios'
import debounce from 'lodash.debounce'
import Pagination from '../components/Pagination'
const options = [
    { label: '12', value: 12 },
    { label: '24', value: 24 },
    { label: '36', value: 36 },
]

const CardsAll = () => {
    const location = useLocation()
    const { data } = location?.state || {}
    console.log(data)
    const token = localStorage.getItem('token')

    // -----SORT------
    const [isSortOpen, setIsSortOpen] = useState(false)
    const [selectedSort, setSelectedSort] = useState('latest')
    // ---ASSET----
    const [selectedAsset, setSelectedAsset] = useState()
    const [isAssetOpen, setIsAssetOpen] = useState(false)
    // ---CITY----
    const [selectedCity, setSelectedCity] = useState()
    const [isCityOpen, setIsCityOpen] = useState(false)
    // ---DISTRICT----
    const [selectedDistrict, setSelectedDistrict] = useState()
    const [isDistrictOpen, setIsDistrictOpen] = useState(false)
    const [assets, setAssets] = useState([])
    const [noDataFound, setNoDataFound] = useState(false)
    const [query, setQuery] = useState('')
    const [currentPage, setCurrentPage] = useState(1)
    const [totalPages, setTotalPages] = useState(1)
    const [itemsPerPage, setItemsPerPage] = useState(12)
    const [totalItems, setTotalItems] = useState(0)
    const [selectedOption, setSelectedOptions] = useState(options[0])
    const [isOpen, setIsOpen] = useState(false)

    const handleSelect = (option) => {
        setItemsPerPage(option.value)
        setSelectedOptions(option)
        // setCurrentPage(1)
        setIsOpen(false)
    }
    // const sortRef = useRef(null)
    const assetRef = useRef(null)
    const cityRef = useRef(null)
    const districtRef = useRef(null)

    const { data: asset } = useFetchData(`${baseURL}Asset/GetAllAssets`, token)
    const { data: city } = useFetchData(`${baseURL}Asset/GetAllCities`, token)
    const { data: district } = useFetchData(
        `${baseURL}Asset/GetDistrictsByCityId?cityId=${selectedCity?.id}`,
        token
    )
    console.log(asset)

    const debouncedHandleSearch = debounce((value) => {
        setQuery(value)
    }, 100)

    console.log(selectedDistrict)

    const handleSearch = (e) => {
        debouncedHandleSearch(e.target.value)
    }

    const handleFilteredAssets = async () => {
        let url = `${baseURL}Asset/GetAssets?PageNo=${currentPage}&PageSize=${itemsPerPage}` // Add pagination params
        console.log(selectedAsset)

        const params = new URLSearchParams()
        if (query) params.append('searchText', query)
        if (selectedAsset) params.append('assetId', selectedAsset.id)
        if (selectedCity) params.append('cityId', selectedCity.id)
        if (selectedDistrict) params.append('districtId', selectedDistrict.id)

        if (params.toString()) {
            url += `&${params.toString()}`
        }

        try {
            const res = await axios.get(url, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            const fetchedAssets = res.data.data || []

            setAssets(fetchedAssets)
            setNoDataFound(fetchedAssets.length === 0)
            const totalItems = res.data.totalCount || 0
            setTotalItems(totalItems)
            setTotalPages(Math.ceil(totalItems / itemsPerPage))
        } catch (error) {
            console.error('Error fetching assets:', error)
            setAssets([])
            setNoDataFound(true)
        }
    }

    const handlePageChange = (pageNumber) => {
        if (pageNumber >= 1 && pageNumber <= totalPages) {
            setCurrentPage(pageNumber)
        }
    }

    useEffect(() => {
        handleFilteredAssets()
    }, [
        selectedAsset,
        selectedCity,
        selectedDistrict,
        query,
        currentPage,
        itemsPerPage,
    ])
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                assetRef.current &&
                !assetRef.current.contains(event.target) &&
                cityRef.current &&
                !cityRef.current.contains(event.target) &&
                districtRef.current &&
                !districtRef.current.contains(event.target)
            ) {
                setIsAssetOpen(false)
                setIsCityOpen(false)
                setIsDistrictOpen(false)

                // Call handleFilteredAssets when closing the dropdowns
                handleFilteredAssets()
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [assetRef, cityRef, districtRef, handleFilteredAssets]) // Ensure handleFilteredAssets is added as a dependency

    // const sorts = [
    //     { value: 'latest', label: 'Latest Update' },
    //     { value: 'oldest', label: 'Oldest Update' },
    // ]

    const handleAssetClick = (value) => {
        setSelectedAsset(value)
        setIsAssetOpen(false)
    }

    const handleCityClick = (value) => {
        setSelectedCity(value)
        setIsCityOpen(false)
    }

    const handleDistrictClick = (value) => {
        setSelectedDistrict(value)
        setIsDistrictOpen(false)
    }
    const handleAssetDropdown = () => {
        setIsAssetOpen((prev) => !prev)
        setIsCityOpen(false)
        setIsDistrictOpen(false)
    }

    const handleCityDropdown = () => {
        setIsCityOpen((prev) => !prev)
        setIsAssetOpen(false)
        setIsDistrictOpen(false)
    }

    const handleDistrictDropdown = () => {
        setIsDistrictOpen((prev) => !prev)
        setIsAssetOpen(false)
        setIsCityOpen(false)
    }

    return (
        <>
            <section className="section1 mb-3  px-12 2xl:px-24 4xl:px-32">
                <div className="flex justify-between">
                    <h1 className="text-[40px] leading-[48px] font-bold font-messiri text-primary-Main my-8">
                        AWJ Land Bank Hub
                    </h1>
                    {/* ---SORT--- */}
                    {/* <div className="relative max-w-xs flex items-center">
                        <h1 className="text-sm text-primary-Main font-arial font-bold mr-2">
                            Sort by:
                        </h1>
                        <button
                            onClick={() => setIsSortOpen(!isSortOpen)}
                            className="flex items-center justify-between px-4 py-3 font-arial rounded-[10px] border border-primary-input bg-white text-[16px] text-left"
                        >
                            {sorts.find((sort) => sort.value === selectedSort)
                                ?.label || 'Sort by'}
                            <img
                                src={chevron}
                                alt="Chevron Down"
                                className={`transform transition duration-200 ml-2 ease-in-out ${
                                    isSortOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {isSortOpen && (
                            <ul
                                className="absolute top-[72%] right-[3%] bg-white border p-3 font-arial text-[16px] border-primary-input rounded-lg mt-2 z-10"
                                ref={sortRef}
                            >
                                {sorts.map((sort) => (
                                    <li
                                        key={sort.value}
                                        onClick={() =>
                                            handleSortClick(sort.value)
                                        }
                                        className="p-2 hover:bg-gray-100 cursor-pointer"
                                    >
                                        {sort.label}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div> */}
                </div>

                <div className="grid grid-cols-10 grid-rows-1 p-8 bg-white rounded-2xl gap-2 mt-4">
                    {/* ------------- INPUT ----------- */}
                    <div className="flex items-center col-span-3 relative">
                        <input
                            type="text"
                            name="search"
                            id="search-keywords"
                            value={query}
                            placeholder="Search Keywords"
                            onChange={handleSearch}
                            className="px-4 py-3 rounded-lg border border-primary-input text-primary-Main bg-white text-sm flex-grow focus:outline-none"
                        />
                        <img
                            src={SearchIcon}
                            alt="Search Icon"
                            className="w-4 h-4 right-4 absolute"
                        />
                    </div>

                    {/* --------------------- ASSET ------------------------------ */}
                    <div className="relative col-span-3 w-full" ref={assetRef}>
                        <button
                            onClick={handleAssetDropdown}
                            className="w-full flex items-center justify-between px-4 py-3 text-primary-Main rounded-lg border border-primary-input bg-white text-sm text-left"
                            aria-expanded={isAssetOpen}
                        >
                            {selectedAsset?.assetName || 'Asset'}
                            <img
                                src={chevron}
                                alt="Chevron Down"
                                className={`transform transition duration-200 ease-in-out ${
                                    isAssetOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {isAssetOpen && (
                            <ul
                                className={`absolute w-full bg-white border border-primary-input global-scroll rounded-lg mt-2 z-10 ${
                                    asset?.data?.length > 0
                                        ? 'h-52 overflow-y-auto'
                                        : 'h-auto'
                                }`}
                            >
                                {asset?.data?.length > 0 ? (
                                    asset.data.map((asset) => (
                                        <li
                                            key={asset.id}
                                            onClick={() =>
                                                handleAssetClick(asset)
                                            }
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            role="option"
                                        >
                                            {asset.assetName}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-center text-gray-500 p-2">
                                        No Data Found
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* --------------------- CITY ------------------------------ */}
                    <div className="relative col-span-2 w-full" ref={cityRef}>
                        <button
                            onClick={handleCityDropdown}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg text-primary-Main border border-primary-input bg-white text-sm text-left"
                            aria-expanded={isCityOpen}
                        >
                            {selectedCity?.cityName || 'City'}
                            <img
                                src={chevron}
                                alt="Chevron Down"
                                className={`transform transition duration-200 ease-in-out ${
                                    isCityOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {isCityOpen && (
                            <ul
                                className={`absolute w-full bg-white border border-primary-input rounded-lg global-scroll mt-2 z-10 ${
                                    city?.data?.length > 0
                                        ? 'h-52 overflow-y-auto'
                                        : 'h-auto'
                                }`}
                                role="listbox"
                            >
                                {city?.data?.length > 0 ? (
                                    city.data.map((city) => (
                                        <li
                                            key={city.id}
                                            onClick={() =>
                                                handleCityClick(city)
                                            }
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            role="option"
                                        >
                                            {city.cityName}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-center text-gray-500 p-2">
                                        No Data Found
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>

                    {/* --------------------- DISTRICT ------------------------------ */}
                    <div
                        className="relative col-span-2 w-full "
                        ref={districtRef}
                    >
                        <button
                            onClick={handleDistrictDropdown}
                            className="w-full flex items-center justify-between px-4 py-3 rounded-lg border text-primary-Main border-primary-input bg-white text-sm text-left"
                        >
                            {selectedDistrict?.districtName || 'District'}
                            <img
                                src={chevron}
                                alt="Chevron Down"
                                className={`transform transition duration-200 ease-in-out ${
                                    isDistrictOpen ? 'rotate-180' : ''
                                }`}
                            />
                        </button>
                        {isDistrictOpen && (
                            <ul
                                className={`absolute w-full bg-white border border-primary-input global-scroll rounded-lg mt-2 z-10 ${
                                    district?.data?.length > 0
                                        ? 'h-52 overflow-y-auto'
                                        : 'h-auto'
                                }`}
                            >
                                {district?.data?.length > 0 ? (
                                    district.data.map((district) => (
                                        <li
                                            key={district.id}
                                            onClick={() =>
                                                handleDistrictClick(district)
                                            }
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                        >
                                            {district.districtName}
                                        </li>
                                    ))
                                ) : (
                                    <li className="text-center text-gray-500 p-2">
                                        No Data Found
                                    </li>
                                )}
                            </ul>
                        )}
                    </div>
                </div>
                {/* ------CARDS----- */}
                <div
                    className="grid grid-cols-1
    sm:grid-cols-2
    md:grid-cols-4
    3xl:grid-cols-4
    gap-4 2xl:gap-6 mt-6"
                >
                    {assets?.length > 0 ? (
                        <>
                            {assets?.map((asset, index) => (
                                <Card
                                    key={index}
                                    assetData={asset}
                                    sub={asset.assetCode}
                                    selectedCt={selectedCity}
                                    selectedDt={selectedDistrict}
                                    selectedAt={selectedAsset}
                                    cityId={asset.cityId}
                                    title={asset.assetName}
                                    icon={LandIcon}
                                    totalLands={asset.landCount}
                                    m2Data={asset.totalArea}
                                    location={asset.cityName}
                                    gpsIcon={GpsIcon}
                                />
                            ))}
                        </>
                    ) : noDataFound ? (
                        <div className="col-span-full text-center text-2xl p-20 text-neutral-50">
                            No Data Found!
                        </div>
                    ) : data?.data?.length > 0 ? (
                        <>
                            {data?.data?.map((asset, index) => (
                                <Card
                                    key={index}
                                    assetData={asset}
                                    title={asset.assetName}
                                    sub={asset.assetCode}
                                    selectedCt={selectedCity}
                                    selectedDt={selectedDistrict}
                                    selectedAt={selectedAsset}
                                    cityId={asset.cityId}
                                    icon={LandIcon}
                                    totalLands={asset.landCount}
                                    m2Data={asset.totalArea}
                                    location={asset.cityName}
                                    gpsIcon={GpsIcon}
                                />
                            ))}
                        </>
                    ) : (
                        <div className="col-span-full text-center text-2xl p-20 text-neutral-50">
                            No Data Found!
                        </div>
                    )}
                </div>
                <div className="mt-6 flex justify-between">
                    {' '}
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
                                            onClick={() => handleSelect(option)}
                                        >
                                            {option.label}
                                        </button>
                                    ))}
                                </div>
                            )}
                        </button>
                        <span> elements out of {totalItems}</span>
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        totalPages={totalPages}
                        onPageChange={handlePageChange}
                    />
                </div>
            </section>
        </>
    )
}

export default CardsAll
