const CryptoJS = require("crypto-js");

//블럭 structure
class Block {
  constructor(index, hash, previousHash, timestamp, data) {
    this.index = index;
    this.hash = hash;
    this.previousHash = previousHash;
    this.timestamp = timestamp;
    this.data = data;
  }
}

//제네시스 블럭
const genesisBlock = new Block(
    0,
    "EFDE93512B6EA34710F7F16855390EB19E702220C7FBD5B9B4CCF4B6D6C9047A",
    null,
    new Date().getTime() / 1000,
    "Genesis block of minichain"
);

let blockchain = [genesisBlock];

const getNewestBlock = () => blockchain[getBlockchain().length -1];

const getTimeStamp = () => new Date().getTime() / 1000;

const getBlockchain = () => blockchain;

//해시 만드는넘
const createHash = (index, previousHash, timestamp, data) =>
  CryptoJS.SHA256(index + previousHash + timestamp + JSON.stringify(data).toString()).toString();

//새 블럭 만드는넘
const createNewBlock = data => {
  const previousBlock = getNewestBlock();
  const newBlockIndex = previousBlock.index +1;
  const newTimestamp = getTimeStamp();
  const newHash = createHash(
      newBlockIndex,
      previousBlock.hash,
      newTimestamp,
      data
  );
  const newBlock = new Block(
    newBlockIndex,
    newHash,
    previousBlock.hash,
    newTimestamp,
    data
  );
  addBlockToChain(newBlock);
  return newBlock;
};

const getBlockHash = (block) => createHash(block.index, block.previousHash, block.timestamp, block.data);

//블럭 맞는지 판별하는 넘
const isBlockValid = (candidateBlock, lastestBlock) => {
  //블럭 구조가 유효하지 않음
  if(!isBlockStructureValid(candidateBlock)) {
    console.log("The candidate block structure is not valid");
    return false;
  }
  //인덱스 순서가 안맞음
  if(lastestBlock.index + 1 !== candidateBlock.index) {
    console.log("The candidate block doesnt hava a valid index");
    return false;
  }
  //이전블럭 해시가 생성된 이전 해시가 아님
  if(lastestBlock.hash !== candidateBlock.previousHash) {
    console.log("The previousHash of the candidate block is not the hash of the lastest block")
    return false;
  }
  //해시 생성을 해봤더니 이넘이 가진 해시가 아님
  if(getBlockHash(candidateBlock) !== candidateBlock.hash) {
    console.log("the hash of this block is invalid");
    return false;
  }
  return true;
};

//블록의 구조가 유효한지 판별한
const isBlockStructureValid = (block) => {
  return (
    typeof block.index === "number" &&
    typeof block.hash === "string" &&
    typeof block.previousHash === "string" &&
    typeof block.timestamp === "number" &&
    typeof block.data === "string"
  );
};

//체인을 검증하자
const isChainValid = candidateChain => {
  //제네시스를 검증하는넘
  const isGenesisValid = block => JSON.stringify(block) === JSON.stringify(genesisBlock);
  if(!isGenesisValid(candidateChain[0])) {
    console.log("The candidate chain's genesisblock is not same as our genesisblock")
    return false;
  }

  //이후 체인을 검증 하자
  for(let i = 1; i < candidateChain.length; i++) {
    if(!isBlockValid(candidateChain[i], candidateChain[i - 1])) {
      console.log();
      return false;
    }
  }
  return true;
};

//체인을 교체한다
const replaceChain = candidateChain => {
  //항상 긴 체인을 선호한
  if(isChainValid(candidateChain) && candidateChain.length > getBlockchain().length) {
    blockchain = candidateChain;
    return true;
  }
  return false;
};

//블럭을 체인에 더한다
const addBlockToChain = candidateBlock => {
  if(isBlockValid(candidateBlock, getNewestBlock())) {
    getBlockchain().push(candidateBlock);
    return true;
  }
  return false;
};


module.exports = {
  getBlockchain,
  createNewBlock,
  getLastBlock: getNewestBlock,
  isBlockStructureValid,
  isBlockValid
}