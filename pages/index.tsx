import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  return (
    <div className="text- min-h-screen flex flex-col text-center py-20 space-y-10 justify-center items-center">
      <h1
        className="text-yellow-400 text-4xl uppercase font-bold"
        onClick={() => {
          throw new Error("Lets get an error");
        }}
      >
        Rawpotion
      </h1>
      <p className="text-xl">Easily share your meals with friends and family</p>
      <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
        <button
          className="border-2 border-yellow-300 hover:border-yellow-500 transition-all uppercase font-medium text-yellow-300 hover:bg-yellow-100 hover:text-yellow-500 px-4 py-2 rounded-md text-lg"
          onClick={() => router.push("/login")}
        >
          Login
        </button>
        <button
          className="bg-yellow-300 hover:bg-yellow-500 transition-all uppercase font-medium text-white px-4 py-2 rounded-md text-lg"
          onClick={() => router.push("/register")}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default HomePage;
