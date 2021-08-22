import { FC } from "react";
import {
  OutlinedButton,
  PrimaryButton,
  SubHeading,
  Headings,
} from "@components/common";

export const MainPageContainer: FC = (props) => (
  <div className="min-h-screen flex flex-col text-center py-20 space-y-10 justify-center items-center">
    {props.children}
  </div>
);

export const MainPageTitle: FC = (props) => (
  <Headings>{props.children}</Headings>
);

export const MainPageDescription: FC = (props) => (
  <SubHeading>{props.children}</SubHeading>
);

export const MainPageButtonGroup: FC = (props) => (
  <div className="flex flex-col space-y-5 md:space-y-0 md:flex-row md:space-x-5">
    {props.children}
  </div>
);

export const MainPageCallToAction: FC<{ onClick: () => Promise<boolean> }> = (
  props
) => <PrimaryButton onClick={props.onClick}>{props.children}</PrimaryButton>;

export const MainPageCallToActionFull: FC<{ onClick: () => Promise<boolean> }> =
  (props) => (
    <OutlinedButton onClick={props.onClick}>{props.children}</OutlinedButton>
  );
