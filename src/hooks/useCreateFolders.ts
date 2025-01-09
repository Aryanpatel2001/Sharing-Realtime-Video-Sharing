import { createFolders } from "@/actions/workspace";
import { useMutationData } from "./useMutationData";

export const useCreateFolders = (workspaceId: string) => {
  const { mutate } = useMutationData(
    ["create-folder"],
    () => createFolders(workspaceId),
    "workspace-folders"
  );

  const onCreatedNewFolder = () =>
    mutate({ name: "Untitled", id: "optimitsitc--id" });
  return { onCreatedNewFolder };
};
