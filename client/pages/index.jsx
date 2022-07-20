import CenterCard from "../components/CenterCard";
import Header from "../components/Header";
import { ToastContainer } from "react-toastify";
import TransactionHistory from "../components/TransactionHistory";

export default function Home() {
  return (
    <>
      <main className="min-h-screen w-screen bg-gradiant flex  flex-col items-center">
        <Header />
        <CenterCard />
        <TransactionHistory />
      </main>
    </>
  );
}
