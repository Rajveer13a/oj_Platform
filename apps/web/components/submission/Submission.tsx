import { CodeIcon, SquareCheck } from "lucide-react"
import { useEffect, useState } from "react"

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { UUID } from "crypto"
import { Card, CardContent } from "../ui/card"
import SubmissionStatus from "./SubmissionStatus"

interface Testcase {
  id: UUID
  input: string
  expectedOutput: string
  problemId: UUID
  isSample: boolean
}

interface SubmissionProps {
  testCases: Testcase[]
  submission: unknown,
  isPolling: boolean
}

export function Submission({ testCases ,submission, isPolling }: SubmissionProps) {
  const [activeTab, setActiveTab] = useState(isPolling ? "result" : "testcases")

  useEffect(() => {
    if (isPolling) {
      setActiveTab("result")
    }
  }, [isPolling])

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab}>
      <TabsList>
        <TabsTrigger value="testcases">
          <SquareCheck className="text-yellow-400" />
          TestCases
        </TabsTrigger>
        <TabsTrigger disabled={!isPolling} value="result">
          <CodeIcon />
          TestResult
        </TabsTrigger>
      </TabsList>

      <TabsContent value="testcases">

        <Tabs defaultValue="1">

          <TabsList>
            {testCases?.map((tc, indx) => (
              <TabsTrigger value={`${indx + 1}`} key={tc.id}>
                Case {indx + 1}
              </TabsTrigger>
            ))}
          </TabsList>

          {testCases?.map((tc, indx) => (
            <TabsContent value={`${indx + 1}`} key={tc.id}>
              <div>
                
                {
                  <Card className="">
                    <CardContent className="text-wrap">
                      <pre className="text-wrap">{tc?.displayInput}</pre>
                    </CardContent>
                  </Card>
                }

              </div>
            </TabsContent>
          ))}

        </Tabs>

      </TabsContent>
      
      <TabsContent className="py-4" value="result">
          <SubmissionStatus submission={submission} isPolling={isPolling} />
        
      </TabsContent>

    </Tabs>
  )
}
