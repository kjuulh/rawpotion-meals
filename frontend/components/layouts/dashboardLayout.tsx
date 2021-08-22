import { FC } from "react";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const Toaster = dynamic(
  () => import("react-hot-toast").then((mod) => mod.Toaster),
  { ssr: false }
);

const DashboardLayout: FC = ({ children }) => {
  const router = useRouter();
  return (
    <div className="relative fit py-5 px-4 min-h-screen md:max-w-[calc(80%+1rem)] xl:max-w-[calc(60%+1rem)] md:mx-auto">
      <main className="">{children}</main>
      <nav>
        <button
          className="fixed right-12 bottom-12 w-16 h-16 bg-yellow-500 text-white font-bold text-2xl rounded-full float-right lg:hidden shadow-lg"
          onClick={() => router.back()}
        >
          {"<"}
        </button>
      </nav>
      <Toaster
        position="bottom-center"
        gutter={8}
        toastOptions={{
          duration: 5000,

          success: {
            duration: 3000,
            theme: {
              primary: "green",
              secondary: "black",
            },
          },
        }}
      />
    </div>
  );
};

export default DashboardLayout;
