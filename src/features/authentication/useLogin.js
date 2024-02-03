import { useMutation } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export function useLogin() {
  const navigate = useNavigate();
  const {
    mutate: login,
    isPending,
    isIdle,
  } = useMutation({
    mutationFn: ({ email, password }) => loginApi({ email, password }),
    onSuccess: (user) => {
      console.log(user);
      navigate("/");
    },

    onError: (err) => {
      console.log("ERROR", err);
      toast.error("email or password are incorrect ");
    },
  });
  const isLoading = isPending || !isIdle;
  return { login, isLoading };
}
