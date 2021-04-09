const express = require('express')
const server = express()
const actionRouter = require('./actions/actions-router')

server.use(express.json())
server.use('/api/action', actionRouter)

module.exports = server
