const fetchWeather = (location, callback) => {
    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            callback(data)
        })
    })
}

const searchForm = document.querySelector('form')
const searchInput = document.querySelector('input')
const result = document.querySelector('#result')

searchForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = searchInput.value

    result.textContent = "Loading..."

    fetchWeather(location, (data, error) => {
        if (error) {
            result.textContent = error
        } else {
            if (data) {
                result.textContent = JSON.stringify(data)
            } else {
                result.textContent = "no results"
            }
        }
    })
})

