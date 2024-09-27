import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { MapContainer, TileLayer, Polygon, Marker } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import LandConstructionDetails from '../../../components/LandView/LandConstructionDetails'
import { updateLandAssetInfo } from '../../../features/forms/formSlice'
import LandPlotDetails from '../../../components/LandView/LandPlotDetails'
import SubmitLandOverView from '../../../components/SubmitLandOverview'
import EditMap from './EditMap'
import { baseURL } from '../../../lib/global'
import { LocateOffIcon, MapPinOff, Plus } from 'lucide-react'
import { LandBussinessPlan } from '../../../components/LandView/LandBussinessPlan'
import icon from '../../../assets/Card Image/marker-icon.png'

const calculateCentroid = (coordinates) => {
    let latSum = 0
    let lngSum = 0
    coordinates.forEach(([lat, lng]) => {
        latSum += lat
        lngSum += lng
    })
    const centroidLat = latSum / coordinates.length
    const centroidLng = lngSum / coordinates.length
    return [centroidLat, centroidLng]
}
const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
})
const LandOverview = ({ refetch }) => {
    const dispatch = useDispatch()
    const roleName = localStorage.getItem('roleName')
    const department = localStorage.getItem('department')
    const { isEditable, activeTab, landAssetInfo } = useSelector((state) => ({
        isEditable: state?.forms?.isEditable,
        activeTab: state?.forms?.activeTab,
        landAssetInfo: state?.forms?.LandAssetInfo,
    }))

    const {
        landId = '',
        landInformation = '',
        isLandInfoEdited,
        status,
    } = landAssetInfo

    const [coordinates, setCoordinates] = useState(null)
    const [showEditMap, setShowEditMap] = useState(false)
    const [mapKey, setMapKey] = useState(0)
    const [shouldFetchCoordinates, setShouldFetchCoordinates] = useState(false)

    useEffect(() => {
        const fetchCoordinates = async () => {
            if (!landId) return

            try {
                const response = await fetch(
                    `${baseURL}Sales/GetLandCoordinates?landId=${landId}`
                )

                const data = await response.json()
                setCoordinates(data)
                console.log(data, 'Fetched coordinates')
            } catch (error) {
                console.error('Error fetching coordinates:', error)
            }
        }
        if (shouldFetchCoordinates) {
            fetchCoordinates()
            setShouldFetchCoordinates(false)
        }
        const debounceFetch = setTimeout(() => {
            fetchCoordinates()
        }, 100) // 500ms delay to debounce frequent updates

        return () => clearTimeout(debounceFetch)
    }, [landId, shouldFetchCoordinates])

    const defaultPosition = [51.505, -0.09] // Default coordinates if API data isn't available
    const polygonCoordinates =
        coordinates?.data?.landShapeArray?.map(({ latitude, longitude }) => [
            latitude,
            longitude,
        ]) || []

    // Determine the center of the map based on the data
    let mapCenter = defaultPosition

    if (polygonCoordinates.length > 0) {
        // Use centroid of the shape if available
        mapCenter = calculateCentroid(polygonCoordinates)
    } else if (coordinates?.data?.latitude && coordinates?.data?.longitude) {
        // Use latitude and longitude if shape is not available
        mapCenter = [coordinates.data.latitude, coordinates.data.longitude]
    } else {
        mapCenter = null // No coordinates available
    }

    const handleInputChange = (e) => {
        const { name, value } = e.target
        dispatch(updateLandAssetInfo({ [name]: value }))
    }

    const handleAddLocation = () => {
        setShowEditMap(true)
        setMapKey((prevKey) => prevKey + 1)
    }
    const handleSuccess = () => {
        setMapKey((prevKey) => prevKey + 1)
        setShouldFetchCoordinates(true)
        console.log('handleSuccess triggered')
    }

    return (
        <>
            <h1 className="text-[32px] leading-6 font-semibold mb-4 text-neutral-600">
                Land Overview
            </h1>
            <h2 className="text-base text-neutral-600 font-normal">
                Land Description
            </h2>
            {isEditable &&
            department === 'Land Bank' &&
            activeTab == 'landoverview' ? (
                <div className="w-full mb-6">
                    <textarea
                        onChange={handleInputChange}
                        placeholder="Enter Land Description"
                        value={landInformation || ''}
                        name="landInformation"
                        className="w-full py-1.5 font-normal text-base placeholder:text-primary-500 text-primary-500 px-4 min-h-28 focus:outline-none border border-primary-400 rounded-lg"
                    />
                </div>
            ) : (
                <p
                    className={`${
                        isLandInfoEdited === 1 &&
                        status === 'Waiting for Approval'
                            ? 'text-secondary500'
                            : 'text-neutral-50'
                    } font-normal text-base mb-6`}
                >
                    {landInformation || 'null'}
                </p>
            )}
            {/* {(roleName === 'Editor' || roleName === 'Approver') && (
                <LandPlotDetails />
            )} */}

            <div className="grid grid-cols-1 lg:grid-cols-[2fr,3fr] gap-4 box-border">
                {(roleName === 'Editor' && department === 'Land Bank') ||
                (roleName === 'Approver' &&
                    department === 'Land Bank' &&
                    (landAssetInfo?.status === 'Data Not Submitted' ||
                        landAssetInfo?.status === 'Send Back')) ? (
                    // Show "Add Location" or EditMap logic for Editors and Approvers with specific statuses
                    !coordinates?.data?.latitude ||
                    !coordinates?.data?.longitude ? (
                        showEditMap ? (
                            <div className="relative w-full z-10 h-[280px] bg-gray-200 rounded-lg overflow-hidden">
                                <EditMap
                                    key={mapKey}
                                    landId={landId}
                                    coordinates={coordinates}
                                    mapId={coordinates?.data?.mapId}
                                    onSuccess={handleSuccess}
                                />
                            </div>
                        ) : (
                            <div className="h-[380px] bg-gray-200 rounded-lg flex justify-center items-center">
                                <div
                                    onClick={handleAddLocation}
                                    className="bg-primary-300 px-4 py-2 rounded-lg flex cursor-pointer"
                                >
                                    <Plus className="text-primary-800" />
                                    <span className="text-primary-800 font-semibold">
                                        Add Location
                                    </span>
                                </div>
                            </div>
                        )
                    ) : (
                        // If latitude and longitude are available, directly show EditMap component for Editor
                        <div className="relative w-full z-10 h-[380px] bg-gray-200 rounded-lg overflow-hidden">
                            <EditMap
                                key={mapKey}
                                landId={landId}
                                coordinates={coordinates}
                                mapId={coordinates?.data?.mapId}
                                onSuccess={handleSuccess}
                            />
                        </div>
                    )
                ) : !coordinates?.data?.latitude ||
                  !coordinates?.data?.longitude ? (
                    <div className="bg-gray-200 rounded-lg overflow-hidden flex justify-center items-center text-center text-[32px] font-semibold text-neutral-600">
                        No coordinates found
                        <br />
                        Contact Admin
                    </div>
                ) : (
                    <div className="relative w-full z-10 h-[380px] bg-gray-200 rounded-lg overflow-hidden">
                        <MapContainer
                            className="map-container"
                            center={mapCenter || defaultPosition}
                            zoom={20}
                            scrollWheelZoom={false}
                            style={{ height: '380px', width: '100%' }}
                            zoomControl={true}
                        >
                            <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                            <Marker
                                position={
                                    mapCenter || [
                                        coordinates?.data?.latitude,
                                        coordinates?.data?.longitude,
                                    ]
                                }
                                icon={customIcon}
                            />
                            {polygonCoordinates.length > 0 && (
                                <Polygon
                                    positions={polygonCoordinates}
                                    color="red"
                                />
                            )}
                        </MapContainer>
                    </div>
                )}

                <div className="grid gap-2">
                    <LandBussinessPlan />
                    <LandConstructionDetails />
                </div>
            </div>
            {/* {roleName === 'Approver' &&
                landAssetInfo?.status !== 'Approved' &&
                landAssetInfo?.status !== 'Send Back' && (
                    <div className="mt-5">
                        {landAssetInfo?.status === 'Waiting for Approval' && (
                            <>
                                <label
                                    htmlFor="comments"
                                    className="font-normal text-base text-neutral-600"
                                >
                                    Comments
                                </label>
                                <textarea
                                    id="comments"
                                    className="w-full h-[98px] border rounded-md resize-none p-3 text-primary-500 ring-0 outline-none border-primary-400 placeholder:text-primary-500 placeholder:text-base placeholder:font-normal"
                                    placeholder="Comments"
                                />
                            </>
                        )}
                    </div>
                )} */}

            {isEditable &&
                (roleName === 'Editor' || roleName === 'Approver') &&
                department === 'Development' &&
                (landAssetInfo?.status === 'Data Not Submitted' ||
                    landAssetInfo?.status === 'Send Back') && (
                    <div className="mt-2 flex justify-end p-1">
                        <SubmitLandOverView refetch={refetch} />
                    </div>
                )}
        </>
    )
}

export default LandOverview
