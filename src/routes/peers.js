const express = require('express');
const router = express.Router();
const P2P = require('../p2p');

const { connectToPeers } = P2P;

router.post("/", (req, res) => {
  const { body: { peer } } = req;
  connectToPeers(peer);
  res.send("gg");
});

module.exports = router;