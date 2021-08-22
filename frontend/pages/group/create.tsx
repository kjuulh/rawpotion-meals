import { Field, Form } from "react-final-form";
import React from "react";
import { useRouter } from "next/router";
import { useCreateGroupMutation } from "@lib/api";

const required = (value) => (value ? undefined : "Required");

const CreateGroupPage: any = () => {
  const router = useRouter();

  const [createGroup, { isLoading, isError, isSuccess, data }] =
    useCreateGroupMutation();

  const onSubmit = (values: Record<string, any>) => {
    createGroup({
      createGroupCommand: {
        name: values["groupName"],
      },
    });
  };

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
