import { createFolderAPI } from "lib/api/folder";
import { QueryKey } from "lib/queryKey";
import { useMutation, useQueryClient } from "react-query";
import { ICreateFolderRequest } from "types/folder";

export default function useMutationFolder() {
  const queryClient = useQueryClient();

  const { mutate: createFolderMutate } = useMutation(
    (requestBody: ICreateFolderRequest) => createFolderAPI(requestBody),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(QueryKey.FOLDER_LIST);
      },
      onError: (error) => {
        console.log(error);
      },
    }
  );

  return {
    createFolderMutate,
  };
}
