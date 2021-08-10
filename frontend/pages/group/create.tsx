import { Field, Form } from "react-final-form";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  resetGroupState,
  selectHasBeenCreated,
} from "@features/groups/groupsSlice";
import { useRouter } from "next/router";
import { createGroupAsync } from "@features/groups/createGroupAsync";
import { useIfFirebase } from "@lib/firebase";
import { useCreateGroupMutation } from "@lib/api";

const required = (value) => (value ? undefined : "Required");

const CreateGroupPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const [hasBeenCreated, group] = useSelector(selectHasBeenCreated);
  const [createGroup, { isLoading, isError, isSuccess, data }] =
    useCreateGroupMutation();

  const onSubmit = (values: Record<string, any>) => {
    useIfFirebase(
      () => {
        dispatch(createGroupAsync(values["groupName"]));
      },
      () => {
        createGroup({
          createGroupRequest: {
            name: values["groupName"],
          },
        });
      }
    );
  };

  useEffect(() => {
    if (hasBeenCreated) {
      dispatch(resetGroupState());
      router.push(`/groups/${group.id}`);
    }
  }, [hasBeenCreated]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isError) {
    return <div>Error...</div>;
  }

  if (isSuccess) {
    router.push(`/groups/${data.id}`);
    return <div>Redirecting</div>;
  }

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
