const request = require('request')

const geocode = (address, callback) => {
    const MAPBOX_API_KEY = 'pk.eyJ1IjoicGFub3N4MiIsImEiOiJjbDRwaHMwdDQwZjZ6M21udmowNW5zbjB4In0.Eo4xyQReNS98p5t9AkoY9A'
    const mapBoxBaseUrl = 'https://api.mapbox.com/geocoding/v5'

    request({
        url: mapBoxBaseUrl + '/mapbox.places/' + address + '.json?access_token=' + MAPBOX_API_KEY,
        json: true
    },
    (error, response) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            callback(undefined, {
                location: response.body.features[0].place_name,
                latitude: response.body.features[0].center[0],
                longitude: response.body.features[0].center[1]
            })
        }
    });
}

module.exports = geocode