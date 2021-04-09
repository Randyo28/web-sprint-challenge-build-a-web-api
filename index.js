const express = require('express')
const server = express()

server.use(express.json())
server.use('*', (req, res) => {
  res.json('Hey Grader!')
})

server.listen(5000, () => {
  console.log('Server running on port 5000')
})
