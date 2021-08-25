import { UseCreateGroupType } from "@features/groups/create/useCreateGroupType";
import { useRouter } from "next/router";
import { useCreateGroupMutation } from "@lib/api";

export const useCreateGroup: UseCreateGroupType = () => {
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

  if (isSuccess) {
    router.push(`/groups/${data.id}`);
  }

  return [
    onSubmit,
    {
      isLoading,
      isError,
      isSuccess,
      data,
    },
  ];
};
