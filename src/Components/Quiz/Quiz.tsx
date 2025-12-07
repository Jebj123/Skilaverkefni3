import React, { createElement, useRef, useState } from "react";
import "./Quiz.css";
import { spurningar } from "./Svor";
import confetti from "https://cdn.skypack.dev/canvas-confetti";

const quiz = () => {
  let [index, setIndex] = useState(0);
  let [spurning, setSpurning] = useState(spurningar[index]);
  let [stig, setStig] = useState(0);
  let [nidurstada, setNidurstada] = useState(false);
  let [las, setLas] = useState(false);

  let val1 = useRef(null);
  let val2 = useRef(null);
  let val3 = useRef(null);
  let val4 = useRef(null);

  let valArray = [val1, val2, val3, val4];

  let rettAudio = new Audio("./Audio/Ding.wav");
  let rangtAudio = new Audio("./Audio/Rangt.wav");

  const tekkaSvar = (e, svar) => {
    if (las === false) {
      if (spurning.svar === svar) {
        e.target.classList.add("rettSvar");
        setLas(true);
        setStig((prev) => prev + 1);
        rettAudio.play();
        confetti();
      } else {
        e.target.classList.add("rangtSvar");
        rangtAudio.play();
        setLas(true);
        valArray[spurning.svar - 1].current.classList.add("rettSvar");
      }
    }
  };

  const lokaMynd = () => {
    if (stig < 5) {
      document.body.appendChild(document.createElement("img")).src =
        "/public/images/badDog.gif";
    } else if (stig >= 5) {
      document.body.appendChild(document.createElement("img")).src =
        "/public/images/Celebrate.gif";
    }
  };

  function reset() {
    document.querySelector("img").remove();
  }

  const naestaSpurning = () => {
    if (las === true) {
      if (index === spurningar.length - 1) {
        setNidurstada(true);
        lokaMynd();
        return 0;
      }
      setIndex(++index);
      setSpurning(spurningar[index]);
      setLas(false);
      valArray.map((svarlisti) => {
        svarlisti.current.classList.remove("rangtSvar");
        svarlisti.current.classList.remove("rettSvar");
        return null;
      });
    }
  };

  const reynaAftur = () => {
    setIndex(0);
    setSpurning(spurningar[0]);
    setStig(0);
    setNidurstada(false);
    setLas(false);
    reset();
  };

  return (
    <div className="container">
      <h1> Spurninga App</h1>
      <hr />
      {nidurstada ? (
        <></>
      ) : (
        <>
          <h2>
            {index + 1}.{spurning.spurning}
          </h2>
          <ul>
            <li
              ref={val1}
              onClick={(e) => {
                tekkaSvar(e, 1);
              }}
            >
              {spurning.val[0]}
            </li>
            <li
              ref={val2}
              onClick={(e) => {
                tekkaSvar(e, 2);
              }}
            >
              {spurning.val[1]}
            </li>
            <li
              ref={val3}
              onClick={(e) => {
                tekkaSvar(e, 3);
              }}
            >
              {spurning.val[2]}
            </li>
            <li
              ref={val4}
              onClick={(e) => {
                tekkaSvar(e, 4);
              }}
            >
              {spurning.val[3]}
            </li>
          </ul>
          <button onClick={naestaSpurning}>Næsta Spurning</button>
          <div className="index">
            {index + 1} af {spurningar.length} Spurningum
          </div>
        </>
      )}
      {nidurstada ? (
        <>
          <h2>
            Þú náðir {stig} af {spurningar.length} rétt
          </h2>
          <button onClick={reynaAftur}>Reyna Aftur!</button>
        </>
      ) : (
        <></>
      )}
    </div>
  );
};

export default quiz;
