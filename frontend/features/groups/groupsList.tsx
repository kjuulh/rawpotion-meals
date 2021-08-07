import { useSelector } from "react-redux";
import { selectGroups } from "./groupsSlice";
import { FC } from "react";
import { GroupItem } from "./groupItem";

interface GroupsListProps {
  onGroupClick: (groupId: string) => void;
}
const GroupsList: FC<GroupsListProps> = (props) => {
  const groups = useSelector(selectGroups);

  if (groups === []) {
    return <div>Empty...</div>;
  }

  return (
    <ul className="flex flex-col gap-4">
      {groups.map((g) => (
        <li key={g.id} onClick={() => props.onGroupClick(g.id)}>
          <GroupItem>{g.name}</GroupItem>
        </li>
      ))}
    </ul>
  );
};

export default GroupsList;
