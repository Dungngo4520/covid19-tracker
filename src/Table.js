import React from 'react'
import './style/Table.css'

function Table({ countries }) {
	return (
		<div className='table'>
			{countries.map(({ country, cases }) => (
				<tr>
					<td>{country}</td>
					<td>
						<strong>{cases.toLocaleString()}</strong>
					</td>
				</tr>
			))}
		</div>
	)
}

export default Table