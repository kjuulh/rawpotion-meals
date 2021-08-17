import { FC } from "react";
import { GroupItem } from "./groupItem";
import { GroupVm } from "@lib/api";

interface GroupsListProps {
  onGroupClick: (groupId: string | number) => void;
  groups: GroupVm[];
}

const GroupsList: FC<GroupsListProps> = ({ onGroupClick, groups }) => {
  if (groups === []) {
    return <div>Empty...</div>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {groups.map((g) => (
        <li key={g.id} onClick={() => onGroupClick(g.id)}>
          <GroupItem>{g.name}</GroupItem>
        </li>
      ))}
    </ul>
  );
};

export default GroupsList;
