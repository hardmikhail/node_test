const http = require('http')
require('dotenv').config()
const port = process.env.NODE_DOCKER_PORT
const url = `https://jsonplaceholder.typicode.com/todos`
const Sequelize = require('sequelize')
const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.DB_USER,
    process.env.DB_PASSWORD,
    {
      dialect: process.env.DB_DIALECT,
      host: process.env.DB_HOST,
      define: {
        timestamps: false
      }
    })

const errorsList = {
  SequelizeUniqueConstraintError: 'The object already exists in DB',
  SequelizeDatabaseError: 'Wrong data',
  SequelizeConnectionError: 'Error connection to DB',
  TypeError: 'Parsing error',
  SequelizeHostNotFoundError: 'DB not found'
}

const Todo = sequelize.define('todo', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  userId: {
    type: Sequelize.INTEGER,
  },
  title: {
    type: Sequelize.STRING
  },
  completed: {
    type: Sequelize.BOOLEAN
  }
})

function getResponse(url) {
  return fetch(url).then(response => {
    if (response.ok) {
      return response.text()
    }
  }).catch((err) => {throw err})
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' })

  if (req.url == '/') {
    res.end(`Go to localhost:${port}/(1-200)`)
  } else {
    if (req.url != '/favicon.ico') {
      try {
        let responseFromApi =  await getResponse(url + req.url)
        let responseFromApiJson =  JSON.parse(responseFromApi)
        Todo.create(responseFromApiJson)
          .then(() => res.end(`The object was saved in DB at #${responseFromApiJson.id}\n\n` + responseFromApi))
          .catch(err => {
            if (err.name in errorsList) {
              res.end(errorsList[err.name])
            }
          })
      } catch (err) {
        res.end(errorsList[err.name] || 'Wrong data')
      }
    }
  }
})

sequelize.sync()
  .then( () => {
    server.listen(port, () => {
      console.log(`Server is running on localhost:${port}`)
    })
  })
  .catch(err => {
    if (err.name in errorsList) {
    console.log(errorsList[err.name])
    console.log(err)
  } else {
    console.log(err, 'Something went wrong')
  }
})