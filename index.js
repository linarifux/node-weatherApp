const express = require('express')
const bodyParser = require('body-parser')
const fetch = require('node-fetch')

const app = express()
app.use(express.static(__dirname + '/public'));
app.listen(8000, ()=> {
    console.log('server started....');
})


const siteInformation = {
    name: "Weather Report",
    author: "Naimul Islam",
    published: "30th May, 2021"
}

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))
app.get('/', (req,res)=> {
    res.render('index', {siteInformation})
})

app.post('/result', async (req,res) => {
    const city = req.body.city
    const options = {'method':'POST'}
    const API_KEY = 'ba94c4d1e85eb7c3f7ead9e2427a4cd1'
    const url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
    const response = await fetch(url, options)
        .then(res => res.json())
        .catch(err => console.log(err))
    
    console.log("Response: ", response.main.temp);
    const temp = (response.main.temp - 273.15).toFixed(2)
    const cityName = response.name
    const wind = response.wind.speed
    const feelsLike = (response.main.feels_like - 273.15).toFixed(2)
    // res.json(temp)

    res.render('result', {wind,feelsLike,temp,cityName,siteInformation})
})

