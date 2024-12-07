const express = require("express");
const Tab = require("../models/tab");
const Column = require("../models/column");
const router = express.Router();

router
  .route("/:tabId/columns")
  // get all columns for tab
  .get(async (req, res, next) => {
    try {
      const columns = await Column.find({ tabId: req.params.tabId });
      res.status(200).json(columns);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  // create a column
  .post(async (req, res, next) => {
    try {
      req.body.tabId = req.params.tabId;
      const newColumn = await Column.create(req.body);
      res.status(200).json(newColumn);
    } catch (err) {
      res.status(400).send(err);
    }
  });

router
  .route("/:tabId/columns/:columnId")
  // change column name by id
  .patch(async (req, res, next) => {
    try {
      const { name } = req.body;
      const updatedColumn = await Column.findByIdAndUpdate(
        req.params.columnId, // find id
        { name: name },
        { new: true } // return updated tab
      );
      res.status(200).json(updatedColumn);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  // delete column by id
  .delete(async (req, res, next) => {
    try {
      const deletedColumn = await Column.findByIdAndDelete(req.params.columnId);
      res.status(200).json(deletedColumn, " was deleted.");
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router;
