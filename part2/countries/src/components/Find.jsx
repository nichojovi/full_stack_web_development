import { Country, ShowList } from './Country'
import { Input } from './Form'
import { RenderDetails } from './Country'

export const OneMatchFound = ({ matchedCountry }) => ( <div> <RenderDetails key={matchedCountry.name.official} country={matchedCountry} /> </div> )

export const NoMatches = () => <div>No countries found</div>

export const TooManyMatches = () => <div>Too many matches, specify another filter</div>

export const AddFilter = props => {
    const { filter, onChange } = props
    return ( <Input text='find countries ' value={filter} onChange={onChange} /> )
}

const getFilterCountries = (allCountries, filterText) => (
    allCountries.filter(country => country.name.common.toLowerCase().includes(filterText.toLowerCase()))
        .map(country => <Country key={country.name.official} country={country} />)
)

export const ShowFiltered = props => {
    const { countries, filter } = props
    const listOfFilterCountries = getFilterCountries(countries, filter)
    const isFilterPresent = filter.length > 0
    const countryCount = listOfFilterCountries.length
    if (countryCount > 10 && isFilterPresent) {
        return <TooManyMatches />
    } else if (countryCount === 0) {
        return <NoMatches />
    } else if (countryCount === 1) {
        return <OneMatchFound matchedCountry={listOfFilterCountries[0].props.country} />
    }
    return <ShowList list={listOfFilterCountries} />
}
