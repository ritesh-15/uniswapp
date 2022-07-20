import Image from "next/image";
import { AiOutlineDown } from "react-icons/ai";
import { FiMoreHorizontal, FiLogOut } from "react-icons/fi";
import { useMoralis } from "react-moralis";
import { shortenAddress } from "../utils/shortenAddress";
import { toast } from "react-toastify";

const style = {
  spanStyle: "p-3 text-white cursor-pointer",
  navStyle:
    "py-2 px-4 flex items-center justify-between fixed top-0 left-0 right-0",
};

const Header = () => {
  const { authenticate, isAuthenticating, isAuthenticated, user, logout } =
    useMoralis();

  const connectMetamask = async () => {
    try {
      await authenticate({
        signingMessage: "Connecting to Metamask",
      });
      toast.success("Connected to Metamask", {
        position: "top-left",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } catch (error) {
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  return (
    <nav className={style.navStyle}>
      <div className="flex-1">
        <Image src="/uniswap.png" width={50} height={50} />
      </div>
      <div className="flex items-center flex-1 justify-center">
        <div className="bg-secondary rounded-full flex items-center">
          <span className={style.spanStyle}>Swap</span>
          <span className={style.spanStyle}>Pool</span>
          <span className={style.spanStyle}>Vote</span>
          <span className={style.spanStyle}>Charts</span>
        </div>
      </div>
      <div className="flex items-center flex-1 justify-end">
        <div className="flex items-center flex-row bg-secondary p-2 rounded-full">
          <Image src="/eth.png" width={25} height={25} />
          <span className="text-white font-semibold ml-2 block">Ethereum</span>
          <AiOutlineDown className="text-white ml-2 text-sm" />
        </div>
        {!isAuthenticated ? (
          <button
            onClick={connectMetamask}
            className="bg-primary hover:opacity-60 transition-all mx-4 p-2 text-md rounded-full text-white"
          >
            Connect Wallet
          </button>
        ) : (
          <div className="flex rounded-lg flex-col border border-secondary p-2 mx-2">
            <h1 className="text-green-700 font-bold">Wallet connected</h1>
            <p className="text-white">
              {shortenAddress(user?.get("ethAddress"))}
            </p>
          </div>
        )}
        <div
          onClick={logout}
          className="bg-secondary  p-2 rounded-full cursor-pointer"
        >
          <FiLogOut className="text-white text-lg" />
        </div>
      </div>
    </nav>
  );
};

export default Header;
