import React, { useState, useRef } from 'react'
import {
    MapContainer,
    TileLayer,
    FeatureGroup,
    Marker,
    Polygon,
    useMap,
} from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import 'leaflet-draw/dist/leaflet.draw.css'
import { EditControl } from 'react-leaflet-draw'
import { OpenStreetMapProvider } from 'leaflet-geosearch'
import 'leaflet-geosearch/dist/geosearch.css'
import L from 'leaflet'
import axios from '../../../api/axios'
import icon from '../../../assets/Card Image/marker-icon.png'

const customIcon = new L.Icon({
    iconUrl: icon,
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
})
const MapWithSearch = ({ coordinates, landId, onSuccess }) => {
    const mapRef = useRef(null)
    const provider = new OpenStreetMapProvider()
    const [markerPosition, setMarkerPosition] = useState(null)

    // Ensure the latitude and longitude are numbers before using them
    const isValidCoordinate = (value) =>
        typeof value === 'number' && !isNaN(value)

    // Extract latitude and longitude or fallback to defaults
    const latitude = isValidCoordinate(coordinates?.data?.latitude)
        ? coordinates.data.latitude
        : 23.8859
    const longitude = isValidCoordinate(coordinates?.data?.longitude)
        ? coordinates.data.longitude
        : 45.0792
    const position = [latitude, longitude]
    const mapId = coordinates?.data?.mapId
    const landShapeArray = coordinates?.data?.landShapeArray || []

    console.log(mapId, 'map id')

    const handleSearch = async () => {
        const searchBox = document.getElementById('search-box')
        const query = searchBox.value
        if (query) {
            const results = await provider.search({ query })
            if (results && results.length > 0) {
                const { x, y } = results[0]
                console.log('Searched Location - Longitude:', x, 'Latitude:', y)
                setMarkerPosition([y, x])
                mapRef.current.setView([y, x], 13)
            } else {
                alert('Location not found')
            }
        }
    }

    const AddSearchControl = () => {
        const map = useMap()

        React.useEffect(() => {
            const searchControl = L.control({ position: 'topright' })

            searchControl.onAdd = () => {
                const div = L.DomUtil.create('div', 'search-container')
                div.innerHTML = `
                    <input type="text" id="search-box" placeholder="Search location" style="padding: 5px; width: 200px; border-radius: 8px;" />
                    <button id="search-button" style="padding: 5px 10px; background: #837550; color: white; border-radius: 8px;">Search</button>
                `
                return div
            }

            searchControl.addTo(map)

            L.DomEvent.on(L.DomUtil.get('search-button'), 'click', handleSearch)
            L.DomEvent.on(L.DomUtil.get('search-box'), 'keypress', (e) => {
                if (e.key === 'Enter') {
                    handleSearch()
                }
            })

            return () => {
                map.removeControl(searchControl)
            }
        }, [map])

        return null
    }
    console.log('onSuccess in EditMap:', onSuccess)
    const handleCreated = async (e) => {
        const layer = e.layer
        const type = e.layerType

        layer.setStyle({ color: 'red' })

        let landShape = ''
        let latitude = null
        let longitude = null

        if (type === 'circle') {
            const { lat, lng } = layer.getLatLng()
            landShape = `CIRCLE(${lat} ${lng})`
            latitude = lat
            longitude = lng
        } else if (type === 'rectangle' || type === 'polygon') {
            const latLngs = layer.getLatLngs()[0]
            const firstLatLng = latLngs[0]
            const closedLatLngs = [...latLngs, firstLatLng]
            const coordinates = closedLatLngs
                .map((latLng) => `${latLng.lat} ${latLng.lng}`)
                .join(', ')

            const shapeType = type === 'rectangle' ? 'RECTANGLE' : 'POLYGON'
            landShape = `${shapeType}((${coordinates}))`
            // Use the first coordinate as fallback for circle
            latitude = firstLatLng.lat
            longitude = firstLatLng.lng
        } else if (type === 'polyline') {
            const latLngs = layer.getLatLngs()
            const coordinates = latLngs
                .map((latLng) => `${latLng.lat} ${latLng.lng}`)
                .join(', ')

            landShape = `LINESTRING(${coordinates})`
            // Use the first coordinate as fallback for circle
            latitude = latLngs[0].lat
            longitude = latLngs[0].lng
        }
        const requestData = {
            landId: landId,
            landShape,
            latitude: latitude,
            longitude: longitude,
        }
        console.log('Request Data:', requestData)
        try {
            const response = await axios.post(
                'Sales/AddUpdateLandLocation',
                requestData
            )
            console.log(response)
            // Check if the response indicates success
            if (typeof onSuccess === 'function') {
                onSuccess()
            } else {
                console.error('onSuccess is not a function')
            }
            console.log('API Response:', response.data)
        } catch (error) {
            console.error(
                'Error making API request:',
                error.response ? error.response.data : error.message
            )
        }
    }
    console.log(position, 'position')
    const zoomLevel =
        isValidCoordinate(coordinates?.data?.latitude) &&
        isValidCoordinate(coordinates?.data?.longitude)
            ? 19
            : 3
    return (
        <div className="relative">
            <MapContainer
                center={position}
                zoom={zoomLevel}
                scrollWheelZoom={true}
                style={{ height: '380px', width: '100%' }}
                ref={mapRef}
                whenCreated={(mapInstance) => {
                    mapRef.current = mapInstance
                }}
            >
                <AddSearchControl />
                <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                <Marker position={position} icon={customIcon} />

                {landShapeArray.length > 0 && (
                    <Polygon
                        positions={landShapeArray.map(
                            ({ latitude, longitude }) => [latitude, longitude]
                        )}
                        color="red"
                    />
                )}

                <FeatureGroup>
                    <EditControl
                        position="topleft"
                        onCreated={handleCreated}
                        draw={{
                            rectangle: false,
                            polygon: true,
                            circle: false,
                            polyline: false,
                            marker: false,
                            circlemarker: false,
                        }}
                    />
                </FeatureGroup>
            </MapContainer>
        </div>
    )
}

export default MapWithSearch
