import React, { FC } from "react";
import { useRouter } from "next/router";
import { ParsedUrlQuery } from "querystring";
import { useGetGroupByIdQuery, useGetMealByIdQuery } from "@lib/api";

function BreadCrumbWithId(props: { id: string; searchTerm: string }) {
  const GroupId = (props: { searchTerm: number }) => {
    const { data: group, isLoading } = useGetGroupByIdQuery({
      groupId: props.searchTerm,
    });

    if (isLoading) {
      return null;
    }

    if (!group) {
      return null;
    }
    return <>{group.name}</>;
  };

  const MealId = (props: { searchTerm: number }) => {
    const { data: meal, isLoading } = useGetMealByIdQuery({
      mealId: props.searchTerm,
    });

    if (isLoading) {
      return null;
    }
    return <>{meal.recipe}</>;
  };

  if (props.id && props.searchTerm) {
    if (props.id === "groupId") {
      return <GroupId searchTerm={parseInt(props.searchTerm)} />;
    } else if (props.id === "mealId") {
      return <MealId searchTerm={parseInt(props.searchTerm)} />;
    }

    return null;
  }
  return null;
}

function BreadCrumbItem(props: {
  keys: string[];
  query: ParsedUrlQuery;
  item: string;
}) {
  const router = useRouter();
  const id = props.item.replace("[", "").replace("]", "");
  const searchTerm = props.query[id];
  if (searchTerm) {
    return (
      <div
        onClick={() => {
          const url = router.pathname.substring(
            0,
            router.route.indexOf(props.item) + props.item.length
          );

          router.push({
            query: props.query,
            pathname: url,
          });
        }}
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          maxWidth: "20ch",
        }}
      >
        <BreadCrumbWithId searchTerm={searchTerm as string} id={id} />
      </div>
    );
  }

  return <>{props.item}</>;
}

const BreadCrumbs: FC = () => {
  const router = useRouter();

  const path = router.route
    .split("/")
    .filter((p) => p.length !== 0 && p != "dashboard");
  const query = router.query;
  const keys = Object.keys(query);

  return (
    <ul className="flex flex-col space-y-4 md:space-y-0 md:flex-row md:space-x-4  font-semibold tracking-wide text-gray-700 subpixel-antialiased">
      <li
        className="hover:underline cursor-pointer"
        onClick={() => router.push("/dashboard")}
      >
        Home
      </li>
      {path &&
        path.map((p) => (
          <React.Fragment key={p}>
            <li className="hidden md:block">/</li>
            <li className="hover:underline cursor-pointer">
              <BreadCrumbItem item={p} keys={keys} query={query} />
            </li>
          </React.Fragment>
        ))}
    </ul>
  );
};

export default BreadCrumbs;
