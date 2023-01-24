import "../styles/style.scss";
import Wallet from "../components/wallet/Wallet";
import { ToastContainer } from "react-toastify";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SocketProvider from "../context/SocketProvider";
import { GameProvider } from "../context/GameProvider";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

function RaffleApp({ Component, pageProps }) {
  const [loading, setLoading] = useState(false);
  const [loadingLabel, setLoadingLabel] = useState("");
  const router = useRouter();
  return (
    <Wallet>
      <WalletModalProvider>
        <SocketProvider>
          <Component
            {...pageProps}
            pageLoading={loading}
            loadingLabel={loadingLabel}
            startLoading={() => setLoading(true)}
            closeLoading={() => setLoading(false)}
            setLoadingLoabel={(e) => setLoadingLabel(e)}
          />
          <ToastContainer style={{ fontSize: 15 }} pauseOnFocusLoss={false} />
        </SocketProvider>
      </WalletModalProvider>
    </Wallet>
  );
}

export default RaffleApp;
