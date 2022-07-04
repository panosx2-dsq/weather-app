const request = require('request')

const WEATHERSTACK_API_KEY = 'd0862c12c48473dd8c838914a22e02ef'

const weatherStackBaseUrl = 'http://api.weatherstack.com'

const getCurrentWeatherUrl = weatherStackBaseUrl + '/current' + "?access_key=" + WEATHERSTACK_API_KEY

const getForecast = (latitude, longtitude, callback) => {
    request({
            url: getCurrentWeatherUrl + "&query=" + latitude + "," + longtitude,
            json: true
        },
        (error, response) => {
            if (error) {
                callback('Unable to connect to weather service!', undefined)
            } else {
                const body = response.body
                if (body != null && body.current != null) {
                    if (body.error != null) {
                        callback('Unable to find weather report for this location!', undefined)
                    } else {
                        callback(undefined, response.body.current)
                    }
                } else {
                    callback('Unable to connect to weather service!', undefined)
                }
            }
        }
    );
}

const getForecastObject = (searchTerm, location, forecast) => {
    return {
        searchTerm: searchTerm,
        location: location,
        weatherReport: {
            temperature: forecast.temperature + "C",
            feelsLike: forecast.feelslike + "C",
            humidity: forecast.humidity + '%',
            windSpeed: forecast.wind_speed + "km/h",
            chancesOfRain: forecast.precip + "%",
            comments: forecast.weather_descriptions
        }
    }
}

module.exports = {
    getForecast,
    getForecastObject
}