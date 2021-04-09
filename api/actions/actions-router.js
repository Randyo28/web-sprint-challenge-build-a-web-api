// Write your "actions" router here!
const express = require('express')
const Action = require('./actions-model')
const {
  logger,
  validateActionId,
  validateAction,
} = require('../middleware/middleware')

const router = express.Router()

router.get('/', logger, (req, res, next) => {
  Action.get()
    .then((action) => {
      res.status(200).json(action)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', logger, validateActionId, (req, res, next) => {
  const { id } = req.params
  Action.get(id)
    .then(() => {
      res.json(id)
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/', validateAction, (req, res, next) => {
  const newAction = req.body

  Action.insert(newAction)
    .then((action) => {
      res.status(201).json(action)
    })
    .catch((err) => {
      next(err)
    })
})

router.put('/:id', validateActionId, validateActionId, (req, res, next) => {
  const { id } = req.params
  const changes = req.body

  Action.update(id, changes)
    .then((action) => {
      res.status(200).json(action)
    })
    .catch((err) => {
      next(err)
    })
})
// router.delete('/:id', (req, res, next) => {})

router.use((err, req, res) => {
  res.status(500).json({
    customMessage: 'Something failed',
    message: err.message,
  })
})

module.exports = router
