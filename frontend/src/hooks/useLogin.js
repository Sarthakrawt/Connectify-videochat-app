import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login } from "../lib/api";

 

 const useLogin = () =>{
    const queryClient = useQueryClient();
  const {
    mutate,
    isPending,
    error,
    isSuccess
  } = useMutation({
    mutationFn: login,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["authUser"] }),
  });
return {error , isPending, loginMutation: mutate,isSuccess};
 }

 export default useLogin;