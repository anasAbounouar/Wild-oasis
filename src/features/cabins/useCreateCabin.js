import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useCreateCabin() {
  const queryClient = useQueryClient();

  const { isPending: isCreating, mutate: createNewCabin } = useMutation({
    mutationFn: createCabin,
    onSuccess: () => {
      toast.success("cabin is  successfully  created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => toast.error(err.message),
  });
  const { isPending: isEditing, mutate: editCabin } = useMutation({
    mutationFn: ({ newCabin, id }) => createCabin(newCabin, id),
    onSuccess: () => {
      toast.success("cabin is  successfully  edited");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (err) => {
      console.log(err);
      console.log(err.message);
      toast.error(err.message);
    },
  });
  const isWorking = isEditing && isCreating;
  return {
    isWorking,
    createNewCabin,
    editCabin,
  };
}
