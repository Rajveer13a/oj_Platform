"use client"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card"
import { Spinner } from "@/components/ui/spinner"
import { useVerify } from "@/hooks/useVerify"

export default function VerifyPage() {

  const { isLoggedIn, router, loaded, resData } = useVerify()

  return (
    <div className="flex h-[70vh] items-center justify-center">
      <Card className="mx-auto w-full max-w-sm bg-[url('https://nextuipro.nyc3.cdn.digitaloceanspaces.com/components-images/abstract-dark-bg4.jpg')] bg-right-bottom">

        {
            !loaded && (<CardContent className="px-3">

              <div className="flex flex-col gap-2 px-2">

                <p className="text-large font-medium text-white/80">Verifying your email</p>

                <p className="text-small text-white/60">Please wait a moment while we confirm your email address and activate your account.</p>

              </div>

            </CardContent>)
          }

          {
            loaded && ( <CardContent className="px-3">

              <div className="flex flex-col gap-2 px-2">

                <p className="text-large font-medium text-white/80">{
                  resData?.success ? "Your account has been verified!" : "Failed to verify"
                }</p>

                <p className="text-small text-white/60">{
                  resData?.success ? "Thanks for completing your verification. Your account is now fully active, and you're all set to enjoy a seamless experience on our platform." : resData?.message
                }</p>

              </div>

            </CardContent>)
          }

          <CardFooter className="justify-end gap-2">

            {
              isLoggedIn ? (
                <Button onClick={() => router.push("/")} className="border-small border-white/20 bg-white/10 text-white w-full">
                    
                  {loaded ? "Go to HomePage" : <Spinner data-icon="inline-start" /> }
                </Button>
              ) : (
                <Button onClick={() => router.push("/login")}  className="border-small border-white/20 bg-white/10 text-white w-full">
                  {loaded ? "Login" : <Spinner data-icon="inline-start" />}
                </Button>
              )
            }



          </CardFooter>
        
      </Card>
    </div>
  )
}
