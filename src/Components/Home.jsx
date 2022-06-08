import React, { useState, useEffect, useRef } from "react";
import { Button, Divider } from "@mui/material";

import "./home.css";

const genNo = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
const Home = () => {
  const main = useRef();
  const startGuessing = useRef(null);
  const generatedNumber = useRef(null);
  const scoreNumber = useRef(null);
  const inputValue = useRef(null);
  const homeValue = useRef(null);
  const gridLeft = useRef(null);
  const bottomRef = useRef(null);

  const [guess, setGuess] = useState("?");
  let [score, setScore] = useState(20);
  const [highScore, setHighScore] = useState(0);
  const [input, setInput] = useState("");

  const setHighScoreValue = () => {
    if (score > highScore) setHighScore(score);
    if (score < highScore) return;
  };

  const gameOver = () => {
    if (score < 1) startGuessing.current.textContent = "Game Over";
    // setScore(0);
  };

  const handleBtn1 = () => {
    generatedNumber.current.textContent = "?";
    // scoreNumber.current.textContent = "Score: 10";
    setScore(20);
    main.current.style.background = "";
    startGuessing.current.textContent = "Start guessing...";
    setInput("");
    homeValue.current.style.background = "";
    gridLeft.current.style.display = "flex";
    bottomRef.current.style.display = "grid";
    //  bottomRef.current.style.justifyContent = "center";
    // setHighScoreValue();
  };
  const handleBtn2 = () => {
    // eslint-disable-next-line eqeqeq
    if (input == genNo) {
      startGuessing.current.textContent = " Yay You Won!!!";
      startGuessing.current.style.fontSize = "1rem";
      main.current.style.background = "green";
      homeValue.current.style.background = " #9EFD38";
      setHighScoreValue();
      // setScore(0);
      setInput("");
      setGuess(genNo);
      gridLeft.current.style.display = "none";
      bottomRef.current.style.display = "flex";
      bottomRef.current.style.justifyContent = "center";
      return;
    }

    if (input !== genNo && input > genNo) {
      startGuessing.current.textContent = "Too High, Try Again";
      // main.current.style.background = "	#660000";

      setScore(score - 1);
      // gameOver();
    }
    if (input !== genNo && input < genNo) {
      startGuessing.current.textContent = "Too Low, Try Again";
      // main.current.style.background = "	#660000";

      setScore(score - 1);
      // gameOver();``
    }
    if (input !== genNo && input < genNo && score < 1) {
      gameOver();
      setScore(0);
      homeValue.current.style.background = " #C80815";
    }
  };

  console.log(genNo);

  return (
    <div ref={homeValue} className='home'>
      <div className='main' ref={main}>
        <div className='top'>
          <Button variant='contained' size='small' onClick={handleBtn1}>
            Play Again
          </Button>
          <h3>(Between 1 and 20)</h3>
        </div>
        <div className='middle'>
          <div className='guessNo'>Guess My Number!</div>
          <div className='guess'>
            <Divider
              sx={{
                width: "100%",

                color: "#ffffff",
                position: "absolute",
              }}
              variant='fullWidth'
            >
              <div className='genNumber' ref={generatedNumber}>
                {guess}
              </div>
            </Divider>
          </div>
        </div>
        <div ref={bottomRef} className='bottom'>
          <div ref={gridLeft} className='gridLeft'>
            <input
              ref={inputValue}
              placeholder='guess a number'
              type='number'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <Button variant='contained' onClick={handleBtn2}>
              Check
            </Button>
          </div>
          <div className='gridRight'>
            <h3 ref={startGuessing} className='start'>
              Start Guessing...
            </h3>
            <h3 ref={scoreNumber}>Score: {score}</h3>
            <h3>HighScore: {highScore}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
