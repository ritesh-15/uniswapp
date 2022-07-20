import { createContext, useContext, useEffect, useState } from "react";
import { ethers } from "ethers";
import { abi } from "../json/Transactions.json";
import {
  useMoralis,
  useNewMoralisObject,
  useMoralisQuery,
} from "react-moralis";

let eth = null;

if (typeof window !== "undefined") {
  eth = window.ethereum;
}

const getEthereumContract = () => {
  // const CONTRACT_ADDRESS = "0xF90E45457b5a664C43fa7e0B744181BC06FdA635";
  const CONTRACT_ADDRESS = "0x172eF5eB554298FCEc9a0B981EFdd933eD6Fb92d";
  const provider = new ethers.providers.Web3Provider(eth);
  const signer = provider.getSigner();
  const contract = new ethers.Contract(CONTRACT_ADDRESS, abi, signer);
  return contract;
};

export const TransactionContext = createContext();

export const TransactionProvider = ({ children }) => {
  const [formData, setFormData] = useState({
    amount: "",
    to: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  const { user } = useMoralis();

  const { save } = useNewMoralisObject("transactions");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { amount, to } = formData;

    if (amount === "" || to === "") {
      console.log("Invalid input");
      return;
    }

    sendTransaction();
  };

  const saveTransaction = async (txHash) => {
    try {
      await save({
        amount: formData.amount,
        to: formData.to,
        user: user.address,
        from: user?.get("ethAddress"),
        txHash: txHash,
      });
    } catch (error) {
      console.error(error);
    }
  };

  const sendTransaction = async () => {
    const { amount, to } = formData;

    try {
      if (!eth) {
        console.log("No metamask");
        return;
      }

      const transactionContract = getEthereumContract();

      setIsLoading(true);

      const parsedAmount = ethers.utils.parseEther(amount);

      await eth.request({
        method: "eth_sendTransaction",
        params: [
          {
            from: user?.get("ethAddress"),
            to: to,
            value: parsedAmount._hex,
            gas: "0x7EF40", // 52000 gas
          },
        ],
      });

      const transactionHash = await transactionContract.publishTransaction(
        to,
        parsedAmount,
        `Transferring ${amount} ETH to ${to}`,
        `TRANSFER `
      );

      await transactionHash.wait();

      setIsLoading(false);

      saveTransaction(transactionHash.hash);

      setFormData({ amount: "", to: "" });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TransactionContext.Provider
      value={{
        formData,
        handleChange,
        handleSubmit,
        isLoading,
      }}
    >
      {children}
    </TransactionContext.Provider>
  );
};

export const useTransaction = () => {
  return useContext(TransactionContext);
};
