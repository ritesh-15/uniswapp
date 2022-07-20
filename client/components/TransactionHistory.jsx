import React, { useEffect, useState } from "react";
import Image from "next/image";
import { shortenAddress } from "../utils/shortenAddress";
import { useMoralis, useMoralisQuery } from "react-moralis";
import moment from "moment";

const TransactionHistory = () => {
  const [transactions, setTransactions, isLoading] = useState([]);
  const { user, isAuthenticated } = useMoralis();
  const { fetch } = useMoralisQuery(
    "transactions",
    (query) => query.equalTo("from", user?.get("ethAddress")),
    [user, isAuthenticated],
    { autoFetch: false }
  );

  const fetchTransactions = async (fetch) => {
    try {
      const results = await fetch();
      console.log(results);
      setTransactions(results ? results : []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    console.log({ user, fetch });
    fetchTransactions(fetch);
  }, [user, fetch, isAuthenticated]);

  return (
    <div className="mt-12">
      {transactions?.map((transaction) => {
        const hash = transaction.get("txHash");
        const to = transaction.get("to");
        const amount = transaction.get("amount");
        const createdAt = transaction.get("createdAt");

        return (
          <div
            key={hash}
            className="flex items-center shadow-lg bg-[#212429] p-2 rounded-xl mb-4"
          >
            <Image src="/ethCurrency.png" width={25} height={25} />
            <p className="text-white mx-4">
              {amount}ETH send to {shortenAddress(to)} at{" "}
              {moment(createdAt).format("MMM Do YYYY, h:mm a")}
            </p>
            <span className="text-primary text-sm">
              <a
                rel="noreferrer"
                target="_blank"
                href={`https://goerli.etherscan.io/tx/${hash}`}
              >
                View Transaction
              </a>
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default TransactionHistory;
