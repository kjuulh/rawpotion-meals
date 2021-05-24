import { useSelector } from "react-redux";
import { selectGroups } from "./groupsSlice";
import { FC } from "react";

interface GroupsListProps {
  onGroupClick: (groupId: string) => void;
}
const GroupsList: FC<GroupsListProps> = (props) => {
  const groups = useSelector(selectGroups);

  if (groups === []) {
    return <div>Empty...</div>;
  }

  return (
    <ul>
      {groups.map((g) => (
        <li key={g.id} onClick={() => props.onGroupClick(g.id)}>
          {g.name}
        </li>
      ))}
    </ul>
  );
};

export default GroupsList;
