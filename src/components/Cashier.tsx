import { useState } from "react";
import Dialog from "@mui/material/Dialog";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import { SocketType } from "../context/SocketProvider";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import { useWallet } from "@solana/wallet-adapter-react";
import { deposit, withdraw } from "../network/transaction";
import ButtonLoading from "./ButtonLoading";

export default function Cashier(props: {
  open: boolean;
  setOpen: Function;
  depositBalance: number;
  setDepositBalance: Function;
  socket: SocketType | undefined;
}) {
  const { open, setOpen, depositBalance, socket, setDepositBalance } = props;
  const wallet = useWallet();
  const [tab, setTab] = useState("deposit");
  const [depositAmount, setDepositAmount] = useState(0);
  const [withdrawAmount, setWithdrawAmount] = useState(0);
  const [depositAmountVal, setDepositAmountVal] = useState(false);
  const [withdrawAmountVal, setWithdrawAmountVal] = useState(false);

  const [depositLoading, setDepositLoading] = useState(false);
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));

  const handleClose = () => {
    setOpen(false);
  };

  const handleDepositAmount = (e: any) => {
    setDepositAmountVal(false);
    const value = e.target.value as number;
    setDepositAmount(value);
  };
  const handleWithdrawAmount = (e: any) => {
    setWithdrawAmountVal(false);
    const value = e.target.value;
    setWithdrawAmount(value);
  };

  const handleDeposit = async () => {
    if (socket && wallet.publicKey) {
      try {
        await deposit(wallet, depositAmount, setDepositLoading, socket, setDepositBalance);
      } catch (error) {
        console.log(error)
      }
    }
  };
  const handleWithdraw = async () => {
    if (depositBalance - withdrawAmount < 0) {
      setWithdrawAmountVal(true);
      return;
    }
    if (socket && wallet.publicKey) {
      await withdraw(wallet, withdrawAmount, setWithdrawLoading, socket, setDepositBalance);
    }
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
    //   onClose={handleClose}
    >
      <div className="cashier">
        <h2>CASHIER</h2>
        <button className="closeicon" onClick={handleClose}>
          <CloseRoundedIcon />
        </button>
        <div className="cashier-content">
          <div className="tab-bar">
            <button
              className={`btn-tab ${tab === "deposit" ? "active" : ""}`}
              onClick={() => setTab("deposit")}
            >
              Deposit
            </button>
            <button
              className={`btn-tab ${tab === "withdraw" ? "active" : ""}`}
              onClick={() => setTab("withdraw")}
            >
              Withdraw
            </button>
          </div>
          <div className="cashier-box">
            {tab === "deposit" && (
              <>
                <p className="desc">Enter deposite amount</p>
                <h5>
                  Current Balance:{" "}
                  <span>{depositBalance.toLocaleString()} SOL</span>
                </h5>
                <div className="cashier-input">
                  <input min={2} value={depositAmount} type="number" onChange={handleDepositAmount} />
                  <p className="label">SOL</p>
                </div>
                <button className="btn-cashier" onClick={handleDeposit} disabled={depositLoading}>
                  {!depositLoading ? "Deposit" :
                    <ButtonLoading />}
                </button>
              </>
            )}
            {tab === "withdraw" && (
              <>
                <p className="desc">Enter withdraw amount</p>
                <h5>
                  Current Balance:{" "}
                  <span>{depositBalance.toLocaleString()} SOL</span>
                </h5>
                <div className="cashier-input">
                  <input
                    value={withdrawAmount}
                    type="number"
                    min={2}
                    onChange={handleWithdrawAmount}
                  />
                  <p className="label">SOL</p>
                  {withdrawAmountVal &&
                    <p className="error-msg">Incorrect value!</p>
                  }
                </div>
                <button className="btn-cashier" onClick={handleWithdraw} disabled={withdrawLoading}>
                  {
                    !withdrawLoading ? "Withdraw" :
                      <ButtonLoading />
                  }
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </Dialog>
  );
}
