"use client"
import { useState, useEffect, useRef } from "react";
import apiClient from "@/lib/apiClient";
import { type Submission } from "@/lib/types";


export const useSubmission = (submissionId: string | null) => {
  const [submission, setSubmission] = useState<Submission | null>(null);
  const [isPolling,  setIsPolling]  = useState(false);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (!submissionId) return;

    setIsPolling(true);

    const poll = async () => {
      try {
        const res = await apiClient.get(`/submissions/${submissionId}`);
        const data = res.data.data;
        setSubmission(data);

        if (data.verdict !== "PENDING") {
          setIsPolling(false);
          if (intervalRef.current) clearInterval(intervalRef.current);
        }
      } catch (err) {
        setIsPolling(false);
        if (intervalRef.current) clearInterval(intervalRef.current);
      }
    };

    poll();
    intervalRef.current = setInterval(poll, 2000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [submissionId]);

  return { submission, isPolling };
};