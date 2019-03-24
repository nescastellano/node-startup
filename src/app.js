const path = require('path')
const express = require('express')
const hbs = require('hbs')
// utils
const forecast = require('./utils/forecast')
const geocoding = require('./utils/geocode')
// utils end

const app = express()
// for heroku y defaut
const port = process.env.PORT  || 3000

// Definir PATH para express
const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')
//const errorPages = path.join(__dirname, '../templates/partials/404')

// Setup handlebars
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)


// setup static directory to serve
app.use(express.static(publicPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Main page',
        name: 'Nestor Castellano'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Page',
        name: 'Nestor Castellano'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help page',
        message: 'This page will provide you tips for getting into the right way... ',
        name: 'Nestor Castellano'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search){
        return res.send({
            error:'You most provide a search term'
        })
    }
    console.log(req.query)
    res.send({
        products:[] 
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error:"You most provide an address to parse information"
        })
    }
    
    geocoding(req.query.address, (error, {latitude, longitude, location} = {})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastRes)=>{
            if(error){
                return res.send({error})
            }
            res.send({forecast:forecastRes,search:req.query.address,location})
        })
    })
})

app.get('/help/*', (req,res)=>{
    res.render('404',{
        title: 'Help page',
        message: 'This page will provide you tips for getting into the right way... ',
        name: 'Nestor Castellano',
        errormessage:'La pagina de ayuda que esta indicando no pudo ser ubicada...'
    })
})

app.get('*', (req, res) => {
    res.render('404',{
        title: 'Help page',
        message: 'This page will provide you tips for getting into the right way... ',
        name: 'Nestor Castellano',
        errormessage:'La pagina que esta indicando no pudo ser ubicada...'
    })
})

app.listen(port, () => {
    console.log('Server is up on port '+port)
})