import { Field, Form } from "react-final-form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetGroupState,
  selectHasBeenCreated,
} from "../../lib/features/groups/groupsSlice";
import { useRouter } from "next/router";
import { createGroupAsync } from "../../lib/features/groups/createGroupAsync";

const required = (value) => (value ? undefined : "Required");

const CreateGroupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [hasBeenCreated, group] = useSelector(selectHasBeenCreated);

  const onSubmit = (values: Record<string, any>) => {
    dispatch(createGroupAsync(values["groupName"]));
  };

  useEffect(() => {
    if (hasBeenCreated) {
      dispatch(resetGroupState());
      router.push(`/groups/${group.id}`);
    }
  }, [hasBeenCreated]);

  return (
    <div>
      <h1>Create group page</h1>

      <Form
        onSubmit={onSubmit}
        render={({ handleSubmit }) => (
          <form onSubmit={handleSubmit}>
            <Field
              name="groupName"
              validate={required}
              render={({ input, meta }) => (
                <div>
                  <label>Group name</label>
                  <input type="text" placeholder="Group name" {...input} />
                  {meta.touched && meta.error && <span>{meta.error}</span>}
                </div>
              )}
            />
            <button>Create</button>
          </form>
        )}
      />
    </div>
  );
};

export default CreateGroupPage;
