import { FC, useEffect } from "react";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";

const Monitoring: FC = (props) => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      LogRocket.init("pqcelz/mealplanner");
      // plugins should also only be initialized when in the browser
      setupLogRocketReact(LogRocket);
    }
  }, []);
  return <>{props.children}</>;
};

export default Monitoring;
