import { useRouter } from "next/router";
import { FC } from "react";
import {
  MainPageButtonGroup,
  MainPageCallToAction,
  MainPageCallToActionFull,
  MainPageContainer,
  MainPageDescription,
  MainPageTitle,
} from "@features/mainPage/components";
import { useIfUserLoggedInRedirectTo } from "@features/mainPage/hooks";

export const MainPage: FC = () => {
  const router = useRouter();
  useIfUserLoggedInRedirectTo("/dashboard");

  return (
    <MainPageContainer>
      <MainPageTitle>Rawpotion Mealplanner</MainPageTitle>
      <MainPageDescription>
        Easily share your meals with friends and family
      </MainPageDescription>
      <MainPageButtonGroup>
        <MainPageCallToAction onClick={() => router.push("/login")}>
          Login
        </MainPageCallToAction>
        <MainPageCallToActionFull onClick={() => router.push("/register")}>
          Register
        </MainPageCallToActionFull>
      </MainPageButtonGroup>
    </MainPageContainer>
  );
};
