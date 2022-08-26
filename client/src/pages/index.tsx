import type { NextPage } from "next";
import Link from "next/link";

const Home: NextPage = () => {
  return (
    <Link href="/login">
      <button
        type="button"
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
      >
        Login
      </button>
    </Link>
  );
};

export default Home;
