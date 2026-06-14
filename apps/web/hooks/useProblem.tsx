import apiClient from "@/lib/apiClient"
import { Problem } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

export default function useProblem(slug: string){


    const [problemData , setProblemData] = useState<Problem | null>(null);

    const onGetProblem = async() => {

        try {
            
            const res = await apiClient.get(`/problems/${slug}`);

            setProblemData(res.data.data);

        } catch (error) {
            if (axios.isAxiosError(error)) {
              console.log(error?.response?.data?.message)
            }
        }

    }

    useEffect(()=>{
        onGetProblem()
    },[])

    return { problemData }
}