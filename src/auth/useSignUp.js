import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signup as signupApi } from "./apiAuth";

export function useSignup() {
  const navigate = useNavigate();
  const { mutate: signup, isLoading } = useMutation({
    mutationFn: signupApi,
    onSuccess: (user) => {
      console.log(user);
      navigate("/product");
      toast.success("Account succesfully created!");
    },
    onError: () => {
      toast.error("user cant be signed up");
    },
  });
  return { signup, isLoading };
}
