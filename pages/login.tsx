import React from "react";
import dynamic from "next/dynamic";

const LoginForm = dynamic(() => import("@features/auth/loginForm"), {
  ssr: false,
  loading: () => <p>Loading...</p>,
});

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;
