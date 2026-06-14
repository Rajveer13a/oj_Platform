import apiClient from "@/lib/apiClient";
import { apiResponse } from "@/lib/types";
import { useEffect, useState } from "react";


export default function useProblemSet(){

    const [ problemList , setProblemList ] = useState([]);

    const getProblemList = async() => {
         try {
            
            const res = await apiClient.get<apiResponse>("/problems");

            setProblemList(res.data.data.problems);
  
        } catch (error) {
            console.log(error?.response?.data?.message)
        }
    }

    useEffect(()=>{
       getProblemList()
    },[]);


    return { problemList }
    
};