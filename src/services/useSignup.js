import { useMutation } from "@tanstack/react-query";
import { signup as signupApi } from "./apiAuth";
import toast from "react-hot-toast";

export function useSignup() {
  const { mutate: signup, isPending } = useMutation({
    mutationFn: signupApi,
    onSuccess: () => {
      toast.success(
        "new account successfully created, Please check your email. ",
      );
    },
  });
  const isLoading = isPending;
  return { signup, isLoading };
}
