const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.port || 3000

// paths for express config
const viewsPath = path.join(__dirname, '../templates/views')
const publicPath = path.join(__dirname, '../public')
const partialsPath = path.join(__dirname, '../templates/partials')

// setup handlebars engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// setup static dir to serve
app.use(express.static(publicPath))

const pageData = (headerTitle) => {
    return {
        headerTitle: headerTitle,
        createdBy: "Panos P."
    }
}

// index
app.get('', (req, res) => {
    res.render('index', pageData('Weather App'))
})

// help
app.get('/help', (req, res) => {
    res.render('help', pageData('Help'))
})

// about
app.get('/about', (req, res) => {
    res.render('about', pageData('About'))
})

// weather
app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send('Error: You have to provide an address to get the forecast!')
    }

    geocode(req.query.address, (error, geocodeData) => {
        if (error) {
            return res.send('error: ' + error)
        }
    
        if (geocodeData != undefined) {
            forecast.getForecast(geocodeData.latitude, geocodeData.longitude, (error, forecastData) => {
                if (error) {
                    return res.send('error: ' + error)
                }

                if (forecastData) {
                    res.send(
                        forecast.getForecastObject(
                            req.query.address, 
                            geocodeData.location, 
                            forecastData
                        )
                    )
                } else {
                    res.send(undefined)
                }
            })
        }
    })
})

// help 404
app.get('/help/*', (req, res) => {
    res.render('help404', pageData('404'))
})

// 404
app.get('*', (req, res) => {
    res.render('generic404', pageData('404'))
})

app.listen(port, () => {
    console.log('server is up on port' + port + '!')
})