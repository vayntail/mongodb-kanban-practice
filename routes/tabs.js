const express = require("express");
const Tab = require("../models/tab");
const router = express.Router();

router
  .route("/")
  // get all tabs
  .get(async (req, res, next) => {
    try {
      const tabs = await Tab.find({});
      res.status(200).json(tabs);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  // create a new tab using name
  .post(async (req, res, next) => {
    const lastTab = await Tab.findOne().sort({ order: -1 });
    const tabOrder = lastTab ? lastTab.order : 0;
    req.body.order = tabOrder + 1;
    console.log(req.body);
    try {
      const newTab = await Tab.create(req.body);
      res.status(200).json(newTab);
    } catch (err) {
      res.status(400).send(err);
    }
  });

router
  .route("/:id")
  // change tab name by id
  .patch(async (req, res, next) => {
    try {
      const { name } = req.body;
      const updatedTab = await Tab.findByIdAndUpdate(
        req.params.id, // find id
        { name: name },
        { new: true } // return updated tab
      );

      res.status(200).json(updatedTab);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  // delete tab by id
  .delete(async (req, res, next) => {
    try {
      const deletedTab = await Tab.findByIdAndDelete(req.params.id);
      res.status(200).json(deletedTab, " was deleted.");
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router;
