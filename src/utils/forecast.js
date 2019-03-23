const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = "https://api.darksky.net/forecast/fd605b070fdf53bfe1960a3b1aebd873/"+lat+","+lng+"?units=si&lang=es"
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('Unable to conect to weather services!', undefined)
        }else if(body.error){
            callback('Unable to find location. Try another search!', undefined)
        }else{
            callback(undefined, {
                data:body.currently
            })
             //console.log("It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain.")
         }
     })
}


 module.exports = forecast