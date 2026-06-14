import apiClient from "@/lib/apiClient";
import { useAuthStore } from "@/store/auth.store";
import axios from "axios";
import { useEffect } from "react";

export default function useUserDetails(){

    const { setAuth }  = useAuthStore();

    const getUserDetails = async() => {

        try {
            
            const res = await apiClient.get("/auth/me");

            const data = res.data;

            setAuth(data.data);

        } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log(error?.response?.data)
            }
        }
    }

    return {
        getUserDetails
    }

}