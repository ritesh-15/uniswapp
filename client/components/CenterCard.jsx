import { AiFillSetting, AiOutlineDown } from "react-icons/ai";
import Image from "next/image";
import { useTransaction } from "../context/TransactionContext";
import { useMoralis } from "react-moralis";
import { toast } from "react-toastify";
import LoadingModel from "./LoadingModel";

const style = {
  wrapper:
    "flex flex-col p-3 shadow-xl rounded-xl bg-secondary w-full md:max-w-[450px] overflow-hidden relative h-fit mt-[12rem]",
  headingDiv: "flex items-center justify-between mb-6",
  inputWrapper: "bg-[#212429] p-2 px-4 rounded-lg relative h-[70px]",
};

const CenterCard = () => {
  const { authenticate, isAuthenticated } = useMoralis();
  const { handleChange, handleSubmit, formData, isLoading } = useTransaction();

  const connectMetamask = async (e) => {
    e.preventDefault();
    try {
      await authenticate({
        signingMessage: "Connecting to Metamask",
      });
      toast.success("Connected to Metamask");
    } catch (error) {
      toast.error("Something went wrong!");
    }
  };

  return (
    <>
      {isLoading && <LoadingModel />}
      <div className={style.wrapper}>
        <div className={style.headingDiv}>
          <h1 className="text-white font-bold">Swap</h1>
          <AiFillSetting className="text-white" />
        </div>
        <form action="">
          <div className={`${style.inputWrapper} overflow-hidden`}>
            <input
              value={formData.amount}
              onChange={handleChange}
              name="amount"
              type="text"
              placeholder="0.0"
              className="bg-inherit outline-none text-3xl h-full z-10 text-white"
            />
            <div className="absolute right-3 top-0 bottom-0 h-fit p-3 my-auto flex items-center bg-secondary rounded-full cursor-pointer">
              <Image src="/eth.png" width={25} height={25} />
              <span className="text-white mx-2">ETH</span>
              <AiOutlineDown className="text-white text-sm" />
            </div>
          </div>
          <div className={`${style.inputWrapper} mt-4 overflow-hidden`}>
            <input
              value={formData.to}
              onChange={handleChange}
              name="to"
              type="text"
              placeholder="0x..."
              className="bg-inherit outline-none text-3xl h-full text-white"
            />
          </div>
          {!isAuthenticated ? (
            <button
              onClick={connectMetamask}
              className="mt-6 bg-primaryVariant text-primary font-bold  hover:opacity-70 transition-all p-4 rounded-lg w-full"
            >
              Connect Wallet
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              className="mt-6 bg-primary text-white font-bold  hover:opacity-70 transition-all p-4 rounded-lg w-full"
            >
              Send
            </button>
          )}
        </form>
      </div>
    </>
  );
};

export default CenterCard;
