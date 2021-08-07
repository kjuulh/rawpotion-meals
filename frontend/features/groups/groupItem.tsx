export const GroupItem = (props) => {
  return (
    <div className="py-6 px-4 rounded-lg shadow-lg hover:shadow-xl active:shadow-md transition-all border-2 border-white hover:border-yellow-500 focus:border-yellow-100 cursor-pointer text-gray-800 text-lg">
      {props.children}
    </div>
  );
};
