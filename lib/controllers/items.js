const { Router } = require('express');
const authenticate = require('../middleware/authenticate');
const authorizedItem = require('../middleware/authorizedItem');
const Item = require('../models/Item');

// TO DO - implement items CRUD
module.exports = Router()
  .post('/', authenticate, async (req, res, next) => {
    try {
      const item = await Item.insert({ ...req.body, user_id: req.user.id });
      res.json(item);
    } catch (err) {
      next(err);
    }
  })
  .get('/', authenticate, async (req, res, next) => {
    try {
      const items = await Item.getAll(req.user.id);
      res.json(items);
    } catch (err) {
      next(err);
    }
  })
  .put('/:id', authenticate, authorizedItem, async (req, res, next) => {
    try {
      const item = await Item.updateById(req.params.id, req.body);
      res.json(item);
    } catch (err) {
      next(err);
    }
  })
  .delete('/:id', authenticate, authorizedItem, async (req, res, next) => {
    try {
      const item = await Item.delete(req.params.id);
      res.json(item);
    } catch (error) {
      next(error);
    }
  });

