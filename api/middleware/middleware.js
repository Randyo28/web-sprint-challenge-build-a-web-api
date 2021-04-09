const actions = require('../actions/actions-model')
const projects = require('../projects/projects-model')

function logger(req, res, next) {
  console.log(`This ${req.method}, is coming from ${req.url}
  at ${Date.now()}`)

  next()
}

function validateActionId(req, res, next) {
  const { id } = req.params

  actions
    .get(id)
    .then((action) => {
      if (!action) {
        res.status(404).json({ message: 'action not found' })
      } else {
        req.action = action
        next()
      }
    })
    .catch((e) => {
      res.status(500).json(e.message)
    })
}

function validateAction(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing required fields' })
  } else if (!req.body.description || !req.body.notes || !req.body.project_id) {
    res.status(400).json({ message: 'missing one or more required fields' })
  } else {
    next()
  }
}

function validateProjectId(req, res, next) {
  const { id } = req.params

  projects
    .get(id)
    .then((project) => {
      if (!project) {
        res.status(404).json({ message: 'project not found' })
      } else {
        req.project = project
        next()
      }
    })
    .catch((e) => {
      res.status(500).json(e.message)
    })
}

function validateProject(req, res, next) {
  if (Object.keys(req.body).length === 0) {
    res.status(400).json({ message: 'missing required fields' })
  } else if (!req.body.name || !req.body.description) {
    res.status(400).json({ message: 'missing one or more required fields' })
  } else {
    next()
  }
}

module.exports = {
  logger,
  validateActionId,
  validateAction,
  validateProjectId,
  validateProject,
}
