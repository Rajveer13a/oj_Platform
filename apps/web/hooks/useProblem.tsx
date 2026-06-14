import apiClient from "@/lib/apiClient"
import { apiResponse } from "@/lib/types";
import { useEffect, useState } from "react";

export default function useProblem(slug: string){


    const [problemData , setProblemData] = useState();

    const onGetProblem = async() => {

        try {
            
            const res = await apiClient.get<apiResponse>(`/problems/${slug}`);

            setProblemData(res.data.data);

        } catch (error) {
            console.log(error?.response?.data?.message)
        }

    }

    useEffect(()=>{
        onGetProblem()
    },[])

    return { problemData }
}