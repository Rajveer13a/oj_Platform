import apiClient from "@/lib/apiClient";
import { createOnUserInput } from "@/lib/createOnUserInput";
import { useAuthStore } from "@/store/auth.store";
import { loginSchema } from "@oj/types";
import { useRouter } from "next/navigation";

import { ChangeEvent, useState } from "react";
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

    const handleSubmit = async(e) => {

        e.preventDefault();
        const result = loginSchema.safeParse({
            ...userInput
        });
        
        if(!result.success){
            const err = JSON.parse(result.error)[0];             
            toast.info(`${err.path[0]}: ${err.code}`)
            return;
        }

        setIsLoading(true);

        try {
            const res = await apiClient.post("/auth/login", userInput);

            setAuth(res.data.data);
            router.push("/")
            
        } catch (error) {
            toast.info(JSON.stringify(error.response?.data?.message));
        }finally{
            setIsLoading(false);
        }
        
    }

    return { userInput , isLoading, onUserInput, handleSubmit };
}