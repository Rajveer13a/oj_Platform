import apiClient from "@/lib/apiClient";
import { createOnUserInput } from "@/lib/createOnUserInput";
import { useAuthStore } from "@/store/auth.store";
import { signupSchema } from "@oj/types";
import axios from "axios";
import { useRouter } from "next/navigation";
import { SubmitEvent, useState } from "react";
import { toast } from "sonner";

export default function useSignup(){

    const { setAuth } = useAuthStore();

    const router = useRouter();

    const [userInput , setUserInput] = useState({
        username: "",
        email:"",
        password: "",
        confirmPassword: ""
    });

    const onUserInput = createOnUserInput(setUserInput);

    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = async(e: SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();

        const result = signupSchema.safeParse({
            ...userInput
        });

        if (!result.success) {
          const err = result.error.issues[0]
          toast.info(`${String(err.path[0])}: ${err.message}`)
          return
        }

        if(userInput.password !== userInput.confirmPassword){
            toast.info("password and confirm password does not match")
            return;
        }

        try {

            const res = await apiClient.post("/auth/signup", userInput);

            setAuth(res.data.data);
            router.push("/")
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
              toast.info(JSON.stringify(error.response?.data?.message))
            }
        }finally{
            setIsLoading(false);
        }

    };

    return { userInput, isLoading, onUserInput, handleSubmit };

}