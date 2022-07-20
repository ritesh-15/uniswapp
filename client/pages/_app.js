import "../styles/globals.css";
import { MoralisProvider } from "react-moralis";
import { TransactionProvider } from "../context/TransactionContext";
import { UserProvider } from "../context/UserContext";
import { ToastContainer } from "react-toastify";

function MyApp({ Component, pageProps }) {
  return (
    <MoralisProvider
      serverUrl="https://wraaclpnk7zo.usemoralis.com:2053/server"
      appId="mYRY8xCyDduckckF1hyeDPy0rkX4LCDJU8t7Suwu"
    >
      <UserProvider>
        <TransactionProvider>
          <Component {...pageProps} />
        </TransactionProvider>
      </UserProvider>
    </MoralisProvider>
  );
}

export default MyApp;
