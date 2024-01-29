

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin as deleteCabinApi } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useDeleteCabin() {
  const queryClient = useQueryClient();
  const {
    isPending,
    isIdle,
    mutate: deleteCabin,
  } = useMutation({
    mutationFn: deleteCabinApi,
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      toast.success("successfully deleted");
    },
    onError: (err) => toast.error(err.message),
  });
  const isDeleting = isIdle && isPending;

  return { isDeleting, deleteCabin };
}
