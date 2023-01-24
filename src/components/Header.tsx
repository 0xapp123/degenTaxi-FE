/* eslint-disable @next/next/no-img-element */
import {
  WalletModalProvider,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { SocketType } from "../context/SocketProvider";
import Cashier from "./Cashier";
export default function Header(props: {
  walletAddress: string | undefined;
  isConnected: boolean;
  depositBalance: number;
  setDepositBalance: Function;
  socket: SocketType | undefined;
}) {
  const { walletAddress, isConnected, depositBalance, socket, setDepositBalance } = props;

  const register = async () => {
    // socket.
  };

  const [isCashier, setIsCashier] = useState(false);

  return (
    <header>
      <div className="container">
        <div className="header-content">
          <div className="logo">
            <img src="/img/logo.png" alt="" />
          </div>
          <div className="app-bar">
            {walletAddress &&
              <div className="balance-box" onClick={() => setIsCashier(true)}>
                <span>Balance:</span>
                <div className="balance-value">
                  {depositBalance.toLocaleString()} SOL
                </div>
              </div>
            }
            {/* {!isConnected && <button className="btn-register">Register</button>} */}
            <WalletMultiButton />
          </div>
        </div>
      </div>
      <Cashier
        open={isCashier}
        setOpen={setIsCashier}
        socket={socket}
        depositBalance={depositBalance}
        setDepositBalance={setDepositBalance}
      />
    </header>
  );
}
