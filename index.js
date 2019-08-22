const express    = require('express')
const bodyParser = require('body-parser')
const path       = require('path')
const sqlite    = require('sqlite')

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

app.get('/', (req, res) => {
    res.render('home')
})

app.get('/about/skills', async(req, res) => {
    const db = await dbConnection
    const companies = await db.all('select * from company;')

    console.log(companies)
    res.render('about/skills', {
        companies
    })
})

app.get('/about/skillsDetail', (req, res) => {
    res.render('about/skillsDetail')
})

//Initi DataBase
const init = async() => {
    const db = await dbConnection
    await db.run('create table if not exists company(id INTEGER PRIMARY KEY, name TEXT, titleFunction TEXT, skills TEXT, dtInit TEXT, dtEnd TEXT);')

    const company = 'Três Corações Alimentos S/A'
    const titleFunction = 'FullStack Developer'
    const skills = '#JavaScript | #ActionScript | #Java | #Android | #C# | #Git'
    const dtInit = '2012'
    const dtFim = '2015'
    //await db.run(`insert into company(name, titleFunction, skills, dtInit, dtEnd) values ('${company}', '${titleFunction}', '${skills}', '${dtInit}', '${dtFim}');`)
}

init()

//Add port and start server
app.listen(port, (err) => {
    if(err)
        console.log('Não foi possivel iniciar o servidor MyCurriculum')
    else
        console.log('Servidor rodando...')
})