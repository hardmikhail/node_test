const http = require('http');
const url = `https://jsonplaceholder.typicode.com/todos`;
const Sequelize = require('sequelize');
const sequelize = new Sequelize('node_db', 'postgres', 'root', {
  dialect: 'postgres',
  define: {
    timestamps: false
  }
});
const errorList = {
  SequelizeUniqueConstraintError: 'The object is already in DB',
  SequelizeDatabaseError: 'Wrong data',
  TypeError: 'Go to localhost:8000/(1-200)'
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
});

function sendRequest(url) {
  return fetch(url).then(response => response.text())
}

const server = http.createServer(async (req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  let responseFromApi = await sendRequest(url + req.url)
  let responseFromApiJson = JSON.parse(responseFromApi);
  Todo.create(responseFromApiJson)
    .then(() => res.end(`The object was joined in DB at #${responseFromApiJson.id}\n\n` + responseFromApi))
    .catch(err => {
      if (err.name in errorList) {
        res.end(errorList[err.name])
      } else {
        res.end('Something went wrong')
      }
    })
    
});

sequelize.sync()
  .then( () => {
    server.listen(8000, () => {
      console.log('Server runs')
    })
  })
  .catch(err => console.log(err));