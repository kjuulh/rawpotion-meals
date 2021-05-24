import { useAppSelector } from "../../redux/hooks";
import { selectRequestsForGroup } from "./requestsSlice";
import React from "react";
import { AddRequest } from "./AddRequest";
import { RequestItem } from "./RequestItem";

const Requests = (props: { groupId: string }) => {
  const [loading, requests] = useAppSelector(
    selectRequestsForGroup(props.groupId)
  );

  if (loading) {
    return <div>Loading...</div>;
  }

  const showRequests = (empty: boolean) => {
    return empty ? (
      <div>Empty...</div>
    ) : (
      <ul>
        {requests.map((r) => (
          <li>
            <RequestItem request={r} />
          </li>
        ))}
      </ul>
    );
  };

  return (
    <div>
      <h1>Requests</h1>
      {showRequests(requests.length === 0)}

      <div>
        Add request
        <AddRequest {...props} />
      </div>
    </div>
  );
};

export default Requests;
