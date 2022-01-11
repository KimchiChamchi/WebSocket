import React, { useState } from 'react'
import axios from 'axios';

function Test() {
    const [블록데이터, set블록데이터] = useState("")    //생성데이터
    const [peer, setPeer] = useState("")    //생성데이터
    const [peers, setPeers] = useState("")    //생성데이터
    const [Wallet, setWallet] = useState([])
    const [chainBlocks, setChainBlocks] = useState([])    //db불러온거

    const bcMaker = async () => {
        const data = 블록데이터
        console.log(data.length)
        if (data.length === 0) {    //데이터없으면 리네임
            return alert(`데이터를 넣어주세용`);
        }
        await axios.post(`http://localhost:3001/mineBlock`, { data: [data] })
            .then(req => console.log(req.data))
    }

    const connect = async () => {
        await axios.get(`http://localhost:3001/Blocks`)
            .then(req => setChainBlocks(req.data))
    }

    const address = async () => {
        await axios.get(`http://localhost:3001/address`)
            .then(req => setWallet(req.data.address))
        console.log(Wallet)
    }
    const stop = async () => {
        await axios.post(`http://localhost:3001/stop`)
            .then(req => alert(req.data))
    }


    const getpeers = async () => {
        await axios.get(`http://localhost:3001/peers`)
            .then(req => setPeers(req.data))

        if (peers.length === 0) {
            return alert(`연결된 피어가없어요`);
        }
    }

    const addPeers = async () => {
        const P = peer
        if (P.length === []) {    //데이터없으면 리네임
            return alert(`peer내용을 넣어주세용`);
        }
        await axios.post(`http://localhost:3001/addPeers`, { peers: [`ws://localhost:${P}`] })
            .then(req => console.log(req.data))
    }


    const [shownBlock, setshownBlock] = useState({});

    const toggleComment = (blockchain) => {
        console.log([blockchain.header.index])
        setshownBlock((prevShownComments) => ({
            ...prevShownComments,
            [blockchain.header.index]: !prevShownComments[blockchain.header.index]
        }));
    };

    return (
        <div>
            <button onClick={address} >지갑얍</button> <button onClick={stop} >서버종료</button> <br />
            <p> < b>지갑 : </b> {Wallet}</p>

            <input type="text" onChange={(e) => { setPeer(e.target.value) }} value={peer} /> <br />
            <button onClick={addPeers} >피어연결</button> <br />
            <button onClick={getpeers}>피어 연결목록확인</button> <br />
            <p> < b>peers :  </b> {peers}</p>
            <input type="text" onChange={(e) => { set블록데이터(e.target.value) }} value={블록데이터} /> <br />
            <button onClick={bcMaker} >블록만들기 얍~</button> <br />
            <button onClick={connect}  >블록체인 목록 불러오기</button> <br />

            {
                chainBlocks.map((a) => {
                    return (
                        < ul >
                            <h4 style={{ mouse: "pointer" }} onClick={() => { toggleComment(a) }} >{a.header.index}번째   BODY:{a.body[0]} </h4>
                            {shownBlock[a.header.index] ? (
                                <li> 정보
                                    < li > index : {a.header.index} </li>
                                    <li > previousHash : {a.header.previousHash} </li>
                                    <li > timestamp : {a.header.timestamp} </li>
                                    <li > merkleRoot : {a.header.merkleRoot} </li>
                                    <li > difficulty : {a.header.difficulty} </li>
                                    <li > nonce : {a.header.nonce} </li>
                                </li >
                            ) : null}


                        </ul >
                    )
                })
            }


        </div >
    )
}


export default Test;