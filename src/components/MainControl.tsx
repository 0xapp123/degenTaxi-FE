import React, { useState } from "react";
import GameInfo from "./GameInfo";
import { MinusIcon, PlusIcon } from "./SvgIcons";

export default function MainControl(props: {
  setStakeAmount: Function;
  stakeAmount: any;
  handleStake: any;
  isGameStarted: boolean;
  isPlaying: boolean;
  handlePlay: Function;
  handleEscape: Function;
  depositBalance: number;
}) {
  const {
    stakeAmount,
    handleStake,
    setStakeAmount,
    handlePlay,
    isGameStarted,
    isPlaying,
    handleEscape,
    depositBalance
  } = props;


  const handleInc = () => {
    let amount = stakeAmount;
    setStakeAmount(amount + 1);
  };
  const handleDec = () => {
    let amount = stakeAmount;
    setStakeAmount(amount - 1);
  };

  const onPlay = () => {
    handlePlay();
  };

  const onEscape = () => {
    handleEscape();
  };

  return (
    <div className="main-control">
      <div className="main-action">
        <div className="stake-input">
          <h5 className="title-5">Stake (SOL)</h5>
          <div className="inc-dec">
            <button onClick={handleDec}>
              <MinusIcon />
            </button>
            <input
              value={stakeAmount}
              onChange={handleStake}
              type="number"
              min={1}
            />
            <button onClick={handleInc}>
              <PlusIcon />
            </button>
          </div>
        </div>
        <div className="quick-stake">
          <h5 className="title-5">Quick stake (SOL)</h5>
          <div className="quick-actions">
            <button onClick={() => setStakeAmount(2)}>2</button>
            <button onClick={() => setStakeAmount(10)}>10</button>
            <button onClick={() => setStakeAmount(25)}>25</button>
          </div>
        </div>
      </div>
      {!isPlaying ? (
        <button className="btn-play" disabled={isGameStarted || depositBalance < stakeAmount} onClick={onPlay}>
          Play
        </button>
      ) : isGameStarted ? (
        <button
          className="btn-play"
          disabled={!isGameStarted}
          onClick={onEscape}
        >
          Escape
        </button>
      ) : (
        <button
          className="btn-play btn-disabled"
          disabled={!isGameStarted}
          onClick={onEscape}
        >
          Wating <br /> For Game
        </button>
      )}
    </div>
  );
}
