import apiClient from "@/lib/apiClient";
import { createOnUserInput } from "@/lib/createOnUserInput";
import { useAuthStore } from "@/store/auth.store";
import { loginSchema } from "@oj/types";
import axios from "axios";
import { useRouter } from "next/navigation";

import { ChangeEvent, SubmitEvent, useState } from "react";
import { toast } from "sonner";

interface userLoginInput {
    email: string;
    password: string
}

export default function useLogin(){

    const setAuth = useAuthStore((s)=> s.setAuth);
    const router = useRouter();

    const [ userInput , setUserInput ] = useState<userLoginInput>({
        email: "",
        password: ""
    })

    const [isLoading, setIsLoading] = useState(false);
  
    const onUserInput = createOnUserInput(setUserInput);

    const handleSubmit = async(e: SubmitEvent<HTMLFormElement>) => {

        e.preventDefault();
        const result = loginSchema.safeParse({
            ...userInput
        });
        
        if (!result.success) {
          const err = result.error.issues[0]
          toast.info(`${String(err.path[0])}: ${err.message}`)
          return
        }

        setIsLoading(true);

        try {
            const res = await apiClient.post("/auth/login", userInput);

            setAuth(res.data.data);
            router.push("/")
            
        } catch (error) {
            if (axios.isAxiosError(error)) {
              toast.info(JSON.stringify(error.response?.data?.message))
            }
        }finally{
            setIsLoading(false);
        }
        
    }

    return { userInput , isLoading, onUserInput, handleSubmit };
}