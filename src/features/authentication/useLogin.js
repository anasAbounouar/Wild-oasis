import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isPending } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      // lets store user in the cash manually
      queryClient.setQueryData(["user"], user.user);
      navigate("/", { replace: true });
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("email or password are incorrect ");
    },
  });
  const isLoading = isPending;
  return { login, isLoading };
}
