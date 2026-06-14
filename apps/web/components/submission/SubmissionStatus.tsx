"use client"

import { Spinner } from "../ui/spinner"
import VerdictBadge from "./VerdictBadge"

export default function SubmissionStatus({ submission, isPolling }) {
  if (!submission) return null

  return (
    <div className="text-sm">


      <div className="flex items-center gap-2">
          <VerdictBadge verdict={submission.verdict} />

          {
            submission.verdict == "AC" && <h3 className="text-slate-200 text-xs">{submission.totalTestCases}/{submission.totalTestCases} testcases passed</h3>
          }

      </div>
      
        

        
        {
          submission?.errorMessage && <pre className="text-wrap p-2">{submission.errorMessage}</pre>
        }


      

      {submission.runtime !== null && submission.verdict == "AC" && (
        <span className="text-gray-500 p-2">Runtime: {submission.runtime}ms</span>
      )}

      {submission.memory !== null && submission.verdict == "AC" && (
        <span className="text-gray-500">Memory: {submission.memory}KB</span>
      )}

    </div>
  )
}
