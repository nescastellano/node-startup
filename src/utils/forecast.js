const request = require('request')

const forecast = (lat, lng, callback) => {
    const url = "https://api.darksky.net/forecast/fd605b070fdf53bfe1960a3b1aebd873/"+lat+","+lng+"?units=si&lang=es"
    request({ url, json: true }, (error, {body}) => {
        if(error){
            callback('No se pudo conectar con los servicios del clima!', undefined)
        }else if(body.error){
            callback('No se pudo ubicar el lugar indicado, proporcione un nuevo lugar!', undefined)
        }else{
            callback(undefined, {
                data:body
            })
             //console.log("It is currently " + response.body.currently.temperature + " degrees out. There is a " + response.body.currently.precipProbability + "% chance of rain.")
         }
     })
}


 module.exports = forecast