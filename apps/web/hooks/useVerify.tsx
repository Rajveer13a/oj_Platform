"use client"

import apiClient from "@/lib/apiClient"
import { useAuthStore } from "@/store/auth.store"
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import useUserDetails from "./useUserDetails"
import { apiResponse } from "@/lib/types"
import axios from "axios"

export function useVerify() {

const { token }: {token: string} = useParams();
  const [loaded, setLoaded] = useState(false)

  const { user } = useAuthStore()

  const isLoggedIn = user ? true : false

  const router = useRouter()

  const [resData, setResData] = useState<apiResponse | null>(null);

  const { getUserDetails } = useUserDetails();

  const onVerifyEmail = async () => {

    try {

      const res = await apiClient.post("/auth/verify", {
        verificationToken: token,
      });

      setResData(res.data);

      await getUserDetails();

    } catch (error) {
        if(axios.isAxiosError(error)){
          setResData(error.response?.data);
        }
        
    }
    
    setLoaded(true);

  }

  useEffect(() => {
    onVerifyEmail()
  }, [])

  return {isLoggedIn, router, loaded, resData}
}
