import { createContext, useState, useEffect, useContext } from "react";
import io, { Socket } from "socket.io-client";
import getConfig from "next/config";
import {
  ClientToServerEvents,
  Player,
  ServerToClientEvents,
} from "../types/socketio";

const { publicRuntimeConfig } = getConfig();
export type SocketType = Socket<ServerToClientEvents, ClientToServerEvents>;

interface Context {
  socket?: SocketType;
  gameData?: {
    players: Player[],
    currentTaxiPosition: number,
    gameStarted: boolean
  }
}

const context = createContext<Context>({});

export const useSocket = () => useContext(context);

const SocketProvider = (props: { children: any }) => {
  const [socket, setSocket] = useState<SocketType>();
  const [gameData, setGameData] = useState<{
    players: Player[],
    currentTaxiPosition: number,
    gameStarted: boolean
  }>()

  useEffect(() => {
    // TODO: consider reconnect on page refresh
    // TODO: check why we call the provider twice, we only need one socket
    // TODO: when connecting from firefox we get "unhandledeRejection error"
    // const serverUrl = "https://taxi-bustgame-backend.herokuapp.com";
    const serverUrl = "localhost:8080";

    const socket = io(serverUrl, {
      transports: ["websocket"],
    });
    socket.on("connect", () => {
      console.log("connected to backend", socket.id);

      socket.emit(
        "getCurrentGameStatus",
        (
          players: Player[],
          currentTaxiPosition: number,
          gameStarted: boolean
        ) => {
          setGameData({
            players: players,
            currentTaxiPosition: currentTaxiPosition,
            gameStarted: gameStarted
          })
        }
      );
    });
    socket.on("disconnect", () => {
      console.log("disconnected from backend", socket.id);
    });
    setSocket(socket);
    return () => {
      gameData
      socket.off("connect");
      socket.off("disconnect");
      setSocket(undefined);
    };
  }, []);

  return (
    <context.Provider value={{ socket, gameData }}>{props.children}</context.Provider>
  );
};

export default SocketProvider;
