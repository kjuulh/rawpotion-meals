import { FC, useEffect } from "react";
import LogRocket from "logrocket";
import setupLogRocketReact from "logrocket-react";
import * as Sentry from "@sentry/nextjs";

const Monitoring: FC = (props) => {
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      process.env.NODE_ENV === "production"
    ) {
      LogRocket.init("pqcelz/mealplanner");
      // plugins should also only be initialized when in the browser
      setupLogRocketReact(LogRocket);

      LogRocket.getSessionURL((sessionURL) => {
        Sentry.configureScope((scope) => {
          scope.setExtra("sessionURL", sessionURL);
        });
      });
    }
  }, []);
  return <>{props.children}</>;
};

export default Monitoring;
