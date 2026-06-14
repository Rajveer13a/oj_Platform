"use client"

import { useAuthStore } from "@/store/auth.store";
import { Button } from "./ui/button"
import { useRouter } from "next/navigation";


export default function GetStartedButton(){


  const { user } = useAuthStore();

  const router = useRouter();

  const onGetStarted = () => {
    if(user){
      router.push("/problemset");
    }else{
      router.push("/login")
    }
  }

    return (
        <Button onClick={onGetStarted} variant={"default"} >Get Started</Button>
    )
}