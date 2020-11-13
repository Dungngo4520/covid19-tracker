import React from 'react'
import './style/Map.css'
import { MapContainer, TileLayer } from 'react-leaflet'
import ChangeView from './ChangeView'
import { showDataOnMap } from './util'

function Map({ countries, casesType, center, zoom }) {
	return (
		<div className='map'>
			<MapContainer center={center} zoom={zoom}>
				<ChangeView center={center} zoom={zoom} />
				<TileLayer
					url='https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png'
					attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a>'
				/>
				{showDataOnMap(countries, casesType)}
			</MapContainer>
		</div>
	)
}

export default Map
