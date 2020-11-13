import React from 'react'
import numeral from 'numeral'
import { Circle, Popup } from 'react-leaflet'

const caseTypeColors = {
	cases: {
		hex: '#cc1034',
		multiplier: 800,
	},
	recovered: {
		hex: '#7dd71d',
		multiplier: 1200,
	},
	deaths: {
		hex: '#777777',
		multiplier: 2000,
	},
}

export const sortData = (data) => {
	const sortedData = [...data]
	return sortedData.sort((a, b) => (a.cases > b.cases ? -1 : 1))
}

export const showDataOnMap = (data, caseType = 'cases') =>
	data.map((country) => (
		<Circle
			center={[country.countryInfo.lat, country.countryInfo.long]}
			fillOpacity={0.4}
			color={caseTypeColors[caseType].hex}
			fillColor={caseTypeColors[caseType].hex}
			radius={Math.sqrt(country[caseType]) * caseTypeColors[caseType].multiplier}>
			<Popup>
				<div>
					<div className='info-header'>
						<div className='info-country'>{country.country}</div>
						<div className='info-flag' style={{ backgroundImage: `url(${country.countryInfo.flag})` }} />
					</div>
					<div className='info-cases'>
						<p>Cases: </p>
						<p>{numeral(country.cases).format('0,0')}</p>
					</div>
					<div className='info-recovered'>
						<p>Recovered: </p>
						<p>{numeral(country.recovered).format('0,0')}</p>
					</div>
					<div className='info-deaths'>
						<p>Deaths: </p>
						<p>{numeral(country.deaths).format('0,0')}</p>
					</div>
				</div>
			</Popup>
		</Circle>
	))

export const printStat = (stat) => (stat ? `+${numeral(stat).format('0,0a')}` : '+0')
export const printTotal = (total) => (total ? `${numeral(total).format('0,0')}` : '0')
