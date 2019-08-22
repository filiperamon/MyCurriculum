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

app.get('/about/skillsDetail/:id', async(req, res) => {
    const db = await dbConnection
    const company = await db.get(`select * from company where id = '${ req.params.id}'`)
    res.render('about/skillsDetail', {
        company
    })
})

//Initi DataBase
const init = async() => {
    const db = await dbConnection
    await db.run('create table if not exists employee(id INTEGER PRIMARY KEY, name TEXT, age INTEGER, email TEXT, linkedin TEXT, Skype TEXT, phone TEXT, birth TEXT, github TEXT);')
    await db.run('create table if not exists company(id INTEGER PRIMARY KEY, name TEXT, titleFunction TEXT, skills TEXT, dtInit TEXT, dtEnd TEXT);')
    
    //await db.run('insert into employee (id INTEGER PRIMARY KEY, name, age, email, linkedin, Skype, phone, birth, github) values ();')
    //await db.run('update company set descricao = "I am Full StackDeveloper,and Analystin all business company products.Weare work in the Financial System, Customer Service, Human Resources and Truck tracking System where we process a lot of data and analytics dashboards. The latest project involved: Teamwork skills, TDD, JavaScript and its Frameworks, Java and its Frameworks, Node.js, Express, React, Html5, AngularJs, Oracle, JUnit, Git and a lot of technologies Front-end, Back-end and Mobile Developer. Too we are making customizations in the Oracle E-Business Suite 12." where id = 1 ')
    //await db.run('update company set descricao = "The Mobile Developer of the LG Eletronics. Development andrefinecode,bug \ncorrection and tests on cell phones middleware platforms to Country Adaptation process. All skills we used like: Android, Java, Git, JUnit, C++" where id = 2 ')
    //await db.run('update company set descricao = "I was leading of mobile solutions and Analyst in all business company products. \nWe were work as focused in the System Sales Force where we process a lot of data and analytics \ndashboards. All skills we used like Android, Java, C#, Git and SQL" where id = 3 ')

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