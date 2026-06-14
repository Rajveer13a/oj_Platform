import { useEffect, useState } from "react";
import apiClient from "@/lib/apiClient";

const DEFAULT_CODE: Record<string, string> = {
  python:     "# Write your solution here\n",
  javascript: "// Write your solution here\n",
  cpp:        "// Write your solution here\n",
  java:       "// Write your solution here\n",
};

export const useProblemEditor = (problemData) => {

  const [language,     setLanguage]     = useState("javascript");
  const [code,         setCode]         = useState("");
  const [submissionId, setSubmissionId] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error,        setError]        = useState("");


  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setBoilerplateCode = () =>{
    const boilerplate = problemData?.boilerplates.find( (val)=> val.language === language );
    
    setCode(boilerplate?.starterCode);
  }

  const handleLanguageChange = (lang: string) => {
    setLanguage(lang);
    setCode(DEFAULT_CODE[lang] || "");
    setSubmissionId(null);
  };

  const handleSubmit = async () => {
    if (!code?.trim()) {
      setError("Code cannot be empty");
      return;
    }

    setIsSubmitting(true);
    setError("");
    setSubmissionId(null);

    try {
      const res = await apiClient.post("/submissions", {
        problemId : problemData.id,
        language,
        code,
      });
      setSubmissionId(res.data.data.submissionId);
    } catch (err: any) {
      setError(err.response?.data?.message || "Failed to submit");
    } finally {
      setIsSubmitting(false);
    }
  };

  useEffect(()=>{
    setBoilerplateCode()
  },[problemData, language])

  return {
    language,
    code,
    submissionId,
    isSubmitting,
    error,
    setCode,
    handleLanguageChange,
    handleSubmit,
  };
};