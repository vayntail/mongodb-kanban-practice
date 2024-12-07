const express = require("express");
const router = express.Router();
const Card = require("../models/card");

// /api/tabs/:tabId/columns/:columnId/cards
router
  .route(":columnId/cards")
  // get all cards for a specific column
  .get(async (req, res, next) => {
    try {
      const cards = await Cards.find({ columnId: req.params.columnId });
      res.status(200).json(cards);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  // create a new card in column
  .post(async (req, res, next) => {
    try {
      req.body.tabId = req.params.tabId;
      req.body.columnId = req.params.columnId;
      const newCard = await Card.create(req.body);
      res.status(200).json(newCard);
    } catch (err) {
      res.status(400).send(err);
    }
  });

router
  .route(":columnId/cards/:cardId")
  // edit a specific note
  .patch(async (req, res, next) => {
    try {
      const { title, content } = req.body;
      const updatedCard = await Card.findByIdAndUpdate(
        req.params.id, // find id
        { title: title },
        { content: content },
        { new: true } // return updated card
      );
      res.status(200).json(updatedCard);
    } catch (err) {
      res.status(400).send(err);
    }
  })
  // delete a specific note
  .post(async (req, res, next) => {
    try {
      const deletedCard = await Card.findByIdAndDelete(req.params.cardId);
      res.status(200).json(deletedCard, " was deleted.");
    } catch (err) {
      res.status(400).send(err);
    }
  });

module.exports = router;
