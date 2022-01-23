const ecdsa = require("elliptic"); //타원 곡선 디지털 서명 알고리즘
const ec = new ecdsa.ec("secp256k1");
const CryptoJS = require("crypto-js");

// 블록체인에서 private key는 절대 어디 담기지 않는다.
// 본인만 가지고 있고 어디 담길 때는 public key로만 담긴다

// 코인(amount)을 누군가(address)에게 보낸다는 정보
// 코인을 푸는 역할 (unlock)
class TxOut {
  constructor(address, amount) {
    this.address = address; // 공개키
    this.amount = amount; // 코인의 양
    // address에게 amount만큼 보내겠다
  }
}

// 코인이 어디로부터 왔는지에 대한 정보
// 코인을 잠그는 역할 (relock)
class TxIn {
  constructor(txOutId, txOutIndex, signature) {
    /////////////////////////////////////////////
    // 아이디 이녀석은 어떻게 부여되는 값이란 말인가
    this.txOutId = txOutId;
    // TxOut 의 인덱스
    this.txOutIndex = txOutIndex;
    // 비밀키로부터 생성된 서명
    this.signature = signature;
  }
}

// 트랜잭션 클래스
class Transaction {
  constructor(id, txIns, txOuts) {
    // 트랜잭션 컨텐트(txIns, txOuts)로부터 계산된 해시값
    this.id = id;
    // TxIn들을 담아둘 배열
    this.txIns = txIns;
    // TxOut들을 담아둘 배열
    this.txOuts = txOuts;
  }
}

// 트랜잭션의 id를 만들어주는 함수
const getTransactionId = (transaction) => {
  // 트랜잭션에 들어있는 [트랜잭션인풋들]을 map 함수를 통해
  // 하나씩 txOutId와 txOutIndex를 더한 값으로 바꿔주고
  // [txOutId+txOutIndex로 바뀐 트랜잭션인풋들]을
  // reduce 메서드를 통해 다 더해준다
  // (txOutId+txOutIndex)+(txOutId+txOutIndex)+.....반복
  const txInContent = transaction.txIns
    .map((txIn) => {
      txIn.txOutId + txIn.txOutIndex;
    })
    .reduce((a, b) => a + b, ""); // ""는 reduce로 더하기 전 초깃값이 ""라는 뜻

  // 위와 같은 작업을 트랜잭션 아웃풋에도 하고
  const txOutContent = transaction.txOuts
    .map((txOut) => {
      txOut.address + txOut.amount;
    })
    .reduce((a, b) => a + b, "");

  // 두 결과물 txInContent, txOutContent 또한 더한 후 암호화한다.
  // 이 암호화된 값이 트랜잭션의 id값이 될 것이다.
  return CryptoJS.SHA256(txInContent + txOutContent).toString();
};

// 트랜잭션을 임의로 만드는 함수
function generateTransaction() {
  const trans = new Transaction();
  trans.id = "";
  trans.txIns = [];
  trans.txOuts = [];
  for (let i = 0; i < 5; i++) {
    const txIn = new TxIn("Id : " + (i + 1), i, "");
    trans.txIns.push(txIn);
    const txOut = new TxOut("address : ", 30);
    trans.txOuts.push(txOut);
  }
  trans.id = getTransactionId(trans);
  return trans;
}
function generateTransaction2() {
  const trans = new Transaction();
  trans.id = "";
  trans.txIns = [];
  trans.txOuts = [];
  for (let i = 9; i < 11; i++) {
    const txIn = new TxIn("Id : " + (i + 1), i, "");
    trans.txIns.push(txIn);
    const txOut = new TxOut("address : ", 10);
    trans.txOuts.push(txOut);
  }
  trans.id = getTransactionId(trans);
  return trans;
}
// const newTransaction = generateTransaction();
// getTransactionId(newTransaction);
let newTransactions = [];
newTransactions.push(generateTransaction());
newTransactions.push(generateTransaction2());
// console.log(newTransactions);

// 서명 만들어주는 녀석
const signTxIn = (transaction, txInIndex, privateKey, aUnspentTxOuts) => {
  const txIn = transaction.txIns[txInIndex];
  const dataToSign = transaction.id;
  const referencedUnspentTxOut = findUnspentTxOut(
    txIn.txOutId,
    txIn.txOutIndex,
    aUnspentTxOuts
  );
  const referencedAddress = referencedUnspentTxOut.address;
  const key = ec.keyFromPrivate(privateKey, "hex");
  const signature = toHexString(key.sign(dataToSign).toDER());
  return signature;
};

class UnspentTxOut {
  constructor(txOutId, txOutIndex, address, amount) {
    this.txOutId = txOutId;
    this.txOutIndex = txOutIndex;
    this.address = address;
    this.amount = amount;
  }
}

let unspentTxOuts = [];
// 이거 확인할 수 있는 예제 만들기 주말숙제

function 미사용트랜잭션아웃풋들주워담기(newTransactions) {
  // console.log(newTransactions[0].id);
  // console.log(newTransactions[0].txOuts);
  const newUnspentTxOuts = newTransactions
    .map((t) => {
      return t.txOuts.map(
        (txOut, index) =>
          new UnspentTxOut(t.id, index, txOut.address, txOut.amount)
      );
    })
    // a.concat(b) a배열 뒤에 b배열을 붙여 합쳐주는 메서드
    .reduce((a, b) => a.concat(b), []);
  return unspentTxOuts.push(newUnspentTxOuts);
}
미사용트랜잭션아웃풋들주워담기(newTransactions);
console.log(unspentTxOuts);
