console.log('Javascript esta cargado')

// fetch('http://puzzle.mead.io/puzzle').then((response)=>{
//     response.json().then((data)=>{
//         console.log(data)
//     })
// })


const search = document.querySelector('input')
const weatherForm = document.querySelector('form')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-1')



weatherForm.addEventListener('submit', (e)=>{
    e.preventDefault()
    messageOne.textContent =""
    messageTwo.textContent =""

    const location = search.value
        fetch('http://localhost:3000/weather?address='+location).then((response)=>{
         response.json().then((data)=>{
                if(data.error){
                    return messageTwo.textContent = data.error
                }
                var weather = data.forecast.data
                messageOne.textContent+=weather.summary+" "+data.location
        })
    })

})
