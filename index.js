const express    = require('express')
const bodyParser = require('body-parser')
const path       = require('path')
const sqlite     = require('sqlite')

const dbConnection = sqlite.open(path.resolve(__dirname, 'banco.sqlite'), { Promise })

const app  = express()
const port = process.env.PORT || 3300

//Maps views for views folder
app.set('views', path.join(__dirname, 'views')) 

//Set EJS with view engine
app.set('view engine', 'ejs')

//Map public with default path
app.use(express.static(path.join(__dirname, 'public'))) 
app.use(bodyParser.urlencoded({ extended: true }))

app.get('/script/util.js',function(req,res){
    res.sendFile(path.join(__dirname + 'public/script/util.js')); 
});

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about/skills', async(req, res) => {
    const db = await dbConnection
    const companies = await db.all('select * from company;')

    res.render('about/skills', {
        companies
    })
})

app.get('/about/skillsDetail/:id', async(req, res) => {
    const db = await dbConnection
    const company = await db.get(`select * from company where id = '${ req.params.id}'`)
    res.render('about/skillsDetail', {
        company
    })
})

app.get('/about/contact', async(req, res) => {
    const db = await dbConnection
    const employee = await db.get(`select * from employee where id = 1`)
    res.render('about/contact', {
        employee
    })
})

//Initi DataBase
const init = async() => {
    navigator.clipboard.readText()

    const db = await dbConnection
    await db.run('create table if not exists employee(id INTEGER PRIMARY KEY, name TEXT, age INTEGER, email TEXT, linkedin TEXT, Skype TEXT, phone TEXT, birth TEXT, github TEXT);')
    await db.run('create table if not exists company(id INTEGER PRIMARY KEY, name TEXT, titleFunction TEXT, skills TEXT, dtInit TEXT, dtEnd TEXT);')
}

init()

//Add port and start server
app.listen(port, (err) => {
    if(err)
        console.log('Não foi possivel iniciar o servidor MyCurriculum')
    else
        console.log('Servidor rodando...')
})