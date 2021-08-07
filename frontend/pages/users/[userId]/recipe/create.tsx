import dynamic from "next/dynamic";

const EditorContainer = dynamic(
  () => import("@components/editor/editorContainer"),
  { ssr: false, loading: () => <div>Loading...</div> }
);

const CreateRecipePage = () => {
  return (
    <div>
      <h1>Create recipe page</h1>

      <EditorContainer />
    </div>
  );
};

export default CreateRecipePage;
