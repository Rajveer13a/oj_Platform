"use client"

import LoginForm from "@/components/auth/LoginForm";
import useLogin from "@/hooks/useLogin";




export default function LoginPage(){

    const { onUserInput, handleSubmit } = useLogin();

    return (
       <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <LoginForm onChange={onUserInput} onLogin={handleSubmit} />
      </div>
    </div>
    )
}