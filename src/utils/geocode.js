const request = require('request')
const geocode = (address, callback) => {
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + address + ".json?access_token=pk.eyJ1IjoibmVzdGlrb3giLCJhIjoiY2p0ajNpMjVxMnZ2dzQzbzl5eHg0Y2NocSJ9.PNp_P__kl7jLlKqPqJO2gA&limit=1"
    request({url, json:true}, (error, {body})=>{
        if(error){
            callback('No se pudo conectar a los servicios de ubicacion!', undefined)
        }else if(body.features.length === 0){
            callback('No se pudo encontrar la ubicacion. Intenta otra busqueda!', undefined)
        }else{
            callback(undefined, {
                latitude: body.features[0].center[1],
                longitude: body.features[0].center[0],
                location:body.features[0].place_name
            })
        }

    })
}

module.exports= geocode