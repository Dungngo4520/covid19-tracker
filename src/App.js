import './style/App.css'
import { Card, CardContent, FormControl, MenuItem, Select } from '@material-ui/core'
import { useEffect, useState } from 'react'
import InfoBox from './InfoBox'
import Map from './Map'
import Table from './Table'
import { printStat, printTotal, sortData } from './util'
import LineGraph from './LineGraph'
import 'leaflet/dist/leaflet.css'

function App() {
	const [countries, setCountries] = useState([])
	const [country, setCountry] = useState('worldwide')
	const [countryInfo, setCountryInfo] = useState({})
	const [tableData, setTableData] = useState([])
	const [mapCenter, setMapCenter] = useState([25, 0])
	const [mapZoom, setMapZoom] = useState(2)
	const [mapCountries, setMapCountries] = useState([])

	useEffect(() => {
		fetch('https://disease.sh/v3/covid-19/all')
			.then((response) => response.json())
			.then((data) => setCountryInfo(data))
	}, [])

	useEffect(() => {
		const getCountriesData = async () => {
			await fetch('https://disease.sh/v3/covid-19/countries')
				.then((response) => response.json())
				.then((data) => {
					const countries = data.map((country) => ({
						name: country.country,
						value: country.countryInfo.iso2,
					}))

					const sortedData = sortData(data)
					setCountries(countries)
					setTableData(sortedData)
					setMapCountries(data)
				})
		}
		getCountriesData()
	}, [])

	const onCountryChange = async (e) => {
		const countryCode = e.target.value

		const url =
			countryCode === 'worldwide'
				? 'https://disease.sh/v3/covid-19/all'
				: `https://disease.sh/v3/covid-19/countries/${countryCode}`

		await fetch(url)
			.then((response) => response.json())
			.then((data) => {
				setCountry(countryCode)
				setCountryInfo(data)
				setMapCenter(countryCode === 'worldwide' ? [25, 0] : [data.countryInfo.lat, data.countryInfo.long])
				setMapZoom(countryCode === 'worldwide' ? 2 : 4)
			})
	}

	return (
		<div className='app'>
			<div className='app__left'>
				<div className='app__header'>
					<h1>COVID-19 TRACKER</h1>
					<FormControl className='app__dropdown'>
						<Select variant='outlined' value={country} onChange={onCountryChange}>
							<MenuItem value='worldwide'>Worldwide</MenuItem>
							{countries.map((country) => (
								<MenuItem value={country.value}>{country.name}</MenuItem>
							))}
						</Select>
					</FormControl>
				</div>

				<div className='app__stats'>
					<InfoBox
						title='New Cases'
						cases={printStat(countryInfo.todayCases)}
						total={printTotal(countryInfo.cases)}
					/>
					<InfoBox
						title='New Recovered'
						cases={printStat(countryInfo.todayRecovered)}
						total={printTotal(countryInfo.recovered)}
					/>
					<InfoBox
						title='New Deaths'
						cases={printStat(countryInfo.todayDeaths)}
						total={printTotal(countryInfo.deaths)}
					/>
				</div>

				<Map countries={mapCountries} center={mapCenter} zoom={mapZoom} />
			</div>
			<Card className='app__right'>
				<CardContent>
					<h3>Live Cases by Country</h3>
					<Table countries={tableData} />
					<h3>Worldwide new cases</h3>
					<LineGraph />
				</CardContent>
			</Card>
		</div>
	)
}

export default App
