import countries from "world-countries";


const formattedCounttries = countries.map((country) => ({
    value: country.cca2,
    label: country.name.common,
    flag: country.flag,
    latlng: country.latlng,
    region: country.region,
}))

const useCountries = () => {
    const getAll = () => formattedCounttries;

    const getByValue = (value: string) => {
        return formattedCounttries.find((item) => item.value === value)
    }

    return {
        getAll, getByValue
    }
};

export default useCountries;