import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-gray-100">
      <h1 className="text-yellow-400 text-4xl uppercase font-semibold">
        Rawpotion
      </h1>
      <div>
        <button
          className="border border-2 border-yellow-400 uppercase font-medium text-yellow-400 px-4 py-1 rounded-md text-lg"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
        <button onClick={() => router.push("/register")}>Register</button>
      </div>
    </div>
  );
};

export default HomePage;
