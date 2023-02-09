const { response } = require('express');
const express = require('express');
const app = express();
const https = require("https");
const bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({extended: true}));

app.get("/", (req, res, next) => {
    res.sendFile(__dirname + "/index.html");
});

app.post("/", (req, res, next) => {
    
    const theCityInput = req.body.cityInput;
    const apiKey = "Enter your api key from the openweathermap.org website";
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${theCityInput}&appid=${apiKey}&units=imperial`;

    https.get(url, (response) => {console.log(response.statusCode);

    //in order to extract the correct data, we must use the on method then JSON.parse
    response.on("data", (data) => {
        const weatherData = JSON.parse(data);
        const temp = weatherData.main.temp;
        const description = weatherData.weather[0].description;    
        res.write(`<h1>The current temperature in ${theCityInput} is ${temp} degrees farenheit with ${description}.</h1>`);
        res.send();
    });
})
})

app.listen(3000, () => {
    console.log("The server is running on port 3000");
})