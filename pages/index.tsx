import { useRouter } from "next/router";

const HomePage = () => {
  const router = useRouter();

  return (
    <div>
      <h1>Home Page</h1>
      <div>
        <button onClick={() => router.push("/login")}>Login</button>
        <button>Register</button>
      </div>
    </div>
  );
};

export default HomePage;
