/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import Switch from "@mui/material/Switch";
import Header from "../components/Header";
import MainControl from "../components/MainControl";
import Playground from "../components/Playground";
import { ArrowDown, ArrowUp, InfinityIcon, InfoIcon } from "../components/SvgIcons";
import { BETS } from "../config";
import { FormControlLabel, FormGroup } from "@mui/material";
import { useSocket } from "../context/SocketProvider";
import { useWallet } from "@solana/wallet-adapter-react";
import { Player, User } from "../types/socketio";
import { sleep } from "../context/utils";
import GameInfo from "../components/GameInfo";

export default function HomePage(props: {
  startLoading: Function;
  closeLoading: Function;
  pageLoading: boolean;
}) {
  const [tab, setTab] = useState(false);
  const [stakeAmount, setStakeAmount] = useState(1);
  const [autoEscape, setAutoEscape] = useState(2);
  const [isAutoEscape, setIsAutoEscape] = useState(false);
  const [autoShow, setAutoShow] = useState(false);
  const [isAuto, setIsAuto] = useState(false);

  const [playLoading, setPlayLoading] = useState(false);

  // sueprnova
  const [currentPlayers, setCurrentPlayers] = useState<Player[]>([]);
  const [isGameStarted, setIsGameStarted] = useState(false);

  const handleStake = (e: any) => {
    setStakeAmount(e.target.value);
  };
  const handleAutoEscape = (e: any) => {
    setAutoEscape(e.target.value);
  };

  // Auto Bet
  const [roundsCnt, setRoundsCnt] = useState(-1);
  const [maxStake, setMaxStake] = useState(-1);
  const [onLoss, setOnLoss] = useState(0);
  const [onWin, setOnWin] = useState(0);
  const [stopOnLoss, setStopOnLoss] = useState(-1);
  const [stopOnProfit, setStopOnProfit] = useState(-1);

  const [isRoundsCnt, setIsRoundsCnt] = useState(false);
  const [isMaxStake, setIsMaxStake] = useState(false);
  const [isOnLoss, setIsOnLoss] = useState(false);
  const [isOnWin, setIsOnWin] = useState(false);
  const [isStopOnLoss, setIsStopOnLoss] = useState(false);
  const [isStopOnProfit, setIsStopOnProfit] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false); //  after play: true

  const [rewardAmount, setRewardAmount] = useState(0);

  const { socket, gameData } = useSocket();

  const wallet = useWallet();

  const [isConnected, setIsConnected] = useState(false);
  const [depositBalance, setDepositBalance] = useState(0);

  const [escapedUsers, setEscapedUsers] = useState<Player[]>([]);

  const handleRoundsCnt = (e: any) => {
    setRoundsCnt(e.target.value);
  };
  const handleMaxStake = (e: any) => {
    setMaxStake(e.target.value);
  };
  const handleOnLoss = (e: any) => {
    setOnLoss(e.target.value);
  };
  const handleOnWin = (e: any) => {
    setOnWin(e.target.value);
  };
  const handleStopOnLoss = (e: any) => {
    setStopOnLoss(e.target.value);
  };
  const handleStopOnProfit = (e: any) => {
    setStopOnProfit(e.target.value);
  };

  const [forceRender, setForceRender] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

  useEffect(() => {
    if (socket) {
      socket.on("startGame", async (players: Player[]) => {
        setCurrentPlayers(players);
        // setTimeout(() => {
        // }, 5000);
        await sleep(5000)
        console.log("game started...");
        setIsGameStarted(true);
      });
      socket.on("connect", () => {
        console.log("connected to backend ==========> ", socket.id);
        socket.emit(
          "getCurrentGameStatus",
          (
            players: Player[],
            currentTaxiPosition: number,
            gameStarted: boolean
          ) => {
            setIsGameStarted(gameStarted)
          }
        );
      });
      socket.on("endGame", (end) => {
        setIsGameStarted(false);
        console.log("game ended.. at ", end);
        setCurrentPlayers([]);
        setIsPlaying(false);
      });
      socket.on("notifyJoinedPlayers", (players: Player[]) => {
        // console.log(players, "== players");
        setCurrentPlayers(players);
        setEscapedUsers(players);
      });

      socket.on("notifyPlayerWithdrawn", (players: Player[]) => {
        setCurrentPlayers(players);
        // console.log("notifyPlayerWithdrawn ", players);
      });
      if (wallet.publicKey) {
        console.log(">>>>>>>>>>>>>>>1")
        socket.emit("getUserByWallet", wallet.publicKey.toBase58(), async (res) => {
          console.log(">>>>>>>>>>>>>>>2")
          if (res) {
            console.log(">>>>>>>>>>>>>>>3")
            setDepositBalance(res.balance);
          }
        });
      }
    }
    setForceRender(!forceRender);
  }, [socket, wallet.publicKey, socket?.connected]);

  const handlePlay = async () => {
    try {
      if (socket && wallet.publicKey) {
        socket.emit("joinGame", wallet.publicKey.toBase58(), stakeAmount, async (result) => {
          console.log("joinGame result >> ", result)
          if (result) {
            setDepositBalance(result.balance)
          }
        });
        setIsPlaying(true);
        console.log("play!");
      }
    } catch (error) {
      console.log(error);

    }
  };

  const handleEscape = () => {
    try {
      if (socket && wallet.publicKey) {
        setIsPlaying(false);
        socket.emit("withdrawInGame", wallet.publicKey.toBase58(), (res) => {
          console.log("I withdrew ", res);
          const pastBalance = depositBalance;
          setDepositBalance(pastBalance + stakeAmount * res)
          setRewardAmount(stakeAmount * res)
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleRegister = () => {
    try {
      if (socket && wallet.publicKey) {
        // connectWallet
        socket.emit("connectWallet", wallet.publicKey.toBase58(), (res) => {
          console.log(res);
          if (res) {
            setDepositBalance(res.balance);
          }
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (wallet.publicKey !== null) {
      handleRegister();
      console.log(wallet.publicKey.toBase58());
    }
  }, [wallet.connected, wallet.publicKey]);


  useEffect(() => {
    console.log(gameData, "-- game data")
    if (gameData) {
      setCurrentPlayers(gameData.players);
    }
  }, [gameData])


  return (
    <>
      <Header
        walletAddress={wallet.publicKey?.toBase58()}
        isConnected={isConnected}
        depositBalance={depositBalance}
        setDepositBalance={setDepositBalance}
        socket={socket}
      />
      <main>
        <div className="container">
          <div className="main-content">
            <div className="player-board">
              <div className="board-header">{currentPlayers.length} Bets</div>
              <div className="content">
                {currentPlayers.map((item, key) => (
                  <div className="bet-item" key={key}>
                    <div className="username">{`${item.wallet.slice(
                      0,
                      3
                    )}...${item.wallet.slice(-3)}`}</div>
                    <div className="payload">{item.bet_amount}</div>
                    <div className="bet-amount">
                      {item.withdraw_amount !== 0
                        ? (
                          (item.bet_amount * item.withdraw_amount)
                        ).toLocaleString() + " SOL"
                        : "--"}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <Playground
              started={isGameStarted}
              isPlaying={isPlaying}
              socket={socket}
              rewardAmount={rewardAmount}
            />
          </div>
          <div className="control-box">
            <div className="action-tab">
              <div className="state-group">
                <button
                  className={`tab ${!tab ? "active" : ""}`}
                  onClick={() => setTab(false)}
                >
                  Standard
                </button>
                <button
                  className={`tab ${tab ? "active" : ""}`}
                  disabled
                // onClick={() => setTab(true)}
                >
                  Advanced
                </button>
              </div>
              <button className="btn-info" onClick={() => setShowInfo(true)}>
                <InfoIcon />
              </button>
            </div>
            {!tab && (
              <MainControl
                setStakeAmount={setStakeAmount}
                stakeAmount={stakeAmount}
                handleStake={handleStake}
                isGameStarted={isGameStarted}
                isPlaying={isPlaying}
                handlePlay={handlePlay}
                handleEscape={handleEscape}
                depositBalance={depositBalance}
              />
            )}
            {tab && (
              <div className="">
                <div className="auto-switch">
                  <div className="auto-control">
                    <div className="show-hide">
                      <button
                        onClick={() => setAutoShow(!autoShow)}
                        disabled={!isAuto}
                      >
                        {autoShow ? (
                          <>
                            <ArrowUp /> <span>HIDE</span>
                          </>
                        ) : (
                          <>
                            <ArrowDown /> <span>SHOW</span>
                          </>
                        )}
                      </button>
                    </div>
                    <FormGroup>
                      <FormControlLabel
                        control={
                          <Switch
                            checked={isAuto}
                            sx={{ color: "#ffff00" }}
                            onClick={() => setIsAuto(!isAuto)}
                          />
                        }
                        label="Auto"
                        labelPlacement="start"
                        sx={{ color: "#fff" }}
                      />
                    </FormGroup>
                  </div>
                  {autoShow && (
                    <div className="auto-body">
                      <div
                        className="auto-item"
                        onClick={() => setIsRoundsCnt(true)}
                      >
                        <p>No.Rounds</p>
                        {isRoundsCnt && (
                          <div className="infinity">
                            <InfinityIcon />
                          </div>
                        )}
                        <div className="item-input">
                          <input value={roundsCnt} onChange={handleRoundsCnt} />
                          <span>%</span>
                        </div>
                      </div>
                      <div
                        className="auto-item"
                        onClick={() => setIsMaxStake(true)}
                      >
                        <p>Max stake (SOL)</p>
                        {isMaxStake && (
                          <div className="infinity">
                            <InfinityIcon />
                          </div>
                        )}
                        <div className="item-input">
                          <input value={maxStake} onChange={handleMaxStake} />
                          <span>◎</span>
                        </div>
                      </div>
                      <div
                        className="auto-item"
                        onClick={() => setIsStopOnLoss(true)}
                      >
                        <p>Stop on loass</p>
                        {isStopOnLoss && (
                          <div className="infinity">
                            <InfinityIcon />
                          </div>
                        )}
                        <div className="item-input">
                          <input
                            value={stopOnLoss}
                            onChange={handleStopOnLoss}
                          />
                          <span>◎</span>
                        </div>
                      </div>
                      <div
                        className="auto-item"
                        onClick={() => setIsStopOnProfit(true)}
                      >
                        <p>Stop on profit (SOL)</p>
                        {isStopOnProfit && (
                          <div className="infinity">
                            <InfinityIcon />
                          </div>
                        )}
                        <div className="item-input">
                          <input
                            value={stopOnProfit}
                            onChange={handleStopOnProfit}
                          />
                          <span>◎</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                <div className="advanced-box">
                  <div className="auto-escape">
                    <div className="escape-input">
                      <h5>Auto escape</h5>
                      <div className="input-box">
                        <span>x</span>
                        <input
                          value={autoEscape}
                          onChange={handleAutoEscape}
                          type="number"
                          min={1}
                          disabled={!isAutoEscape}
                        />
                      </div>
                    </div>
                    <div className="escape-switch">
                      <button
                        className={`${isAutoEscape ? "active" : ""}`}
                        onClick={() => setIsAutoEscape(true)}
                      >
                        on
                      </button>
                      <button
                        className={`${!isAutoEscape ? "active" : ""}`}
                        onClick={() => setIsAutoEscape(false)}
                      >
                        off
                      </button>
                    </div>
                  </div>
                  <div className="advanced-control">
                    <MainControl
                      setStakeAmount={setStakeAmount}
                      stakeAmount={stakeAmount}
                      isPlaying={isPlaying}
                      isGameStarted={isGameStarted}
                      handleStake={handleStake}
                      handlePlay={handlePlay}
                      handleEscape={handleEscape}
                      depositBalance={depositBalance}
                    />
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <GameInfo
        open={showInfo}
        setOpen={setShowInfo}
      />
    </>
  );
}
