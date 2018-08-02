const express = require('express');
const router = express.Router();
const Blockchain = require("../blockchain");
/*

/!* GET users listing. *!/
router.get('/', (req, res, next) => {
  res.send('respond with a resource');
});
*/
const { getBlockchain, createNewBlock } = Blockchain;

router.get("/", (req, res) => {
  //console.log("blocks");
  res.send(getBlockchain());
});

router.post("/", (req, res) => {
  const { body: { data } } = req;
  const newBlock = createNewBlock(data);
  res.send(newBlock);
});

module.exports = router;
