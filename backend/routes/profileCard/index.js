const express = require('express');
const router = express.Router();

const asyncWrapper = require('../../context/asyncWrapper');
const { profile_card: ProfileCard } = require('../../models');

router.get('/', asyncWrapper(async (req, res) => {
  const list = await ProfileCard.findAll();

  res.json({
    list,
  });
}));

module.exports = router;
