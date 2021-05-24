import Member from "./member";

export const Members = (props: { members: string[] }) => {
  return (
    <ul>
      {props.members.map((m) => (
        <li key={m}>
          <Member member={m} />
        </li>
      ))}
    </ul>
  );
};

export default Members;
