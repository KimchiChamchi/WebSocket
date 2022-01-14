// 블록 구조가 유요한지
// 현재 블록의 인덱스가 이전블록의 인덱스보다 1만큼 큰지
// 이전 블록의 해시값과 현재 블록의 이전 해시가 같은지
// 데이터 필드로부터 계산한 머클루트와 블록 헤더의 머클루트가 동일한지
const merkle = require("merkle");
const {
  isValidTimestamp,
  createHash,
  hashMatchesDifficulty,
} = require("./chainedBlock"); //전에만든 블록생성파일에서 블러와
function isValidBlockStructure(block) {
  //블럭에 타입이 맞는지 확인하는 함수
  return (
    typeof block.header.version === "string" && //버전이 스트링인지
    typeof block.header.index === "number" && //그리고 넘버인지
    typeof block.header.previousHash === "string" && //그전 해시값인지
    typeof block.header.timestamp === "number" && //만든시간
    typeof block.header.merkleRoot === "string" && //머클루트
    typeof block.header.difficulty === "number" &&
    typeof block.header.nonce === "number" &&
    typeof block.body === "object"
  ); //body데이터
}

function isValidNewBlock(newBlock, previousBlock) {
  //이전블럭과 비교하는 함수
  if (isValidBlockStructure(newBlock) === false) {
    //새로운블럭이 타입검사기
    console.log("invalid Block Structure/잘못된블럭에 타입입니다.");
    return false;
  } else if (newBlock.header.index !== previousBlock.header.index + 1) {
    //새로만든 블럭이랑 그전블럭에 인덱스가 같지않은면
    console.log("invalid index/인덱스가 잘못되어있습니다.");
    return false;
  } else if (createHash(previousBlock) !== newBlock.header.previousHash) {
    //이전해시값 비교
    console.log("invalid previousHash/해시값이 잘못되어있습니다.");
    return false;
  } else if (
    (newBlock.body.length === 0 &&
      "0".repeat(64) !== newBlock.header.merkleRoot) ||
    (newBlock.body.length !== 0 &&
      merkle("sha256").sync(newBlock.body).root() !==
        newBlock.header.merkleRoot)
  ) {
    //바디정보가 없거나 && reqeat(64)가아니거나 || 바디정보가 는데 && merkleroot랑 새로운 머클루트가 다르면 false
    console.log("invalid merkleRoot/머클루트가 잘못되었습니다.");
    return false;
  } else if (!isValidTimestamp(newBlock, previousBlock)) {
    //생성시간이 전시간이랑 빠르거나 너무느릴때
    console.log("invalid Timestamp/타임스템프 시간이 이상해요");
    return false;
  } else if (
    !hashMatchesDifficulty(createHash(newBlock), newBlock.header.difficulty)
  ) {
    //할필요가있나? 왜있는지는 모르겠음
    console.log("invalid hash");
    return false;
  }
  console.log("유효성검사 오류없음");
  return true;
}

module.exports = { isValidNewBlock };
