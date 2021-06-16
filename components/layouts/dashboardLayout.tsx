import { FC } from "react";

const DashboardLayout: FC = ({ children }) => {
  return (
    <div className="fit py-5 px-4">
      <main className="md:max-w-[calc(80%+1rem)] xl:max-w-[calc(60%+1rem)] md:mx-auto">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
