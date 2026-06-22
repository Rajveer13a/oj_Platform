import apiClient from "@/lib/apiClient";
import { apiResponse, pagination, Problem } from "@/lib/types";
import axios from "axios";
import { useEffect, useState } from "react";



interface ProblemsPayload {
    problems: Problem[];
    pagination: pagination
}

export default function useProblemSet(){

    const [ problemList , setProblemList ] = useState<Problem[]>([]);

    const [paginationData, setPaginationData] = useState<pagination>({
      total: 20,
      page: 1,
      limit: 20,
      totalPages: 2,
      hasNext: true,
      hasPrev: false,
    })

    const [page, setPage] = useState(1);

    const getProblemList = async() => {
         try {
            
            const res = await apiClient.get<apiResponse<ProblemsPayload>>("/problems", {
                params: {
                    page: page,
                    limit: 12
                }
            });

            setProblemList(res.data.data.problems);
            setPaginationData(res.data.data.pagination)
  
        } catch (error) {
            if(axios.isAxiosError(error)){
                console.log(error?.response?.data?.message)
            }             
        }
    }

    useEffect(()=>{
       getProblemList()
    },[page]);


    return { problemList, paginationData ,setPage }
    
};