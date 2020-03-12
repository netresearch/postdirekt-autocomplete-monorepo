/**
 * See LICENSE.txt for license details.
 */
/**
 * Definition of possible search modes
 */
enum SearchSubject {
    Buildings = 'buildings',
    Cities = 'cities',
    Districts = 'districts',
    PostalCodes = 'postalcodes',
    PostalCodesCities = 'postalcodes_cities',
    PostalCodesCitiesDistricts = 'postalcodes_cities_districts',
    PostalCodesCitiesDistrictsStreets = 'postalcodes_cities_districts_streets',
    PostalCodesCitiesStreets = 'postalcodes_cities_streets',
}

export default SearchSubject;
