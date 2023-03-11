import { useState } from "react";
import "./board.css";
const Square = ({ square, handleClick }) => {
  return (
    <button className="square" onClick={handleClick}>
      {square }
    </button>
  );
};
export const Board = () => {
  // console.log(10)
  const [sqArray, setSqArray] = useState(new Array(9).fill(null));
  const [prevArr, setPrevArr] = useState([]);
  const [count, setCount] = useState(0);
  const [winner, setWinner] = useState(false);
  const [undoDisappear, setUndoDisappear] = useState(false);
  const toFindWinner = () => {
    const winnerArr = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    for (let i = 0; i < winnerArr.length; i++) {
      console.log(winnerArr[i]);
      if (
        sqArray[winnerArr[i][0]] &&
        sqArray[winnerArr[i][1]] &&
        sqArray[winnerArr[i][2]] &&
        sqArray[winnerArr[i][0]] === sqArray[winnerArr[i][1]] &&
        sqArray[winnerArr[i][1]] === sqArray[winnerArr[i][2]]
      ) {
        setWinner(sqArray[winnerArr[i][0]]);
      }
    }
  };
  const handleClick = (i) => {
    // console.log(i)
    if (sqArray[i] === null && !winner) {
      setPrevArr([...sqArray]);
      // const newArr = sqArray;
      count % 2 === 0 ? (sqArray[i] = "X") : (sqArray[i] = "O");
      setSqArray([...sqArray]);

      toFindWinner();
      setCount((prev) => prev + 1);
      setUndoDisappear(false);
    }
  };
  const handleUndo = () => {
    setSqArray([...prevArr]);
    setCount((prev) => prev - 1);
    winner ? setWinner(!winner) : setWinner((prev) => prev);
    setUndoDisappear(true);

    // setPrevArr([])
  };
  const handleGotoStart = () => {
    setSqArray(Array(9).fill(null));
    setCount(0);
    setUndoDisappear(true);
    setWinner(false);
  };
  return (
    <div className="BoardWrapper">
      <div className="mainContainer">
        <h1>Tic Toe Game</h1>
        <div className="buttonWrapper">

        <button onClick={handleGotoStart}>Restart </button>
          {prevArr[0] !== undefined && !undoDisappear && (
            <button onClick={handleUndo}>Undo</button>
          )}
        </div>
        <div className="boardContainer">
          <Square
            square={sqArray[0]}
            handleClick={() => handleClick(0)}
            winner={winner}
          />
          <Square
            square={sqArray[1]}
            handleClick={() => handleClick(1)}
            winner={winner}
          />
          <Square
            square={sqArray[2]}
            handleClick={() => handleClick(2)}
            winner={winner}
          />
          <Square
            square={sqArray[3]}
            handleClick={() => handleClick(3)}
            winner={winner}
          />
          <Square
            square={sqArray[4]}
            handleClick={() => handleClick(4)}
            winner={winner}
          />
          <Square
            square={sqArray[5]}
            handleClick={() => handleClick(5)}
            winner={winner}
          />
          <Square
            square={sqArray[6]}
            handleClick={() => handleClick(6)}
            winner={winner}
          />
          <Square
            square={sqArray[7]}
            handleClick={() => handleClick(7)}
            winner={winner}
          />
          <Square
            square={sqArray[8]}
            handleClick={() => handleClick(8)}
            winner={winner}
          />
        </div>

        <div className="gameHistory">
          
          <div
            className="gamePlayer"
            style={{
              color: count % 2 === 0 ? "#1565c0" : "black",
              textDecoration: count % 2 === 0 ? "underline" : "none",
            }}
          >
            Player1 with X
          </div>
          <div
            className="gamePlayer"
            style={{
              color: count % 2 !== 0 ? "#1565c0" : "black",
              textDecoration: count % 2 !== 0 ? "underline" : "none",
            }}
          >
            Player2 with O
          </div>

          {winner && <h1 style={{ color: "#e91e63" }}>Winner is {winner}</h1>}
        </div>
      </div>
    </div>
  );
};
