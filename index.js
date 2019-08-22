const express    = require('express')
const bodyParser = require('body-parser')
const path       = require('path')

const app  = express()
const port = process.env.PORT || 3300

//Maps views for views folder
app.set('views', path.join(__dirname, 'views'))

//Set EJS with view engine
app.set('view engine', 'ejs')

//Map public with default path
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.urlencoded({ extended: true }))

//Add port and start server
app.listen(port, (err) => {
    if(err)
        console.log('Não foi possivel iniciar o servidor MyCurriculum')
    else
        console.log('Servidor rodando...')
})