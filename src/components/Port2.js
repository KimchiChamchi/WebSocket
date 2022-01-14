import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import { Space, Row, Col, Badge, Card, Input, Button } from "antd";

function Port2() {
  const [블록데이터, set블록데이터] = useState(""); //생성데이터
  const [peer, setPeer] = useState(""); //생성데이터
  const [peers, setPeers] = useState(" "); //생성데이터
  const [Wallet, setWallet] = useState([]);
  const [chainBlocks, setChainBlocks] = useState([]); //db불러온거
  const reverse = [...chainBlocks].reverse(); //배열뒤집어주기

  const bcMaker = async () => {
    const data = 블록데이터;
    if (data.length === 0) {
      //데이터없으면 리네임
      return alert(`데이터를 넣어주세용`);
    }
    await axios
      .post(`http://localhost:3002/mineBlock`, { data: [data] })
      .then((req) => alert(req.data));
  };

  const connect = async () => {
    await axios
      .get(`http://localhost:3002/Blocks`)
      .then((req) => setChainBlocks(req.data));
  };

  const address = async () => {
    await axios
      .get(`http://localhost:3002/address`)
      .then((req) => setWallet(req.data.address));
    console.log(Wallet);
  };
  const stop = async () => {
    await axios
      .post(`http://localhost:3002/stop`)
      .then((req) => alert(req.data));
  };

  const getpeers = async () => {
    axios.get(`http://localhost:3002/peers`).then((req) => setPeers(req.data));
  };
  if (peers.length === 0) {
    return setPeers(`연결된 피어가없어요`);
  }

  const addPeers = async () => {
    const P = peer;
    if (P.length === 0) {
      //데이터없으면 리네임
      return alert(`peer내용을 넣어주세용`);
    }
    await axios
      .post(`http://localhost:3002/addPeers`, {
        peers: [`ws://localhost:${P}`],
      })
      .then((req) => alert(req.data));
  };
  const [shownBlock, setshownBlock] = useState({});

  const toggleComment = (blockchain) => {
    console.log([blockchain.header.index]);
    setshownBlock((prevShownComments) => ({
      ...prevShownComments,
      [blockchain.header.index]: !prevShownComments[blockchain.header.index],
    }));
  };

  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState(1000);
  const [isRunning, setIsRunning] = useState(false);
  const [ok, setOk] = useState(false);

  useInterval(
    () => {
      const data = 블록데이터 || "2번채굴기입니다.";
      setIsRunning(false);
      console.log("데이터전송");
      axios
        .post(`http://localhost:3002/mineBlock`, { data: [data] })
        .then((req) => {
          console.log(req.data);
          setIsRunning(true);
        });

      setCount(count + 1);
    },
    isRunning && ok ? delay : null
  );

  function handleDelayChange(e) {
    setDelay(Number(e.target.value));
  }

  return (
    <div>
      <Row>
        <Col span={24}>
          {" "}
          <h1>3002포트 WS6002입니다.</h1>
        </Col>
      </Row>
      <br />
      <Button style={{ marginTop: 5 }} type="dashed" onClick={address}>
        지갑확인
      </Button>
      {/* <Button style={{ marginLeft: 40, }} type="dashed" onClick={stop}>서버종료</Button> */}

      <div className="wallet_bublic_key_div">
        <div className="wallet_bublic_key_div-title">
          <b>지갑 : </b>
        </div>
        <div className="wallet_bublic_key_div-content">{Wallet}</div>
      </div>
      <hr className="boundary_line"></hr>
      <Col span={20}>
        <Input
          addonBefore="ws://localhost:"
          placeholder=" ex)6001 "
          onChange={(e) => {
            setPeer(e.target.value);
          }}
          value={peer}
        />
      </Col>
      <Button style={{ marginTop: 5 }} type="dashed" onClick={addPeers}>
        피어연결
      </Button>
      <Button style={{ marginLeft: 40 }} type="dashed" onClick={getpeers}>
        피어 연결목록확인
      </Button>
      <p>
        {" "}
        <b style={{ marginLeft: 10 }}> peers : </b> {peers}
      </p>
      <hr className="boundary_line"></hr>
      <Col span={20}>
        <Input
          placeholder="블록내용을 입력해주세요"
          type="text"
          onChange={(e) => {
            set블록데이터(e.target.value);
          }}
          value={블록데이터}
        />
      </Col>
      <Button
        style={{ marginTop: 5, marginBottom: 10 }}
        type="dashed"
        onClick={bcMaker}
      >
        블록만들기 얍~
      </Button>
      <Button style={{ marginLeft: 30 }} type="dashed" onClick={connect}>
        블록체인 목록 불러오기
      </Button>
      <Button
        style={{ marginLeft: 30 }}
        type="dashed"
        onClick={() => {
          alert("채굴을 시작합니당.");
          setIsRunning(true), setOk(true);
        }}
      >
        채굴
      </Button>
      <Button
        style={{ marginLeft: 30 }}
        type="dashed"
        onClick={() => {
          alert("채굴을 중지합니당.");
          setOk(false);
        }}
      >
        중지
      </Button>

      <h1>자동 채굴양 {count}</h1>
      <br />
      <input value={delay} onChange={handleDelayChange} />

      {reverse.map((a) => {
        return (
          <ul>
            <h4
              style={{ mouse: "pointer" }}
              onClick={() => {
                toggleComment(a);
              }}
            >
              <Col span={20}>
                <Badge.Ribbon text="Block Chain">
                  <Card size="small">
                    {a.header.index}번 블록 Body내용:{a.body}
                  </Card>
                </Badge.Ribbon>
              </Col>
            </h4>

            {shownBlock[a.header.index] ? (
              <Col span={20}>
                <Row justify="end">
                  <Col span={23}>
                    <Card size="small" title="정보">
                      <li> index : {a.header.index} </li>
                      <li> previousHash : {a.header.previousHash} </li>
                      <li> timestamp : {a.header.timestamp} </li>
                      <li> merkleRoot : {a.header.merkleRoot} </li>
                      <li> difficulty : {a.header.difficulty} </li>
                      <li> nonce : {a.header.nonce} </li>
                    </Card>
                  </Col>
                </Row>
              </Col>
            ) : null}
          </ul>
        );
      })}
    </div>
  );
}
function useInterval(callback, delay) {
  const savedCallback = useRef();

  // Remember the latest function.
  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  // Set up the interval.
  useEffect(() => {
    function tick() {
      savedCallback.current();
    }
    if (delay !== null) {
      let id = setInterval(tick, delay);
      return () => clearInterval(id);
    }
  }, [delay]);
}

export default Port2;
