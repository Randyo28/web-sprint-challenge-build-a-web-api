const server = require('./api/server')
const cors = require('cors')
require('dotenv').config()

const PORT = process.env.PORT

if (process.env.NODE_ENV === 'development') {
  server.use(cors())
}

server.use('*', (req, res) => {
  res.json('Hey Grader!')
})

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
