import { useAppSelector } from "@lib/redux/hooks";
import { selectRequestsForGroup } from "./requestsSlice";
import React from "react";
import { AddRequest } from "./AddRequest";
import { RequestItem } from "./RequestItem";
import { CardTitle } from "@components/common/card/cardTitle";
import { Card } from "@components/common/card/card";

const Requests = (props: { groupId: string }) => {
  const [loading, requests] = useAppSelector(
    selectRequestsForGroup(props.groupId)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const showRequests = (empty: boolean) => {
    return empty ? (
      <div className="pl-4">Empty...</div>
    ) : (
      <ul className="pl-4 space-y-4">
        {requests.map((r) => (
          <li key={r.id}>
            <RequestItem request={r} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <Card>
      <CardTitle>Requests</CardTitle>
      {showRequests(requests.length === 0)}

      <hr />

      <div>
        <AddRequest {...props} />
      </div>
    </Card>
  );
};

export default Requests;
