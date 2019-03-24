console.log('Javascript esta cargado')

const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()

    const location = search.value

    messageOne.innerHTML="Cargando..."
    messageTwo.textContent =""

        fetch('/weather?address='+location).then((response)=>{
         response.json().then((data)=>{
                if(data.error){
                    messageOne.innerHTML=""
                    return messageTwo.innerHTML = data.error
                } else {
                    
                var weather = data.forecast.data
                messageOne.innerHTML=data.location+'<br><br>'                
                messageOne.innerHTML+=weather.hourly.summary+"<br>"
                messageOne.innerHTML+="La temperatura es de <b>"+weather.currently.apparentTemperature+"º</b> y la probabilidad de precipitacion es de <b>"+weather.currently.precipProbability+"%</b><br>"
            }

        })
    })

})
