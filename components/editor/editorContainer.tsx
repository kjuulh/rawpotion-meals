import { useEffect, useState } from "react";
import Paragraph from "@editorjs/paragraph";
import Embed from "@editorjs/embed";
import Table from "@editorjs/table";
import List from "@editorjs/list";
import Warning from "@editorjs/warning";
import Code from "@editorjs/code";
import LinkTool from "@editorjs/link";
import Image from "@editorjs/image";
import Raw from "@editorjs/raw";
import Header from "@editorjs/header";
import Quote from "@editorjs/quote";
import Marker from "@editorjs/marker";
import CheckList from "@editorjs/checklist";
import Delimiter from "@editorjs/delimiter";
import InlineCode from "@editorjs/inline-code";

import dynamic from "next/dynamic";
import { Recipe } from "@features/recipes/recipesSlice";
import { useAppDispatch } from "@lib/redux/hooks";
import { setRecipeForUserAsync } from "@features/recipes/setRecipeForUserAsync";
import EditorJS from "@editorjs/editorjs";

const EditorJs = dynamic(() => import("react-editor-js"), {
  ssr: false,
  loading: () => <p>loading editor.js ...</p>,
});

const EditorContainer = (props: { recipe?: Recipe }) => {
  const dispatch = useAppDispatch();

  const EDITOR_JS_TOOLS = {
    paragraph: Paragraph,
    embed: Embed,
    table: Table,
    list: List,
    warning: Warning,
    code: Code,
    linkTool: LinkTool,
    image: Image,
    raw: Raw,
    header: Header,
    quote: Quote,
    marker: Marker,
    checklist: CheckList,
    delimiter: Delimiter,
    inlineCode: InlineCode,
  };

  const [data, setData] = useState(
    props.recipe?.instructions ? JSON.parse(props.recipe.instructions) : {}
  );
  const [output, setOutput] = useState<string>();
  const [editor, setEditor] = useState<EditorJS>();

  useEffect(() => {
    if (data && editor?.save) {
      editor.save().then((d) => {
        setOutput(JSON.stringify(d));
      });
    }
  }, [data, editor]);

  return (
    <div>
      <EditorJs
        tools={EDITOR_JS_TOOLS}
        data={data}
        onChange={(e) => setData(e)}
        instanceRef={(i) => setEditor(i)}
      />

      <button
        disabled={!output}
        onClick={() =>
          dispatch(
            setRecipeForUserAsync({
              id: props.recipe?.id,
              instructions: output,
              name: "some-recipe",
              description: "some-description",
            })
          )
        }
      >
        Save
      </button>
      <button>Publish</button>
    </div>
  );
};

export default EditorContainer;
