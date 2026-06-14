import apiClient from "@/lib/apiClient";
import { apiResponse, Problem } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";

interface ProblemsPayload {
    problems: Problem[];
}

export default function useProblemSet(){

    const [ problemList , setProblemList ] = useState<Problem[]>([]);

    const getProblemList = async() => {
         try {
            
            const res = await apiClient.get<apiResponse<ProblemsPayload>>("/problems");

            setProblemList(res.data.data.problems);
  
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error?.response?.data?.message)
            }             
        }
    }

    useEffect(()=>{
       getProblemList()
    },[]);


    return { problemList }
    
};