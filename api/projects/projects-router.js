const express = require('express')
const Projects = require('./projects-model')
const {
  validateProjectId,
  validateProject,
} = require('../middleware/middleware')

const router = express.Router()

router.get('/', (req, res, next) => {
  Projects.get()
    .then((project) => {
      res.status(200).json(project)
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id', validateProjectId, (req, res, next) => {
  const { id } = req.params

  Projects.get(id)
    .then((project) => {
      res.status(200).json(project)
    })
    .catch((err) => {
      next(err)
    })
})

router.post('/', validateProject, (req, res, next) => {
  const newProject = req.body

  Projects.insert(newProject)
    .then((project) => {
      res.status(201).json(project)
    })
    .catch((err) => {
      next(err)
    })
})

router.put('/:id', validateProjectId, validateProject, (req, res, next) => {
  const { id } = req.params
  const changes = req.body

  Projects.update(id, changes)
    .then((project) => {
      res.status(200).json(project)
    })
    .catch((err) => {
      next(err)
    })
})

router.delete('/:id', validateProjectId, (req, res, next) => {
  const { id } = req.params

  Projects.remove(id)
    .then(() => {
      res.end()
    })
    .catch((err) => {
      next(err)
    })
})

router.get('/:id/actions', validateProjectId, (req, res, next) => {
  const { id } = req.params

  Projects.getProjectActions(id)
    .then((action) => {
      res.status(200).json(action)
    })
    .catch((err) => {
      next(err)
    })
})

router.use((err, req, res) => {
  res.status(500).json({
    customMessage: 'Something failed',
    message: err.message,
  })
})

module.exports = router
