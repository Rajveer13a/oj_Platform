"use client"
import apiClient from "@/lib/apiClient"
import { useState } from "react"
import { toast } from "sonner"
import { Button } from "./ui/button"
import { Info, MoveRight } from "lucide-react"
import { Spinner } from "./ui/spinner"
import { useAuthStore } from "@/store/auth.store"

export default function VerifyBanner() {

  const { user } = useAuthStore();

  const [resending, setResending] = useState(false)

  const onResend = async () => {
    setResending(true)

    try {
      const res = await apiClient.get("/auth/verify")

      toast.success("verification email send succesfully")
    } catch (error) {
      toast.error(error?.response?.data?.message || "something went wrong ")
    }

    setResending(false)
  }

  if(user?.isVerified || !user) return null;

  return (
    <div className="border-divider fixed z-50 w-full items-center gap-x-3 border-b-1 bg-background/[0.15] px-6 py-2 backdrop-blur-xl sm:px-3.5 sm:before:flex-1 md:flex">
      <p className="text-default-800">
        We've sent a verification link to your email. Please click the link to
        verify your account.&nbsp; <span>Didn't get the email? </span>
      </p>

      <div className="float-right space-x-4 md:hidden">
        <Button
          onClick={onResend}
          className="group text-small relative h-9 overflow-hidden bg-transparent font-normal"
          variant="outline"
        >
          Resend {
            resending ? <Spinner data-icon="inline-start" /> : <MoveRight
              className="flex-none transition-transform outline-none group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
              width={16}
            />
          } 
        </Button>

        <Button
          className="absolute top-0 right-0 -m-1"
          size="sm"
          variant="ghost"
        >
          <Info className="text-default-500" width={20} />
        </Button>
      </div>

      <Button
      disabled={resending}
        onClick={onResend}
        className="group text-small relative hidden h-9 overflow-hidden bg-transparent font-normal md:flex"       
        variant="outline"
      >
        Resend {
            resending ? <Spinner data-icon="inline-start" /> : <MoveRight
              className="flex-none transition-transform outline-none group-data-[hover=true]:translate-x-0.5 [&>path]:stroke-[2]"
              width={16}
            />
          } 
      </Button>
      <div className="hidden flex-1 justify-end md:flex">
        <Button className="-m-1" size="sm" variant="ghost">
          <Info className="text-default-500" width={20} />
        </Button>
      </div>
    </div>
  )
}
