"use client"

import { SignupForm } from "@/components/auth/SignupForm";
import useSignup from "@/hooks/useSignup";


export default function SignupPage() {

  const { userInput, errorMsg, isLoading, onUserInput, handleSubmit } = useSignup();
  
  return (
    <div className="flex min-h-svh flex-col items-center justify-center bg-muted p-6 md:p-10">
      <div className="w-full max-w-sm md:max-w-4xl">
        <SignupForm onSignup={handleSubmit} onUserInput={onUserInput} />
      </div>
    </div>
  )
}
