import { useState } from 'react'
import { Button } from './Form'
import { GetWeather } from './Weather'

export const ShowList = props => ( <ul>{props.list}</ul> )

export const RenderDetails = props => (<>
    <h2>{props.country.name.common}</h2>
    <p>capital {props.country.capital}</p>
    <p>area {props.country.area}</p>
    <p>
        <strong>languages:</strong>
        <ul>{Object.values(props.country.languages).map(lang => <li key={lang}>{lang}</li>)}</ul>
    </p>
    <img src={props.country.flags.png} alt='flag' />
    <GetWeather city={props.country.capital} /> </>
)

export const Country = props => {
    const [detailsVisible, toggleDetails] = useState(false)
    const handleToggleDetails = () => toggleDetails(prevState => !prevState)
    return (
        <div><li>{props.country.name.common}{' '}<Button handleClick={handleToggleDetails} text=" show " /></li>
            {detailsVisible && <RenderDetails country={props.country} />}
        </div>
    )
}
