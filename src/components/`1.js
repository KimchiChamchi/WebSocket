const { useState, Fragment } = React;

const SearchResults = (props) => {
    const [shownComments, setShownComments] = useState({});

    const toggleComment = (blockchain) => {
        setShownComments((prevShownComments) => ({
            ...prevShownComments,
            [blockchain.header.index]: !prevShownComments[blockchain.header.index],
        }));
    };

    return (
        <Fragment>
            {" "}
            {props.search_results.map((blockchain) => (
                <div key={blockchain.header.index}>
                    {" "}
                    <button onClick={() => toggleComment(blockchain)}>
                        블록 정보를 보여줘! 수발!
                    </button>
                    <div>
                        {blockchain.header.index} {blockchain.body[0]}
                    </div>{" "}
                    {shownComments[blockchain.header.index] ? (
                        <div>
                            <h4>
                                이건 인덱스{blockchain.header.index}의 블록정보<br></br>
                            </h4>
                            <div className="block_info-list">
                                <div>나는 버전</div>
                                <div>{blockchain.header.version}</div>
                            </div>
                            <div className="block_info-list">
                                <div>나는 인덱수</div>
                                <div>{blockchain.header.index}</div>
                            </div>
                            <div className="block_info-list">
                                <div>나는 해시</div>
                                <div>{blockchain.header.previousHash}</div>
                            </div>
                            <div className="block_info-list">
                                <div>나는 시간도장</div>
                                <div>{blockchain.header.timestamp}</div>
                            </div>
                            <div className="block_info-list">
                                <div>나는 머클뿌리</div>
                                <div>{blockchain.header.merkleRoot}</div>
                            </div>
                            <div className="block_info-list">
                                <div>나는 나니도</div>
                                <div>{blockchain.header.difficulty}</div>
                            </div>
                            <div className="block_info-list">
                                <div>나는 삽질</div>
                                <div>{blockchain.header.nonce}</div>
                            </div>
                            <div className="block_info-list">
                                <div>나는 블록명</div>
                                <div>{blockchain.body[0]}</div>
                            </div>
                        </div>
                    ) : null}    {" "}
                </div>
            ))}{" "}
        </Fragment>
    );
};

ReactDOM.render(
    <SearchResults
        search_results={[
            {
                header: {
                    version: "1.0.0",
                    index: 0,
                    previousHash:
                        "0000000000000000000000000000000000000000000000000000000000000000",
                    timestamp: 1231006505,
                    merkleRoot:
                        "A6D72BAA3DB900B03E70DF880E503E9164013B4D9A470853EDC115776323A098",
                    difficulty: 0,
                    nonce: 0,
                },
                body: [
                    "The Times 03/Jan/2009 Chancellor on brink of second bailout for banks",
                ],
            },
            {
                header: {
                    version: "1.0.0",
                    index: 1,
                    previousHash:
                        "d6c89a46d5abb32dcf912f011585aacdd321329dcdba26b2aad4f5d20184fa80",
                    timestamp: 1641785704,
                    merkleRoot:
                        "A4174086C3B0AA30C6EDEC4C44D4AA5A89F71D64251B025CA7600676769247F0",
                    difficulty: 0,
                    nonce: 0,
                },
                body: ["kimchi"],
            },
        ]}
    />,
    document.getElementById("root")
);