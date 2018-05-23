const express = require("express")
    , bodyParser = require("body-parser")
    , morgan = require("morgan")
    , Blockchain = require("./blockchain");

const { getBlockchain, createNewBlock } = Blockchain;

const PORT = 3000;

const app = express();

app.use(bodyParser.json);
app.use(morgan("combined"));

app.listen(PORT, () => console.log(`minichain server start!! : ${PORT}`));

app.get("/blocks", (req, res) => {
  console.log("blocks");
  res.send(getBlockchain());
});

app.post("/blocks", (req, res) => {
  const { body: { data } } = req;
  const newBlock = createNewBlock(data);
  res.send("gg");
});

