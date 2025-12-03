import React, { createElement, useRef, useState } from "react";
import "./Quiz.css";
import { data } from "./Svor";
import confetti from "https://cdn.skypack.dev/canvas-confetti";

const quiz = () => {
  let [index, setIndex] = useState(0);
  let [spurning, setSpurning] = useState(data[index]);
  let [las, setLas] = useState(false);
  let [stig, setStig] = useState(0);
  let [nidurstada, setNidurstada] = useState(false);

  let svar1 = useRef(null);
  let svar2 = useRef(null);
  let svar3 = useRef(null);
  let svar4 = useRef(null);

  let svarArray = [svar1, svar2, svar3, svar4];

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
        svarArray[spurning.svar - 1].current.classList.add("rettSvar");
      }
    }
  };

  const lokaMynd = () => {
    if (stig < 3) {
      document.body.appendChild(document.createElement("img")).src =
        "/public/images/badDog.gif";
    } else if (stig >= 3) {
      document.body.appendChild(document.createElement("img")).src =
        "/public/images/Celebrate.gif";
    }
  };

  function reset() {
    document.querySelector("img").remove();
  }

  const naestaSpurning = () => {
    if (las === true) {
      if (index === data.length - 1) {
        setNidurstada(true);
        lokaMynd();
        return 0;
      }
      setIndex(++index);
      setSpurning(data[index]);
      setLas(false);
      svarArray.map((svarlisti) => {
        svarlisti.current.classList.remove("rangtSvar");
        svarlisti.current.classList.remove("rettSvar");
        return null;
      });
    }
  };

  const reynaAftur = () => {
    setIndex(0);
    setSpurning(data[0]);
    setStig(0);
    setLas(false);
    setNidurstada(false);
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
              ref={svar1}
              onClick={(e) => {
                tekkaSvar(e, 1);
              }}
            >
              {spurning.svar1}
            </li>
            <li
              ref={svar2}
              onClick={(e) => {
                tekkaSvar(e, 2);
              }}
            >
              {spurning.svar2}
            </li>
            <li
              ref={svar3}
              onClick={(e) => {
                tekkaSvar(e, 3);
              }}
            >
              {spurning.svar3}
            </li>
            <li
              ref={svar4}
              onClick={(e) => {
                tekkaSvar(e, 4);
              }}
            >
              {spurning.svar4}
            </li>
          </ul>
          <button onClick={naestaSpurning}>Næsta Spurning</button>
          <div className="index">
            {index + 1} af {data.length} Spurningum
          </div>
        </>
      )}
      {nidurstada ? (
        <>
          <h2>
            Þú náðir {stig} af {data.length} rétt
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
